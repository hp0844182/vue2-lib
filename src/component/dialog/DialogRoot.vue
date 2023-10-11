<script setup lang="ts">
import { provide, ref, toRefs } from 'vue'
import { useVModel } from '@vueuse/core'
import type { DialogProvideValue } from './context'
import { DIALOG_INJECTION_KEY } from './context'
import { useId } from '@/shared'

export interface DialogRootProps {
  open?: boolean
  defaultOpen?: boolean
  modal?: boolean
}

export interface DialogRootEmits {
  'update:open': [value: boolean]
}

const props = withDefaults(defineProps<DialogRootProps>(), {
  open: undefined,
  defaultOpen: false,
  modal: true,
})

const emit = defineEmits<DialogRootEmits>()

const open = useVModel(props, 'open', emit as any, {
  defaultValue: props.defaultOpen,
  passive: true,
})

const triggerElement = ref<HTMLElement>()
const contentElement = ref<HTMLElement>()
const { modal } = toRefs(props)
provide<DialogProvideValue>(DIALOG_INJECTION_KEY, {
  open,
  modal,
  openModal: () => {
    open.value = true
  },
  onOpenChange: (value) => {
    open.value = value
  },
  onOpenToggle: () => {
    open.value = !open.value
  },
  contentId: useId(),
  titleId: useId(),
  descriptionId: useId(),
  triggerElement,
  contentElement,
})
</script>

<template>
  <slot />
</template>
