import { adminRoot } from "./config";
import { UserRole } from "../utils/auth.roles";

const data = [
  {
    id: "dashboards",
    icon: "iconsminds-shop-4",
    label: "menu.dashboards",
    to: `${adminRoot}/dashboards`,
    //roles: [UserRole.Admin, UserRole.Editor],
    // subs: [{
    //   icon: "simple-icon-briefcase",
    //   label: "menu.default",
    //   to: `${adminRoot}/dashboards/default`,
    //   // roles: [UserRole.Admin],
    // }
    // ]
  },
  {
    id: "setup",
    icon: "iconsminds-three-arrow-fork",
    label: "menu.setup",
    to: `${adminRoot}/setup`,
    subs: [
      {
        icon: "simple-icon-logout",
        label: "menu.intents",
        to: `${adminRoot}/setup/intents`,
        subs: [{
          icon: "simple-icon-arrow-right",
          label: "menu.all-intents",
          to: `${adminRoot}/setup/intents/all-intents`
        },
        {
          icon: "simple-icon-arrow-right",
          label: "menu.add-intent",
          to: `${adminRoot}/setup/intents/add-intent`
        }
        ]
      }
    ]
  },
  {
    id: "data",
    icon: "iconsminds-data-center",
    label: "menu.data",
    to: `${adminRoot}/data`,
    subs: [{
      icon: "iconsminds-gaugage",
      label: "menu.data-prepare",
      to: `${adminRoot}/data/data-prepare`
    },
    {
      icon: "iconsminds-monitor-analytics",
      label: "menu.data-analyse",
      to: `${adminRoot}/data/data-analyse`
    }
    ]
  },
  //  {
  //   id: "menu",
  //   icon: "iconsminds-three-arrow-fork",
  //   label: "menu.menu",
  //   to: `${adminRoot}/menu`,
  //   subs: [{
  //     icon: "simple-icon-logout",
  //     label: "menu.types",
  //     to: `${adminRoot}/menu/types`
  //   },
  //   {
  //     icon: "simple-icon-layers",
  //     label: "menu.levels",
  //     to: `${adminRoot}/menu/levels`,
  //     subs: [{
  //       icon: "simple-icon-arrow-right",
  //       label: "menu.third-level-1",
  //       to: `${adminRoot}/menu/levels/third-level-1`
  //     },
  //     {
  //       icon: "simple-icon-arrow-right",
  //       label: "menu.third-level-2",
  //       to: `${adminRoot}/menu/levels/third-level-2`
  //     },
  //     {
  //       icon: "simple-icon-arrow-right",
  //       label: "menu.third-level-3",
  //       to: `${adminRoot}/menu/levels/third-level-3`
  //     }
  //     ]
  //   }
  //   ]
  // },

];
export default data;
