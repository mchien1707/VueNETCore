<template>
  <div class="mb-3 pretty-bar bg-primary"></div>
</template>

<style scoped>
.pretty-bar {
  width: 80px;
  height: 8px;
}
</style>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "PrettyBar",
});
</script>
