<template>
  <v-container fluid cols="12" align="center" class="flex">
    <div class="text-center mb-16">
      <h1>JOOM</h1>
      <v-btn class="start-btn mt-16" color="primary" @click="goto('EnterRoom')">
        Get Started
      </v-btn>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "MainPage",
  components: {},
  data: () => ({}),
  computed: {},
  created: function () {},
  methods: {
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
