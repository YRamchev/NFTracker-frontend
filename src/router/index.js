import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/HomeView.vue"),
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("../views/DashboardView.vue"),
    },
    {
      path: "/contact-us",
      name: "contact",
      component: () => import("../views/ContactView.vue"),
    },
    {
      path: "/support",
      name: "support",
      component: () => import("../views/SupportView.vue"),
    },
    {
      path: "/auth/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
    },
  ],
});

export default router;
