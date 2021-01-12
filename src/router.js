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
              import(/* webpackChunkName : "intents" */ "./views/app/setup/intents"),
            redirect: `${adminRoot}/setup/intents/all-intents`,
            children: [
              {
                path: "all-intents",
                component: () =>
                  import(/* webpackChunkName: "all-intents" */ "./views/app/setup/intents/All-Intents")
              },
              {
                path: "add-intent",
                component: () =>
                  import(/* webpackChunkName: "add-intent" */ "./views/app/setup/intents/Add-Intent")
              }
            ]
          }
        ]
      },
      {
        path: "data",
        component: () =>
          import(/* webpackChunkName: "data" */ "./views/app/data"),
        redirect: `${adminRoot}/data/data-prepare`,
        children: [
          {
            path: "data-prepare",
            component: () =>
              import(/* webpackChunkName: "data-prepare" */ "./views/app/data/Prepare")
          },
          {
            path: "data-analyse",
            component: () =>
              import(/* webpackChunkName: "data-analyse" */ "./views/app/data/Analyse")
          }
        ]
      },
      {
        path: "images",
        component: () =>
          import(/* webpackChunkName: "images" */ "./views/app/images"),
        redirect: `${adminRoot}/images/img-prepare`,
        children: [
          {
            path: "img-prepare",
            component: () =>
              import(/* webpackChunkName: "img-prepare" */ "./views/app/images/Prepare")
          },
          {
            path: "img-analyse",
            component: () =>
              import(/* webpackChunkName: "img-analyse" */ "./views/app/images/Analyse")
          }
        ]
      },
      {
        path: "training",
        component: () =>
          import(/* webpackChunkName: "images" */ "./views/app/images"),
        redirect: `${adminRoot}/training/training-definition`,
        children: [
          {
            path: "training-definition",
            component: () =>
              import(/* webpackChunkName: "training-definition" */ "./views/app/training/Definations")
          },
          {
            path: "training-process",
            component: () =>
              import(/* webpackChunkName: "training-process" */ "./views/app/training/Process")
          },
          {
            path: "training-generate",
            component: () =>
              import(/* webpackChunkName: "training-generate" */ "./views/app/training/Generate")
          }
        ]
      },

      {
        path: "validations",
        component: () =>
          import(/* webpackChunkName: "images" */ "./views/app/images"),
        redirect: `${adminRoot}/validations/validation-definition`,
        children: [
          {
            path: "validation-definition",
            component: () =>
              import(/* webpackChunkName: "defiations" */ "./views/app/validations/Definations")
          }
        ]
      },
      {
        path: "prediction",
        component: () =>
          import(/* webpackChunkName: "images" */ "./views/app/prediction"),
        redirect: `${adminRoot}/prediction/prediction-batch`,
        children: [
          {
            path: "prediction-batch",
            component: () =>
              import(/* webpackChunkName: "prediction-batch" */ "./views/app/prediction/Batch")
          },
          {
            path: "prediction-one",
            component: () =>
              import(/* webpackChunkName: "prediction-one" */ "./views/app/prediction/One")
          }
        ]
      },

      {
        path: `${adminRoot}/charts`,
        component: () => import(/* webpackChunkName: "charts" */ "./views/app/charts"),
      },
      {
        path: `${adminRoot}/reports`,
        component: () => import(/* webpackChunkName: "reports" */ "./views/app/reports"),
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
  mode: "hash"
});
router.beforeEach(AuthGuard);
export default router;
