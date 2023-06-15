import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/ipns-resolve",
  },
  {
    path: "/ipns-resolve",
    name: "ipns",
    component: () => import("../views/ipns-resolve.vue"),
  },
  {
    path: "/ipns-content/:cid+",
    name: "ipns-content",
    component: () => import("../views/ipns-content.vue"),
  },
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
});

export default router;
