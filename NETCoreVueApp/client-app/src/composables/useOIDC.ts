import { Router } from "vue-router";
import { ref, h } from "vue";
import * as constants from "@/constants";
import Oidc, { User } from "oidc-client";

const oidcManager = ref<Oidc.UserManager | null>(null);
const user = ref(null as User | null);

export default function () {
  async function initialize(
    authority: string,
    clientId: string,
    router: Router
  ) {
    // useGlobalLoading().startLoading();
    oidcManager.value = new Oidc.UserManager({
      authority: authority,
      client_id: clientId,
      redirect_uri: `${window.location.origin}${constants.OIDC_CALLBACK_URI}`,
      response_type: "code",
      popup_post_logout_redirect_uri: constants.OIDC_LOGOUT_URI,
      scope: "openid",
      monitorSession: false,
      automaticSilentRenew: false,
      post_logout_redirect_uri: `${window.location.origin}`,
      userStore: new Oidc.WebStorageStateStore({
        store: window.sessionStorage,
      }),
      accessTokenExpiringNotificationTime: constants.OIDC_EXPIRING_NOTIF_TIME,
    });
    user.value = await oidcManager.value.getUser();
    handleManagerEvents(oidcManager.value, router);
    setupRouter(router);
    if (user.value) {
      // useGlobalLoading().stopLoading();
    }
  }

  function handleManagerEvents(mgr: Oidc.UserManager, router: Router) {
    mgr.events.addUserLoaded((newUser) => {
      user.value = newUser;
    });

    mgr.events.addUserUnloaded(() => {
      user.value = null;
    });

    mgr.events.addAccessTokenExpired(() => {
      user.value = null;
      // router.push("/loggedout");
    });

    mgr.events.addUserSignedOut(() => {
      user.value = null;
    });
  }

  function setupRouter(router: Router) {
    router.addRoute({
      path: constants.OIDC_CALLBACK_URI,
      meta: {
        isPublic: true,
      },
      component: {
        render: () => h("div"),
        created() {
          oidcManager.value?.signinRedirectCallback().then((data) => {
            const redirect = data.state ? data.state.to : null;
            router.replace(redirect || "/");
          });
        },
      },
    });

    router.addRoute({
      path: constants.OIDC_LOGOUT_URI,
      meta: {
        isPublic: true,
      },
      component: () => import("@/components/LoggedOut.vue"),
    });

    router.beforeEach(async (to, from, next) => {
      if (to.matched[0].meta.isPublic) {
        return next();
      } else if (user.value && !user.value.expired) {
        return next();
      } else {
        const result = await oidcManager.value?.signinRedirect({
          state: { to },
        });
        // const result = true;
        if (result) {
          return next();
        } else {
          return next(false);
        }
      }
    });
  }

  function logOut() {
    const token = user.value?.id_token;
    oidcManager.value?.signoutRedirect({ id_token_hint: token });

  }

  return {
    initialize,
    user,
    logOut
  };
}
