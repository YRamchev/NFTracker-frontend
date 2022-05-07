import { createRouter, createWebHistory } from "vue-router";
import auth from "../middleware/auth";
import guest from "../middleware/guest";

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
        middleware: guest,
      },
    },
    {
      path: "/sign-in",
      name: "sign-in",
      component: () => import("../views/SignInView.vue"),
      meta: {
        middleware: guest,
      },
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("../views/DashboardView.vue"),
      meta: {
        middleware: auth,
      },
    },
    {
      path: "/add-nft",
      name: "add-nft",
      component: () => import("../views/AddNFTView.vue"),
      meta: {
        middleware: auth,
      },
    },
    {
      path: "/groups",
      name: "groups",
      component: () => import("../views/GroupsView.vue"),
      meta: {
        middleware: auth,
      },
    },
    {
      path: "/:pathMatch(.*)*", //will match everything and put it under `$route.params.pathMatch`
      name: "not-found",
      component: () => import("../views/NotFoundView.vue"),
    },
  ],
});

// Creates a `nextMiddleware()` function which not only
// runs the default `next()` callback but also triggers
// the subsequent Middleware function.
function nextFactory(context, middleware, index) {
  const subsequentMiddleware = middleware[index];
  // If no subsequent Middleware exists,
  // the default `next()` callback is returned.
  if (!subsequentMiddleware) return context.next;

  return (...parameters) => {
    // Run the default Vue Router `next()` callback first.
    context.next(...parameters);
    // Then run the subsequent Middleware with a new
    // `nextMiddleware()` callback.
    const nextMiddleware = nextFactory(context, middleware, index + 1);
    subsequentMiddleware({ ...context, next: nextMiddleware });
  };
}

router.beforeEach((to, from, next) => {
  if (to.meta.middleware) {
    const middleware = Array.isArray(to.meta.middleware)
      ? to.meta.middleware
      : [to.meta.middleware];

    const context = {
      from,
      next,
      router,
      to,
    };
    const nextMiddleware = nextFactory(context, middleware, 1);

    return middleware[0]({ ...context, next: nextMiddleware });
  }

  next();
});

export default router;
