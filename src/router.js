import Vue from "vue";
import VueRouter from "vue-router";
import AuthGuard from "./utils/auth.guard";
import { adminRoot } from "./constants/config";
import { UserRole } from "./utils/auth.roles";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () => import(/* webpackChunkName: "home" */ "./views/home"),
  },
  {
    path: adminRoot,
    component: () => import(/* webpackChunkName: "app" */ "./views/app"),
    redirect: `${adminRoot}/dashboards`,
    meta: { loginRequired: true },
    /*
    define with Authorization :
    meta: { loginRequired: true, roles: [UserRole.Admin, UserRole.Editor] },
    */
    children: [
      {
        path: "dashboards",
        component: () =>
          import(/* webpackChunkName: "dashboards" */ "./views/app/dashboards"),
        redirect: `${adminRoot}/dashboards/default`,
        // meta: { roles: [UserRole.Admin, UserRole.Editor] },
        children: [
          {
            path: "default",
            component: () =>
              import(/* webpackChunkName: "dashboards" */ "./views/app/dashboards/Default"),
            // meta: { roles: [UserRole.Admin] },
          }
        ]
      },
      {
        path: "setup",
        component: () =>
          import(/* webpackChunkName: "setup" */ "./views/app/setup"),
        redirect: `${adminRoot}/setup/intents`,
        children: [
          {
            path: "intents",
            component: () =>
              import(/* webpackChunkName : "setup-intents" */ "./views/app/setup/intents"),
            redirect: `${adminRoot}/setup/intents/all-intents`,
            children: [
              {
                path: "all-intents",
                component: () =>
                  import(/* webpackChunkName: "setup-intents" */ "./views/app/setup/intents/All-Intents")
              },
              {
                path: "add-intent",
                component: () =>
                  import(/* webpackChunkName: "setup-intents" */ "./views/app/setup/intents/Add-Intent")
              }
            ]
          }
        ]
      },
      {
        path: "menu",
        component: () =>
          import(/* webpackChunkName: "menu" */ "./views/app/menu"),
        redirect: `${adminRoot}/menu/types`,
        children: [
          {
            path: "types",
            component: () =>
              import(/* webpackChunkName : "menu-types" */ "./views/app/menu/Types")
          },
          {
            path: "levels",
            component: () =>
              import(/* webpackChunkName : "menu-levels" */ "./views/app/menu/levels"),
            redirect: `${adminRoot}/menu/levels/third-level-1`,
            children: [
              {
                path: "third-level-1",
                component: () =>
                  import(/* webpackChunkName: "menu-levels" */ "./views/app/menu/levels/Third-level-1")
              },
              {
                path: "third-level-2",
                component: () =>
                  import(/* webpackChunkName: "menu-levels" */ "./views/app/menu/levels/Third-level-2")
              },
              {
                path: "third-level-3",
                component: () =>
                  import(/* webpackChunkName: "menu-levels" */ "./views/app/menu/levels/Third-level-3")
              }
            ]
          }
        ]
      },
      {
        path: "blank-page",
        component: () =>
          import(/* webpackChunkName: "blank-page" */ "./views/app/blank-page")
      }
    ]
  },
  {
    path: "/error",
    component: () => import(/* webpackChunkName: "error" */ "./views/Error")
  },
  {
    path: "/unauthorized",
    component: () => import(/* webpackChunkName: "error" */ "./views/Unauthorized")
  },
  {
    path: "/user",
    component: () => import(/* webpackChunkName: "user" */ "./views/user"),
    redirect: "/user/login",
    children: [
      {
        path: "login",
        component: () =>
          import(/* webpackChunkName: "user" */ "./views/user/Login")
      },
      {
        path: "register",
        component: () =>
          import(/* webpackChunkName: "user" */ "./views/user/Register")
      },
      {
        path: "forgot-password",
        component: () =>
          import(/* webpackChunkName: "user" */ "./views/user/ForgotPassword")
      },
      {
        path: "reset-password",
        component: () =>
          import(/* webpackChunkName: "user" */ "./views/user/ResetPassword")
      },

    ]
  },
  {
    path: "*",
    component: () => import(/* webpackChunkName: "error" */ "./views/Error")
  }
];

const router = new VueRouter({
  linkActiveClass: "active",
  routes,
  mode: "history",
});
router.beforeEach(AuthGuard);
export default router;