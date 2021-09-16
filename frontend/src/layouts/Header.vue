<template>
  <v-app-bar app clipped-left clipped-right color="white" dark flat>
    <div>
      <v-app-bar-nav-icon
        class="grey--text"
        @click="setSidebarDrawer(!Sidebar_drawer)"
      />
    </div>

    <!---/Toggle sidebar part -->
    <v-spacer />
    <!---Logo part -->

    <v-spacer />
  </v-app-bar>
</template>
<script>