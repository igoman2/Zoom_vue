<template>
  <v-container>
    <v-list class="menu pt-3">
      <v-list-item-title
        @click="goto('main')"
        class="main-text"
        style="
          font-size: 35px;
          color: black !important;
          cursor: pointer !important;
        "
      >
        Bank-Box
      </v-list-item-title>

      <v-list-item-title class="main-text mt-6">
        금융 상품 조회
      </v-list-item-title>
      <v-list-item
        v-if="getMenu == 'deposit'"
        @click="goto('deposit')"
        style="cursor: pointer; color: red !important"
        class="pb-0 pl-0"
      >
        — {{ "예금" }}
      </v-list-item>
      <v-list-item
        v-else
        @click="goto('deposit')"
        style="cursor: pointer"
        class="pb-0 pl-0"
      >
        — {{ "예금" }}
      </v-list-item>
      <v-list-item
        v-if="getMenu == 'saving'"
        class="pb-0 pl-0"
        @click="goto('saving')"
        style="cursor: pointer; color: red !important"
      >
        — {{ "적금" }}
      </v-list-item>
      <v-list-item
        v-else
        class="pb-0 pl-0"
        @click="goto('saving')"
        style="cursor: pointer"
      >
        — {{ "적금" }}
      </v-list-item>
      <v-list-item
        v-if="getMenu == 'loan'"
        @click="goto('loan')"
        style="cursor: pointer; color: red !important"
        class="pb-0 pl-0"
      >
        — {{ "대출" }}
      </v-list-item>
      <v-list-item
        v-else
        @click="goto('loan')"
        style="cursor: pointer"
        class="pb-0 pl-0"
      >
        — {{ "대출" }}
      </v-list-item>

      <v-list-item-title class="main-text mt-6">
        이자 계산기
      </v-list-item-title>
      <v-list-item
        v-if="getMenu == 'calculate-deposit'"
        @click="goto('calculate-deposit')"
        style="cursor: pointer; color: red !important"
        class="pb-0 pl-0"
      >
        — {{ "예금 이자 계산" }}
      </v-list-item>
      <v-list-item
        v-else
        @click="goto('calculate-deposit')"
        style="cursor: pointer"
        class="pb-0 pl-0"
      >
        — {{ "예금 이자 계산" }}
      </v-list-item>
      <v-list-item
        v-if="getMenu == 'calculate-saving'"
        @click="goto('calculate-saving')"
        style="cursor: pointer; color: red !important"
        class="pb-0 pl-0"
      >
        — {{ "적금 이자 계산" }}
      </v-list-item>
      <v-list-item
        v-else
        @click="goto('calculate-saving')"
        style="cursor: pointer"
        class="pb-0 pl-0"
      >
        — {{ "적금 이자 계산" }}
      </v-list-item>

      <v-list-item-title class="main-text mt-6">
        투자 상품 추천
      </v-list-item-title>
      <v-list-item
        v-if="getMenu == 'recommand'"
        @click="goto('recommand')"
        style="cursor: pointer; color: red !important"
        class="pb-0 pl-0"
      >
        — {{ "펀드 추천" }}
      </v-list-item>
      <v-list-item
        v-else
        @click="goto('recommand')"
        style="cursor: pointer"
        class="pb-0 pl-0"
      >
        — {{ "펀드 추천" }}
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script>
export default {
  name: "Menu",
  data: () => ({
    isYY: false,
    SidebarColor: "white",
  }),
  computed: {
    getMenu: {
      get: function () {
        return this.$store.getters.getMenu;
      },
    },
  },
  methods: {
    goto(link) {
      this.$store.dispatch("menuMutation", { newMenu: link });
      this.$router.push({
        path: link,
      });
    },
  },
};
</script>

<style scoped>
.menu {
  background-color: rgb(235, 245, 255) !important;
}

.main-text {
  cursor: pointer;
  font-weight: bold;
  font-size: 25px;
  color: rgb(28, 132, 180) !important;
}
</style>
