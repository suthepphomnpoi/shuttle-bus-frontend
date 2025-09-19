<template>
  <footer class="text-center border-top mt-5 pt-4 pb-4 text-muted">
    <small class="text-muted">© {{ year }} Bus Reservation System</small>
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
