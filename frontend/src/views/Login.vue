<template>
  <v-container
    id="login"
    class="fill-height d-flex justify-center"
    tag="section"
  >
    Login 입니다
    <!-- <v-row class="py-0" style="height: 120px">
      <v-col class="d-flex justify-center login-title-font">
        {{ $t("login.text4").toUpperCase() }}
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
          action="/"
          class="px-8"
        >
          <v-row class="d-flex justify-center">
            <v-col cols="12" xl="5" lg="5" md="6" sm="8" xs="12" class="py-0">
              <span class="login-prompt-font px-0 pb-1">
                {{ $t("login.text1") }}
              </span>
              <span class="ml-1 login-prompt-hint-font">
                {{ $t("signup.text2") }}
              </span>
              <v-text-field
                v-model="email"
                :rules="emailRules"
                class="editLabel"
                required
                outlined
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row class="d-flex justify-center">
            <v-col cols="12" xl="5" lg="5" md="6" sm="8" xs="12" class="pt-0">
              <span class="login-prompt-font px-0 pb-1">
                {{ $t("login.text2") }}
              </span>
              <span class="ml-1 login-prompt-hint-font">
                {{ $t("yalliyalli.common.purchase41") }}
              </span>
              <v-text-field
                v-model="password"
                :rules="passwordRules"
                class="editLabel"
                required
                outlined
                :append-icon="showPasword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPasword = !showPasword"
                :type="showPasword ? 'text' : 'password'"
                @keydown.enter="submit"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row class="d-flex justify-center">
            <v-col cols="12" xl="5" lg="5" md="6" sm="8" xs="12" class="py-0">
              <v-alert
                v-if="!!error"
                border="right"
                colored-border
                type="error"
                elevation="2"
              >
                {{ error }}
              </v-alert>
            </v-col>
          </v-row>

          <v-row class="d-flex justify-center" style="margin-top: -5px">
            <v-col
              cols="12"
              xl="5"
              lg="5"
              md="6"
              sm="8"
              xs="12"
              class="py-0 pb-1"
            >
              <v-btn
                :disabled="!valid"
                color="primary"
                block
                depressed
                submit
                @click="submit"
                :loading="isProgress"
                height="53"
              >
                <span class="login-btn-font">
                  {{ $t("login.text4").toLowerCase() }}
                </span>
              </v-btn>
            </v-col>
          </v-row>

          <v-row>
            <v-col class="d-flex justify-center pt-0">
              <a href="/authentication/password" class="link">
                <span class="forgot-pw-font">{{ $t("login.text5") }}</span>
              </a>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row> -->
  </v-container>
</template>

<script>
export default {
  name: "Login",
  components: {},
  data: () => ({
    isProgress: false,
    error: null,
    valid: true,
    password: "",
    showPasword: false,
    keepSigned: true,
    email: "",
    toPath: "",
  }),
  created: function () {
    console.log("created login");
    if (this.$store.state.user) {
      this.$router.push({
        name: "Main",
      });
    }
    this.toPath = this.$route.params.redirectPath;
  },
  computed: {
    // ...mapGetters({
    //   errorState: "getErrorState",
    // }),
    text9() {
      return this.$t("login.text9");
    },
    isLoggedIn: function () {
      return this.$store.state.user;
    },
  },
  watch: {
    // isLoggedIn: function() {
    //   if (this.$store.state.user) {
    //     this.$router.push({
    //       name: "Main",
    //     });
    //   }
    // },
  },
  methods: {
    // ...mapActions(["login"]),
    setError(errMsg) {
      this.error = errMsg;
    },
    async submit() {
      console.log("keepSigned:" + this.keepSigned);
      this.isProgress = true;
      this.error = null;
      this.$refs.form.validate();
      if (this.$refs.form.validate(true)) {
        try {
          let loginResult = await this.login({
            email: this.email,
            password: this.password,
            keepSigned: this.keepSigned,
          });

          if (loginResult.status == 200) {
            this.goToPages();
          } else if (loginResult.status >= 500) {
            this.error = this.$t("yalliyalli.common.purchase47");
          } else {
            this.error = this.$t("yalliyalli.common.purchase46");
          }
        } catch (err) {
          console.error(err);
        }
      }
      this.isProgress = false;
    },

    submit2() {
      // Android
      location.href =
        "intent://www.test.com#Intent;scheme=http;package=com.android.chrome;end";

      // iOS
      location.href = "ftp://www.test.com/bridge.html";
    },

    goToPages() {
      if (typeof this.toPath === "undefined") {
        this.$router.go(-1);
      } else {
        this.$router.push({
          path: this.toPath,
        });
      }
    },
  },
};
</script>

<style lang="scss">
.editLabel {
  .v-label {
    color: #8c8c8c;
    font-size: 0.8em;
  }
}
.displayNoneTextFD {
  .v-text-field__details {
    display: none;
  }
  .v-messages {
    display: none;
  }
}
.login-title-font {
  margin-top: 63px;
  opacity: 0.96;
  font-family: "Noto Sans KR";
  font-size: 40px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 0.34;
  letter-spacing: -2px;
  text-align: right;
  color: rgba(34, 34, 34, 0.96);
}
.login-prompt-font {
  margin-bottom: 8px;
  opacity: 0.96;
  font-family: "Noto Sans KR";
  font-size: 18px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 0.75;
  letter-spacing: -0.9px;
  color: rgba(34, 34, 34, 0.96);
}
.login-prompt-hint-font {
  margin-bottom: 8px;
  opacity: 0.96;
  font-family: "Noto Sans KR";
  font-size: 12.5px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.08;
  letter-spacing: -0.63px;
  text-align: right;
  color: rgba(144, 143, 143, 0.96);
}
.login-btn-font {
  opacity: 0.96;
  font-family: "Noto Sans KR";
  font-size: 24px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 0.56;
  letter-spacing: -1.2px;
  text-align: right;
  color: rgba(255, 255, 255, 0.96);
}
.forgot-pw-font {
  opacity: 0.96;
  font-family: "Noto Sans KR";
  font-size: 14.5px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 0.93;
  letter-spacing: -0.73px;
  text-align: right;
  color: rgba(34, 34, 34, 0.96);
}

.btn-group {
  .btn-social {
    display: block;
    width: 100%;
    height: 53px !important;
    margin-bottom: 15px;
    border-radius: 0;
    color: #ffff;
    box-shadow: unset;
    position: relative;
    padding: 0 !important;
    .img-social {
      position: absolute;
      background-color: #ffff;
      left: 0;
      width: 50px;
      height: 48px;
      img {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
    &.btn-facebook {
      background-color: #3b5998 !important;
    }
    &.btn-google {
      background-color: #4285f4 !important;
    }
    &.btn-talk {
      background-color: #ffe800 !important;
      color: #392324;
    }
    &.btn-naver {
      background-color: #00bf18 !important;
    }
  }
}
.theme--light.v-icon {
  color: rgba(0, 0, 0, 0.54);
}
</style>
