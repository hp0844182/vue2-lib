<script setup lang="ts">
import { inject } from 'vue'
import { DIALOG_INJECTION_KEY } from './context'
import {
  DismissableLayer,
  type DismissableLayerEmits,
  type DismissableLayerProps,
} from '@/component/dismissable-layer'

export interface DialogContentImplProps extends DismissableLayerProps {
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling transntion with Vue native transition or other animation libraries.
   */
  forceMount?: boolean
  /**
   * When `true`, focus cannot escape the `Content` via keyboard,
   * pointer, or a programmatic focus.
   * @defaultValue false
   */
  trapFocus?: boolean
}

export type DialogContentImplEmits = DismissableLayerEmits & {
  /**
   * Event handler called when auto-focusing on open.
   * Can be prevented.
   */
  (e: 'openAutoFocus', event: Event): void
  /**
   * Event handler called when auto-focusing on close.
   * Can be prevented.
   */
  (e: 'closeAutoFocus', event: Event): void
}

const props = defineProps<DialogContentImplProps>()
const emits = defineEmits<DialogContentImplEmits>()

const { contentId, descriptionId, titleId, open, onOpenChange } = inject(DIALOG_INJECTION_KEY)!
</script>

<template>
  <DismissableLayer
    v-bind="$attrs"
    :id="contentId"
    :as="as"
    :as-child="asChild"
    :disable-outside-pointer-events="disableOutsidePointerEvents"
    role="dialog"
    :aria-describedby="descriptionId"
    :aria-labelledby="titleId"
    :data-state="open ? 'open' : 'close'"
    @dismiss="() => {
      onOpenChange(false)
    }"
    @escape-key-down="emits('escapeKeyDown', $event)"
    @focus-outside="emits('focusOutside', $event)"
    @interact-outside="emits('interactOutside', $event)"
    @pointer-down-outside="emits('pointerDownOutside', $event)"
  >
    <slot />
  </DismissableLayer>
</template>
