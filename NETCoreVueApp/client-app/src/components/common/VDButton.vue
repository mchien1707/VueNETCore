<template>
  <Button
    :disabled="isLoading || isDisabled"
    @click="$emit('click', $event)"
    :class="variant"
  >
    <font-awesome-icon
      v-if="icon || isLoading"
      class="me-2"
      :spin="isLoading"
      :icon="isLoading ? ['fas', 'spinner'] : ['fas', icon]"
    />
    <slot />
  </Button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  emits: ["click"],
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      required: false,
    },
    variant: {
      type: String,
      default: "primary",
    },
  },
});
</script>
