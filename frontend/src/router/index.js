import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "main",
    name: "Layout",
    component: () => import("../layouts/Layout.vue"),
    children: [
      {
        name: "Main",
        path: "main",
        component: () => import("../views/MainPage"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
