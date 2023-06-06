import { ProfileType } from "@/graphql/types";
import { ref, readonly } from "vue";

interface WithHomePage {
  userHomePage: string;
}

const user = ref<(ProfileType & WithHomePage) | undefined>();

export default function () {
  function setUser(profileType: ProfileType | undefined) {
    user.value = profileType
      ? {
          ...profileType,
          userHomePage: profileType.isSuperAdmin
            ? "/"
            : profileType.isAdmin
            ? `/organizations/${profileType.organizationId}`
            : "/me",
        }
      : undefined;
  }

  return {
    user: readonly(user),
    setUser,
  };
}
