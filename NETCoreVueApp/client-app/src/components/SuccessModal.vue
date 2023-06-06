<template>
  <Dialog
    :draggable="false"
    :visible="isVisible"
    :modal="true"
    :style="{ width: '50vw' }"
  >
    <div
      class="d-flex justify-content-center flex-column align-items-center mt-5"
    >
      <template v-if="isSuccess">
        <img src="@/assets/success.png" alt="success" />
        <p class="fs-2 fw-bolder text-success">Success</p>
      </template>
      <template v-else>
        <img src="@/assets/error.png" alt="fail" />
        <p class="fs-2 fw-bolder text-danger">Error</p>
      </template>
    </div>
    <slot />
  </Dialog>
</template>

<script lang="ts">
export default {
  components: {},
  props: {
    isSuccess: {
      type: Boolean,
      default: true,
    },
    isVisible: {
      type: Boolean,
      default: false,
    },
  },
  setup() {},
};
</script>

<style scoped>
img {
  width: 70px;
  height: 70px;
}
</style>