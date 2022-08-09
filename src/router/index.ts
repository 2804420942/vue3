import {  createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/editor",
    name: "editor",
    component: () =>
      import(/* webpackChunkName: "editor" */ "../views/Editor.vue"),
  },
  {
    path: "/three",
    name: "three",
    component: () =>
      import(/* webpackChunkName: "editor" */ "../views/Three.vue"),
  },
  {
    path: "/mock",
    name: "mock",
    component: () =>
      import(/* webpackChunkName: "editor" */ "../views/Mock.vue"),
  },
  {
    path: "/lingo3d",
    name: "lingo3d",
    component: () =>
      import(/* webpackChunkName: "editor" */ "../views/Lingo3d.vue"),
  },
  {
    path: "/markdown2PDF",
    name: "markdown2PDF",
    component: () =>
      import(/* webpackChunkName: "editor" */ "../views/markdown2PDF.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
