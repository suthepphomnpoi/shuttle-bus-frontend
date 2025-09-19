import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Details from "../views/Details.vue";
import Success from "../views/Success.vue";
import Cancel from "../views/Cancel.vue";
import Confirm from "../views/Confirm.vue";
import Usermanagemant from "../views/backoffice/Usermanagemant.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/details",
    name: "details",
    component: Details,
  },
  {
    path: "/success",
    name: "success",
    component: Success,
  },
  {
    path: "/cancel",
    name: "cancel",
    component: Cancel,
  },
  {
    path: "/confirm",
    name: "confirm",
    component: Confirm,
  },
  {
    path: "/Usermanagemant",
    name: "Usermanagemant",
    component: Usermanagemant,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
export default router;
