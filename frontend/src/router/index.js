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

      {
        path: "*",
        redirect: "main",
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.onError((error) => {
  if (/loading chunk \d* failed./i.test(error.message)) {
    window.location.reload();
  }
});
export default router;
