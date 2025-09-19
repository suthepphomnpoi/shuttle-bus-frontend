<template>
  <footer class="text-center border-top mt-5 pt-4 pb-4 text-muted">
    <span class="fs-5">© {{ year }} Bus Reservation System</span>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      year: new Date().getFullYear(),
    };
  },
};
</script>
