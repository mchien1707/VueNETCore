<template>
  <div
    class="d-flex flex-wrap-reverse align-items-end justify-content-between text-nowrap"
  >
    <div class="flex-column mb-2">
      <PrettyBar />
      <h2 v-if="!isNewUser">{{ user?.firstname }} {{ user?.lastname }}</h2>
      <h2 v-else>Opret bruger</h2>
      <small v-if="user.userId" class="text-muted mt-mb-2"
        >ID: {{ user.userId }}</small
      >
    </div>
  </div>

  <form class="user-onbard-info">
    <div class="row" style="">
      <div class="col-md">
        <o-field label="Fornavn *">
          <o-input v-model="user.firstname" disabled></o-input>
        </o-field>
      </div>
      <div class="col-md mt-3 mt-md-0">
        <o-field label="Efternavn *">
          <o-input v-model="user.lastname" disabled></o-input>
        </o-field>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-md">
        <o-field label="Brugernavn (e-mail) *">
          <o-input v-model="user.email" disabled></o-input>
        </o-field>
      </div>
      <div class="col-md mt-3 mt-md-0">
        <o-field label="Telefon nr.">
          <o-input v-model="user.phone" disabled></o-input>
        </o-field>
      </div>
    </div>
    <div class="mt-3 p-3" style="background-color: rgb(247, 249, 251)">
      <div class="d-flex mb-2 align-items-center">
        <strong>Kodeord *</strong>
        <button
          @click="copyPasswordToClipboard"
          type="button"
          class="btn btn-light ms-auto inverted"
        >
          Kopier til udklipsholder
        </button>
      </div>
      <o-field>
        <o-input v-model="password" :disabled="isHavePassword"></o-input>
      </o-field>
    </div>

    <div class="mt-4 d-grid gap-2 col-6 mx-auto" v-if="!isHavePassword">
      <button type="button" class="btn btn-primary" @click="submit">
        {{ $t("TextResources_Submit") }}
      </button>
    </div>
  </form>

  <SuccessModalVue :isVisible="isSaveSuccess">
    <template v-if="!isLinkToNemLoginSuccess">
      <p class="text-center">
        {{ $t("TextResources_LinkToNemLoginQuestion") }}
      </p>
      <div class="text-center mb-5">
        <VDButton @click="linkToNemLogin">
          {{ $t("TextResources_LinkToNemLoginAction") }}
        </VDButton>
      </div>
    </template>
    <template v-else>
      <p class="text-center mb-5">
        {{ $t("TextResources_LinkToNemLoginSuccess") }}
      </p>
    </template>
  </SuccessModalVue>
</template>

<script lang="ts">
import PrettyBar from "@/components/common/PrettyBar.vue";
import { ref, reactive, computed } from "vue";
import VDButton from "@/components/common/VDButton.vue";
import SuccessModalVue from "@/components/SuccessModal.vue";
export default {
  components: {
    PrettyBar,
    VDButton,
    SuccessModalVue,
  },
  setup() {
    const password = ref<string>("_!@!@#_asd");

    const organizationId = ref("c38f089c-89fb-4fa3-b5ab-24602f93fef1");
    const user = reactive({
      firstname: "User",
      lastname: "Administrator",
      userId: "x3ssdasd-2e0e-4c5d-a197-asdasdz2",
      email: "test@gmail.com",
      phone: "0932123123",
      password: "",
    });

    const isHavePassword = computed<Boolean>(() => {
      return user.password != null && user.password.length > 0 ? true : false;
    });

    const isSaveSuccess = ref(false);
    function submit() {
      user.password = password.value;
      isSaveSuccess.value = !isSaveSuccess.value;
    }

    const isLinkToNemLoginSuccess = ref(false);
    function linkToNemLogin() {
      isLinkToNemLoginSuccess.value = !isLinkToNemLoginSuccess.value;
    }

    return {
      user,
      password,
      organizationId,
      submit,
      isSaveSuccess,
      isLinkToNemLoginSuccess,
      linkToNemLogin,
      isHavePassword,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>