<script setup lang="ts">
import { inject, watch } from 'vue'
import { DIALOG_INJECTION_KEY } from './context'
import { Primitive, type PrimitiveProps } from '@/component/primitive'
import { Presence } from '@/component/presence'
import { useBodyScrollLock } from '@/shared'

export interface DialogOverlayProps extends PrimitiveProps {
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling transntion with Vue native transition or other animation libraries.
   */
  forceMount?: boolean
}

defineProps<DialogOverlayProps>()
const context = inject(DIALOG_INJECTION_KEY)

const isLocked = useBodyScrollLock()
watch(
  () => context?.open.value,
  n => (isLocked.value = n ?? false),
)
</script>

<template>
  <Presence :present="forceMount || context!.open.value">
    <Primitive
      v-bind="$attrs"
      :as="as"
      :as-child="asChild"
      :data-state="context?.open.value ? 'open' : 'closed'"
      style="pointer-events: auto"
      data-aria-hidden="true"
      aria-hidden="true"
    >
      <slot />
    </Primitive>
  </Presence>
</template>
