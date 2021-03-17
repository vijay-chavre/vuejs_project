import Vue from "vue";
import VueRouter from "vue-router";
import AuthGuard from "./utils/auth.guard";
import { adminRoot } from "./constants/config";
import { UserRole } from "./utils/auth.roles";

import Loder from './components/Loder/loder';

Vue.use(VueRouter);

const lazyLoadRoute = AsyncView => {
  const AsyncHandler = () => ({
    component: AsyncView,
    loading: Loder
  });

  return Promise.resolve({
    functional: true,
    render(h, { data, children }) {
      // Transparently pass any props or children
      // to the view component.
      return h(AsyncHandler, data, children);
    }
  });
};


const routes = [
  {
    path: "/",
    component: () => lazyLoadRoute(import(/* webpackChunkName: "home" */ "./views/home"))
  },
  {
    path: adminRoot,
    component: () => lazyLoadRoute(import(/* webpackChunkName: "app" */ "./views/app")),
    redirect: `${adminRoot}/dashboards`,
    meta: { loginRequired: true },
    /*
    define with Authorization :
    meta: { loginRequired: true, roles: [UserRole.Admin, UserRole.Editor] },
    */
    children: [
      {
        path: "dashboards",
        component: () => lazyLoadRoute(import(/* webpackChunkName: "dashboards" */ "./views/app/dashboards")),
        redirect: `${adminRoot}/dashboards/default`,
        // meta: { roles: [UserRole.Admin, UserRole.Editor] },
        children: [
          {
            path: "default",
            component: () => lazyLoadRoute(import(/* webpackChunkName: "dashboards" */ "./views/app/dashboards/Default")),
          }
        ]
      },
      {
        path: "setup",
        component: () => lazyLoadRoute(import(/* webpackChunkName: "setup" */ "./views/app/setup")),
        redirect: `${adminRoot}/setup/intents`,
        children: [
          {
            path: "intents",
           // component: () => lazyLoadRoute(import(/* webpackChunkName: "intents" */ "./views/app/setup/intents")),
            component: () => lazyLoadRoute(import(/* webpackChunkName: "intents" */ "./views/app/setup/intents/All-Intents")),

            
            // redirect: `${adminRoot}/setup/intents/all-intents`,
            // children: [
            //   {
            //     path: "all-intents",
            //     component: () => lazyLoadRoute(import(/* webpackChunkName: "intents" */ "./views/app/setup/intents/All-Intents")),
            //   },
            //   // {
            //   //   path: "add-intent",
            //   //   component: () => lazyLoadRoute(import(/* webpackChunkName: "intents" */ "./views/app/setup/All-Intents")),
            //   //   component: () =>
            //   //     import(/*webpackPrefetch: false  webpackChunkName: "add-intent" */ "./views/app/setup/intents/Add-Intent")
            //   // }
            // ]
          },
          {
            path: "add-intent",
            component: () => lazyLoadRoute(import(/* webpackChunkName: "intents" */ "./views/app/setup/intents/Add-Intent")),
          },
          {
            path: 'setup-data-source',
            component: () => lazyLoadRoute(import(/* webpackChunkName: "intents" */ "./views/app/setup/intents/DataSource")),
          },
          {
            path: 'setup-image-source',
            component: () => lazyLoadRoute(import(/* webpackChunkName: "intents" */ "./views/app/setup/intents/ImageSource")),
          }
        ]
      },
      {
        path: "data",
        component: () => lazyLoadRoute(import(/* webpackChunkName: "data" */ "./views/app/data")),
        redirect: `${adminRoot}/data/data-prepare`,
        children: [
          {
            path: "data-prepare",
            component: () => lazyLoadRoute(import(/* webpackChunkName: "data-prepare" */ "./views/app/data/Prepare")),
          },
          {
            path: "data-analyse",
            component: () => lazyLoadRoute(import(/* webpackChunkName: "data-prepare" */ "./views/app/data/Analyse")),
          }
        ]
      },
      {
        path: `models`,
        component: () => lazyLoadRoute(import(/* webpackChunkName: "model" */ "./views/app/ScratchPad")),
      },
      {
        path: "images",
        component: () => lazyLoadRoute(import(/* webpackChunkName: "images" */ "./views/app/images")),
        redirect: `${adminRoot}/images/img-prepare`,
        children: [
          {
            path: "img-prepare",
            component: () => lazyLoadRoute(import(/* webpackChunkName: "img-prep" */ "./views/app/images/Prepare")),
          },
          {
            path: "img-analyse",
            component: () => lazyLoadRoute(import(/* webpackChunkName: "img-prep" */ "./views/app/images/Analyse")),
          }
        ]
      },

      {
        path: "runs",
        component: () => lazyLoadRoute(import(/* webpackChunkName: "runs" */ "./views/app/runs")),
        redirect: `${adminRoot}/runs/runs-new`,
        children: [
          {
            path: "runs-new",
            component: () => lazyLoadRoute(import(/* webpackChunkName: "runs-sub" */ "./views/app/runs/New")),
          },
          {
            path: "runs-history",
            component: () => lazyLoadRoute(import(/* webpackChunkName: "runs-sub" */ "./views/app/runs/History")),
          }
        ]
      },


      // {
      //   path: "training",
      //   component: () => lazyLoadRoute(import(/* webpackChunkName: "training" */ "./views/app/training")),
      //   redirect: `${adminRoot}/training/training-definition`,
      //   children: [
      //     {
      //       path: "training-definition",
      //       component: () => lazyLoadRoute(import(/* webpackChunkName: "training-def" */ "./views/app/training/Definations")),
      //     },
      //     {
      //       path: "training-process",
      //       component: () => lazyLoadRoute(import(/* webpackChunkName: "training-def" */ "./views/app/training/Process")),
      //     },
      //     {
      //       path: "training-generate",
      //       component: () => lazyLoadRoute(import(/* webpackChunkName: "training-def" */ "./views/app/training/Generate")),
      //     }
      //   ]
      // },

      // {
      //   path: "validations",
      //   component: () => lazyLoadRoute(import(/* webpackChunkName: "validation" */ "./views/app/validations")),
      //   redirect: `${adminRoot}/validations/validation-definition`,
      //   children: [
      //     {
      //       path: "validation-definition",
      //       component: () => lazyLoadRoute(import(/* webpackChunkName: "validation-def" */ "./views/app/validations/Definations")),
      //     }
      //   ]
      // },
      // {
      //   path: "prediction",
      //   component: () => lazyLoadRoute(import(/* webpackChunkName: "prediction" */ "./views/app/prediction")),
      //   redirect: `${adminRoot}/prediction/prediction-batch`,
      //   children: [
      //     {
      //       path: "prediction-batch",
      //       component: () => lazyLoadRoute(import(/* webpackChunkName: "prediction-batch" */ "./views/app/prediction/Batch")),
      //     },
      //     {
      //       path: "prediction-one",
      //       component: () => lazyLoadRoute(import(/* webpackChunkName: "prediction-batch" */ "./views/app/prediction/One")),
      //     }
      //   ]
      // },

      // {
      //   path: `${adminRoot}/charts`,
      //   component: () => lazyLoadRoute(import(/* webpackChunkName: "charts" */ "./views/app/charts")),
      // },
      {
        path: `${adminRoot}/reports`,
        component: () => lazyLoadRoute(import(/* webpackChunkName: "reports" */ "./views/app/reports")),
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
