<script setup lang="ts">
import { useMounted } from '@vueuse/core'
import { watch } from 'vue'
import { Teleport } from '@/component/teleport'

export interface DialogPortalProps {
  to?: string
  disabled?: boolean
}
const props = defineProps<DialogPortalProps>()
</script>

<template>
  <Teleport v-bind="props">
    <slot />
  </Teleport>
</template>
