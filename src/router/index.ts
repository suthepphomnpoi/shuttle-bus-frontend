import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Detail from "../views/Driver/Detail.vue";
import Success from "../views/Driver/Success.vue";
import Cancel from "../views/Driver/Cancel.vue";
import Confirm from "../views/Driver/Confirm.vue";
import Jobboard from "../views/Driver/JobBoard.vue";
import UserManagement from "../views/BackOffice/UserManagement.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/drivers/details",
    name: "details",
    component: Detail,
  },
  {
    path: "/drivers/success",
    name: "success",
    component: Success,
  },
  {
    path: "/drivers/cancel",
    name: "cancel",
    component: Cancel,
  },
  {
    path: "/drivers/confirm",
    name: "confirm",
    component: Confirm,
  },
  {
    path: "/drivers/jobboard",
    name: "jobboard",
    component: Jobboard,
  },
  {
    path: "/admin/user-managements",
    name: "user-managements",
    component: UserManagement,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
export default router;
