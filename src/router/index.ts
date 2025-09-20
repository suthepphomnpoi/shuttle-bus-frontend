import { createRouter, createWebHashHistory } from "vue-router";
import Detail from "../views/Driver/Detail.vue";
import Success from "../views/Driver/Success.vue";
import Cancel from "../views/Driver/Cancel.vue";
import Confirm from "../views/Driver/Confirm.vue";
import Jobboard from "../views/Driver/JobBoard.vue";
import UserManagement from "../views/BackOffice/UserManagement.vue";
import VehicleTypes from "../views/BackOffice/VehicleTypes.vue";
import EmployeeManage from "../views/BackOffice/EmployeeManage.vue";
import BustripManage from "../views/BackOffice/BustripManage.vue";
import LineWay from "../views/BackOffice/LineWay.vue";
import Login from "../views/UserAuth/Login.vue";
import SearchTrip from "../views/Reserve/SearchTrip.vue";

const routes = [
  {
    path: "/",
    name: "search-trip",
    component: SearchTrip,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
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
  {
    path: "/admin/VehicleTypes",
    name: "VehicleTypes",
    component: VehicleTypes,
  },
  {
    path: "/admin/EmployeeManage",
    name: "EmployeeManage",
    component: EmployeeManage,
  },
  {
    path: "/admin/BusTripManage",
    name: "BusTripManage",
    component: BustripManage,
  },
  {
    path: "/admin/lineway",
    name: "LineWay",
    component: LineWay,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
export default router;
