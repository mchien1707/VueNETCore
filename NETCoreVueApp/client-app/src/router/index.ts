import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
const routes: Array<RouteRecordRaw> = [
  {
    path: "",
    component: () => import("@/components/HomeComponent.vue"),
  },
  {
    path: "/me",
    component: () => import("@/components/MeComp.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: function (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, top: 0 };
    }
  },
});

export default router;
