import { createApp } from "vue";
import axios from "axios";
import Constants from "./models/Constants";
import router from "@/router/index";
import oidc from "@/composables/useOIDC";
import App from "./App.vue";

//Apollo
import { DefaultApolloClient } from "@vue/apollo-composable";
import createApolloClient from "@/apolloClient";

//Style
import "@/style/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/style/icon-library.ts";

//Oruga
import Oruga from "@oruga-ui/oruga-next";
import "@oruga-ui/oruga-next/dist/oruga.css";
import orugaConfig from "./oruga-config";

//Prime Vue
import "primevue/resources/primevue.min.css";
import PrimeVue from "primevue/config";

//Components
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import Menu from "primevue/menu";

//I18n
import { i18n } from "@/i18n";

axios.get("/config").then(({ data }) => startApp(data));

async function startApp(constants: Constants) {
  createApp(App)
    .provide(DefaultApolloClient, createApolloClient(constants.apiUrl))
    .use(Oruga, orugaConfig)
    .use(router)
    .use(PrimeVue)
    .use(i18n)
    .component("font-awesome-icon", FontAwesomeIcon)
    .component("Button", Button)
    .component("Dialog", Dialog)
    .component("Menu", Menu)
    .mount("#app");
}
