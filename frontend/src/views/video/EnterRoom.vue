<template>
  <v-container fluid cols="12" align="center" class="flex">
    <div class="text-center mb-16 text-center">
      <v-form v-model="valid" ref="form" lazy-validation action="/">
        <v-container>
          <v-row justify="center">
            <v-col cols="12" md="4">
              <v-text-field
                v-model="roomName"
                label="Room name"
                :rules="nameRules"
                required
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
      <v-btn class="start-btn mt-16" color="primary" @click="goto()">
        Enter the Room
      </v-btn>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "EnterRoom",
  components: {},
  data: () => ({
    roomName: null,
    valid: true,
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
    ],
  }),
  computed: {},
  created: function () {},
  methods: {
    goto() {
      if (this.$refs.form.validate(true)) {
        this.$router.push({
          name: "VideoRoom",
          params: {
            roomId: this.roomName,
          },
        });
      }
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
