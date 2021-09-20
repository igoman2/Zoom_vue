<template>
  <v-container fluid cols="12" align="center" class="flex">
    <div class="text-center mb-16">
      <div>
        <!-- {{ hello }} -->
      </div>
      <h1>JOOM</h1>
      <v-btn class="start-btn mt-16" color="primary" @click="goto('EnterRoom')">
        Get Started
      </v-btn>
    </div>
  </v-container>
</template>

<script>
// import { getHello } from "@/service/room";
export default {
  name: "MainPage",
  components: {},
  data: () => ({
    hello: "",
  }),
  computed: {},
  created: function () {
    console.log("Hello!");
    // this.init();
  },
  methods: {
    // async init() {
    //   const resp = await getHello();
    //   this.hello = resp;
    // },
    goto(name) {
      this.$router.push({
        name: name,
      });
    },
  },
};
</script>

<style lang="scss">
.flex {
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
}
</style>
