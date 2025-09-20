<template>
  <nav class="navbar navbar-expand-lg bg-white border-bottom">
    <div class="container">
      <RouterLink class="navbar-brand d-flex align-items-center gap-2" to="/">
        <img :src="logo" alt="Logo" width="30" height="24" class="d-inline-block align-text-top" />
        <span>Shuttle Bus</span>
      </RouterLink>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <!-- หน้าแรก -->
          <li class="nav-item">
            <RouterLink class="nav-link" to="/">หน้าหลัก</RouterLink>
          </li>

          <li class="nav-item">
            <RouterLink class="nav-link" to="/login">Login</RouterLink>
          </li>


          <!-- Dropdown: Driver -->
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Driver
            </a>
            <ul class="dropdown-menu">
              <li>
                <RouterLink class="dropdown-item" to="/drivers/confirm">Confirm</RouterLink>
              </li>
              <li>
                <RouterLink class="dropdown-item" to="/drivers/cancel">Cancel</RouterLink>
              </li>
              <li>
                <RouterLink class="dropdown-item" to="/drivers/success">Success</RouterLink>
              </li>
              <li>
                <RouterLink class="dropdown-item" to="/drivers/details">Details</RouterLink>
              </li>
            </ul>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Back Office
            </a>
            <ul class="dropdown-menu">
              <li>
                <RouterLink class="dropdown-item" to="/admin/user-managements">User Management</RouterLink>
              </li>
              <li>
                <RouterLink class="dropdown-item" to="/admin/VehicleTypes">VehicleTypes</RouterLink>
              </li>
              <li>
                <RouterLink class="dropdown-item" to="/admin/EmployeeManage">EmployeeManage</RouterLink>
              </li>
              <li>
                <RouterLink class="dropdown-item" to="/admin/BusTripManage">BusTripManage</RouterLink>
              </li>
            </ul>
          </li>
        </ul>

        <!-- (ถ้ามีเมนูฝั่งขวา เช่น โปรไฟล์/ล็อกอิน ใส่ตรงนี้) -->
      </div>
    </div>
  </nav>
</template>

<script setup>
import { RouterLink } from "vue-router";
import logo from "../assets/images/bus.png";
</script>

<style scoped>
/* ขีดเส้นใต้เมนูที่ active ให้เห็นชัด */
.nav-link.router-link-active {
  font-weight: 600;
  text-decoration: underline;
}

/* ทำให้ dropdown item ที่ active ดูต่าง */
.dropdown-item.router-link-active {
  font-weight: 600;
}
</style>
