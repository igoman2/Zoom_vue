<template>
  <div>
    <Header @drawer="setDrawer"></Header>
    <div style="height: 100%">
      <router-view />
    </div>
  </div>
</template>

<script>
import Header from "../layouts/Header";
// import Sidebar from "../layouts/Sidebar";

export default {
  name: "Layout",
  components: {
    // Sidebar,
    Header,
  },
  data: () => ({
    expandOnHover: false,
  }),
  methods: {
    setDrawer: function (flag) {
      this.drawer = false;
      this.drawer = flag;
    },
  },
};
</script>
