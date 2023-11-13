<script setup lang="ts">
import { inject } from 'vue'
import DialogContentModal from './DialogContentModal.vue'
import DialogContentNonModal from './DialogContentNonModal.vue'
import {
  type DialogContentImplEmits,
  type DialogContentImplProps,
} from './DialogContentImpl.vue'
import { DIALOG_INJECTION_KEY } from './context'

const props = defineProps<DialogContentProps>()

const emits = defineEmits<DialogContentEmits>()

const { open } = inject(DIALOG_INJECTION_KEY)!

export interface DialogContentProps extends DialogContentImplProps {}
export type DialogContentEmits = DialogContentImplEmits
</script>

<template>
  <DialogContentNonModal
    v-if="open"
    v-bind="{ ...props, ...$attrs }"
    @open-auto-focus="emits('openAutoFocus', $event)"
    @close-auto-focus="emits('closeAutoFocus', $event)"
  >
    <slot />
  </DialogContentNonModal>
</template>
