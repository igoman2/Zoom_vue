import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
const routes = [
  {
    path: "/",
    redirect: "main",
    name: "Layout",
    component: () =>
      import(/* webpackChunkName: "Layout" */ "@/layouts/Layout"),
    children: [
      {
        name: "MainPage",
        path: "main",
        component: () =>
          import(/* webpackChunkName: "MainPage" */ "@/views/MainPage"),
      },
      {
        name: "Login",
        path: "login",
        component: () =>
          import(/* webpackChunkName: "Login" */ "@/views/Login"),
      },
      {
        name: "VideoRoom",
        path: "videoroom/:roomId",
        component: () =>
          import(/* webpackChunkName: "VideoRoom" */ "@/views/video/VideoRoom"),
      },
      {
        name: "EnterRoom",
        path: "enter-room",
        component: () =>
          import(/* webpackChunkName: "VideoRoom" */ "@/views/video/EnterRoom"),
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
