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
  {
    id: "images",
    icon: "simple-icon-grid",
    label: "menu.images",
    to: `${adminRoot}/images`,
    subs: [{
      icon: "iconsminds-gaugage",
      label: "menu.img-prepare",
      to: `${adminRoot}/images/img-prepare`
    },
    {
      icon: "iconsminds-monitor-analytics",
      label: "menu.img-analyse",
      to: `${adminRoot}/images/img-analyse`
    }
    ]
  },
  {
    id: "training",
    icon: "iconsminds-books",
    label: "menu.training",
    to: `${adminRoot}/training`,
    subs: [{
      icon: "iconsminds-gaugage",
      label: "menu.training-definations",
      to: `${adminRoot}/training/training-definations`
    },
    {
      icon: "iconsminds-monitor-analytics",
      label: "menu.training-process",
      to: `${adminRoot}/training/training-process`
    },
    {
      icon: "iconsminds-green-energy",
      label: "menu.training-generate",
      to: `${adminRoot}/training/training-generate`
    }
    ]
  },
  {
    id: "validations",
    icon: "iconsminds-scale",
    label: "menu.validation-validations",
    to: `${adminRoot}/validations`,
    //roles: [UserRole.Admin, UserRole.Editor],
    subs: [{
      icon: "simple-icon-briefcase",
      label: "menu.validation-definations",
      to: `${adminRoot}/validations/validation-definations`,
      // roles: [UserRole.Admin],
    }
    ]
  },
  {
    id: "prediction",
    icon: "iconsminds-gift-box",
    label: "menu.prediction",
    to: `${adminRoot}/prediction`,
    subs: [{
      icon: "iconsminds-box-with-folders",
      label: "menu.prediction-batch",
      to: `${adminRoot}/prediction/prediction-batch`
    },
    {
      icon: "iconsminds-monitor-analytics",
      label: "menu.prediction-one",
      to: `${adminRoot}/prediction/prediction-one`
    }
    ]
  },
];
export default data;
