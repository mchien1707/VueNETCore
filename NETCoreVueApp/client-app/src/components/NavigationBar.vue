<template>
  <div class="bg-white mb-1">
    <Menu
      class="d-absolute d-lg-none"
      ref="menu"
      :model="userMenuItems"
      :popup="true"
    />
    <Menu
      class="d-none d-lg-block"
      ref="menuUser"
      :model="userMenuItems"
      :popup="true"
    />
    <div class="container d-flex flex-nowrap p-3 align-items-center">
      <router-link :to="user?.userHomePage ?? '/'"
        ><img class="me-1 me-lg-5" width="200" src="@/assets/logo.svg"
      /></router-link>

      <Button
        @click="toggle"
        style="height: 50px; width: 50px"
        class="ms-auto d-flex d-lg-none primary inverted rounded-circle p-2 align-items-center justify-content-center"
        ><font-awesome-icon size="lg" :icon="['fas', 'bars']"
      /></Button>
      <Button
        @click="toggle"
        class="primary inverted d-none d-lg-flex ms-auto d-flex align-items-center"
      >
        <font-awesome-icon
          :icon="['fas', 'user']"
          class="d-flex align-items-center justify-content-center rounded-circle"
          width="54"
          height="54"
        />
        <p>user</p>
      </Button>
    </div>
  </div>
</template>

<script lang="ts">
import Menuitem from "@/models/MenuItem";
import { useRouter } from "vue-router";
import Menu from "primevue/menu";
import { ref } from "vue";

export default {
  setup() {
    const router = useRouter();
    const menuUser = ref<Menu | null>(null);
    const menu = ref<Menu | null>(null);

    function logout() {
      return;
    }

    return {
      logout,
      menu,
      menuUser,
      userMenuItems: useUserMenuItems(logout, (path) => router.push(path)),
      toggle: (event: Event) => {
        menu.value?.toggle(event);
        menuUser.value?.toggle(event);
      },
    };
  },
};

/* eslint-disable */
function useUserMenuItems(
  logout: () => void,
  navigate: (path: string) => void
): Menuitem[] {
  return [
    {
      label: "Min profil",
      command: () => navigate("/me"),
    },
    {
      label: "Log ud",
      command: () => logout(),
    },
  ];
}
</script>

<style scoped>
p {
  margin-bottom: 0;
}
</style>