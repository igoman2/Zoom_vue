<template>
  <v-container fluid cols="12" align="center" class="flex">
    <div class="text-center mb-16">
      <h1>JOOM</h1>
      <h2>check the room and enjoy chatting with webRTC</h2>
      <h2>seo test</h2>
      <v-btn class="start-btn mt-16" color="primary" @click="goto('EnterRoom')">
        Get Started
      </v-btn>
    </div>
  </v-container>
</template>

<script>
export default {
  metaInfo() {
    return {
      meta: [
        {
          vmid: "title",
          name: "title",
          content: "Meet people for any kind of conversation",
        },
        {
          vmid: "description",
          name: "description",
          content:
            "Joom is a place where people make rooms and meet others with webRCT, chatting. This is fake of Zoom. I want google to crawl this page",
        },
      ],
    };
  },
  name: "MainPage",
  components: {},
  data: () => ({
    hello: "",
  }),
  computed: {},
  created: function () {
    console.log("Hello!");
  },
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
