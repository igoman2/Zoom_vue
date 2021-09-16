<template>
  <v-navigation-drawer
    v-model="Sidebar_drawer"
    :dark="SidebarColor !== 'white'"
    :color="SidebarColor"
    mobile-break-point="960"
    clipped
    :right="$vuetify.rtl"
    mini-variant-width="70"
    :expand-on-hover="expandOnHover"
    app
    id="main-sidebar"
    v-bar
    no-gutters
  >
    asd
  </v-navigation-drawer>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Sidebar",
  props: {
    expandOnHover: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({}),
  computed: {
    ...mapState(["user", "SidebarColor", "SidebarBg"]),

    Sidebar_drawer: {
      get() {
        console.log("qwe");
        return this.$store.state.Sidebar_drawer;
      },
      set(val) {
        console.log("asd");
        this.$store.dispatch("SET_SIDEBAR_DRAWER", val);
      },
    },
  },

  watch: {
    //  "$vuetify.breakpoint.smAndDown"(val) {
    //   this.$emit("update:expandOnHover", !val);
    // }
  },

  methods: {
    goUrl: function (url) {
      window.open(url, "_blank");
      this.expandOnHover = false;
    },
    goto: function (name) {
      // this.$router.push({ name: name });
      this.$router.push({ name: name }).catch((error) => {
        if (error.name != "NavigationDuplicated") {
          throw error;
        }
        this.$router.go(this.$router.currentRoute);
      });

      this.expandOnHover = false;
    },
  },
};
</script>
<style lang="scss">
#main-sidebar {
  .v-navigation-drawer__border {
    display: none;
  }
  .v-navigation-drawer {
    overflow-x: hidden;
  }
  .v-list {
    padding: 8px 15px;
  }
  .v-list-item {
    &__icon--text,
    &__icon:first-child {
      justify-content: center;
      text-align: center;
      width: 20px;
    }
  }
}
</style>
