<template>
  <v-container>
    <v-row>Joom</v-row>
    <div>
      <v-form v-model="valid" ref="form" lazy-validation action="/">
        <v-container>
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="roomName"
                :counter="10"
                label="First name"
                required
              ></v-text-field>
            </v-col>

            <!-- <v-col cols="12" md="4">
              <v-text-field
                v-model="lastname"
                :rules="nameRules"
                :counter="10"
                label="Last name"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="E-mail"
                required
              ></v-text-field>
            </v-col> -->
          </v-row>
        </v-container>
      </v-form>
      <v-btn @click="submit"> submit </v-btn>
      <!-- <Setup /> -->
    </div>
  </v-container>
</template>

<script>
export default {
  name: "MainPage",
  components: {
    // Setup: () => import("@/views/components/Setup"),
  },

  data: () => ({ roomName: null, valid: true }),

  computed: {},

  created: async function () {},

  mounted: async function () {
    this.$socket.on("welcome", async () => {
      // const offer = await myPeerConnection.createOffer();
      // myPeerConnection.setLocalDescription(offer);
      console.log("sent the offer");
      // socket.emit("offer", offer, roomName);
    });
  },

  directives: {},

  methods: {
    checkSocket() {
      console.log("!");
    },
    async submit() {
      this.$refs.form.validate();
      this.$socket.emit("join_room", this.roomName);
    },
  },
};
</script>

<style lang="scss"></style>
