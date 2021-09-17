<template>
  <v-app>
    <div class="main-content">
      <router-view />
    </div>
  </v-app>
</template>

<script>
export default {
  name: "Layout",
  components: {
    // Header: () => import("@/layouts/Header"),
  },
  data: () => ({
    expandOnHover: false,
  }),
  methods: {},
};
</script>
<style lang="scss">
.main-content {
  height: 100%;
}
</style>
