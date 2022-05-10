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
      path: "/sign-up",
      name: "sign-up",
      component: () => import("../views/SignUpView.vue"),
      meta: {
        middleware: ["guest"],
      },
    },
    {
      path: "/sign-in",
      name: "sign-in",
      component: () => import("../views/SignInView.vue"),
      meta: {
        middleware: ["guest"],
      },
    },
    // Dashboard routes
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("../views/DashboardView.vue"),
      meta: {
        middleware: ["auth"],
      },
    },
    {
      path: "/nfts",
      name: "nfts",
      component: () => import("../views/NftListView.vue"),
      meta: {
        middleware: ["auth"],
      },
    },
    {
      path: "/nft/create",
      name: "nft-create",
      component: () => import("../views/NftCreateView.vue"),
      meta: {
        middleware: ["auth"],
      },
    },
    {
      path: "/collections",
      name: "collections",
      component: () => import("../views/CollectionListView.vue"),
      meta: {
        middleware: ["auth"],
      },
    },
    {
      path: "/collections/create",
      name: "collections-create",
      component: () => import("../views/CollectionCreateView.vue"),
      meta: {
        middleware: ["auth"],
      },
    },
    {
      path: "/:pathMatch(.*)*", //will match everything and put it under `$route.params.pathMatch`
      name: "not-found",
      component: () => import("../views/NotFoundView.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.middleware) {
    if (to.meta.middleware.includes("auth")) {
      if (sessionStorage.getItem("jwt")) {
        return next();
      } else {
        return next({ name: "sign-in" });
      }
    }

    if (to.meta.middleware.includes("guest")) {
      if (!sessionStorage.getItem("jwt")) {
        return next();
      } else {
        return next({ name: "home" });
      }
    }
  }

  return next();
});

export default router;
