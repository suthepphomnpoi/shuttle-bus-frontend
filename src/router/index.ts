import { createRouter, createWebHashHistory, type RouteRecordRaw } from "vue-router";
import { useSession, fetchMe } from "../composables/useSession";
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
import TripManage from "../views/BackOffice/TripManage.vue";
import DepartmentManage from "../views/BackOffice/DepartmentManage.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "search-trip",
    component: SearchTrip,
    meta: { requiresAuth: false },
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: { guestOnly: true },
  },
  {
    path: "/drivers/details",
    name: "details",
    component: Detail,
    meta: { requiresAuth: true },
  },
  {
    path: "/drivers/success",
    name: "success",
    component: Success,
    meta: { requiresAuth: true },
  },
  {
    path: "/drivers/cancel",
    name: "cancel",
    component: Cancel,
    meta: { requiresAuth: true },
  },
  {
    path: "/drivers/confirm",
    name: "confirm",
    component: Confirm,
    meta: { requiresAuth: true },
  },
  {
    path: "/drivers/jobboard",
    name: "jobboard",
    component: Jobboard,
    meta: { requiresAuth: true },
  },
  {
    path: "/admin/user-managements",
    name: "user-managements",
    component: UserManagement,
    meta: { requiresAuth: true },
  },
  {
    path: "/admin/VehicleTypes",
    name: "VehicleTypes",
    component: VehicleTypes,
    meta: { requiresAuth: true },
  },
  {
    path: "/admin/EmployeeManage",
    name: "EmployeeManage",
    component: EmployeeManage,
    meta: { requiresAuth: true },
  },
  {
    path: "/admin/BusTripManage",
    name: "BusTripManage",
    component: BustripManage,
    meta: { requiresAuth: true },
  },
  {
    path: "/admin/lineway",
    name: "LineWay",
    component: LineWay,
    meta: { requiresAuth: true },
  },
    {
    path: "/admin/trip-manage",
    name: "trip-manage",
    component: TripManage,
    meta: { requiresAuth: true },
  },
      {
    path: "/admin/department-manage",
    name: "department-manage",
    component: DepartmentManage,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// Global auth guard
router.beforeEach(async (to, _from, next) => {
  const { loaded, isLoggedIn } = useSession();
  // Ensure we know session state on first navigation
  if (!loaded.value) {
    await fetchMe();
  }

  const requiresAuth = Boolean(to.meta && (to.meta as any).requiresAuth);
  const guestOnly = Boolean(to.meta && (to.meta as any).guestOnly);

  if (requiresAuth && !isLoggedIn.value) {
    return next({ name: "login", query: { redirect: to.fullPath } });
  }

  if (guestOnly && isLoggedIn.value) {
    const redirect = (to.query?.redirect as string) || "/";
    return next(redirect);
  }

  return next();
});
export default router;
