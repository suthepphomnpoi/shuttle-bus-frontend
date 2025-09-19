<template>
  <nav class="navbar navbar-expand-lg bg-white shadow-sm">
    <div
      class="container-fluid d-flex align-items-center justify-content-between"
    >
      <router-link
        class="navbar-brand d-flex align-items-center"
        to="/"
        style="margin-left: 20px"
      >
        <img :src="logo" alt="Bus Logo" width="40" height="40" />
      </router-link>
      <div class="d-flex align-items-center">
        <span class="me-3 text-muted">Hi! Jetsada</span>
        <img
          src="https://i.pravatar.cc/32?u=jetsada"
          alt="User Avatar"
          class="rounded-circle"
          width="32"
          height="32"
        />
      </div>
    </div>
    <hr class="m-0" />
  </nav>
</template>

<script setup>
import logo from "../assets/images/bus.png";
</script>
