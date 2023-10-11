<script lang="ts">
import type { ComputedRef, InjectionKey, Ref } from 'vue'
import { computed, provide } from 'vue'
import type { DataOrientation, Direction, Type } from '@/shared/types'
</script>

<script setup lang="ts">
import {
  Primitive,
  type PrimitiveProps,
  usePrimitiveElement,
  // usePrimitiveElement,
} from '@/component/primitive'
import { useSingleOrMultipleValue } from '@/shared/useSingleOrMultipleValue'

export interface AccordionRootProps extends PrimitiveProps {
  /**
   * Determines whether one or multiple items can be opened at the same time.
   */
  type: Type

  /**
   * The controlled value of the item to expand when type is "single" or the controlled values of the items to expand when type is "multiple".
   */
  modelValue?: string | string[]

  /**
   * The default value of the item to expand when type is "single" or the default values of the items to expand when type is "multiple".
   * Use when you do not need to control the state of the item(s).
   */
  defaultValue?: string | string[]

  /**
   * When type is "single", allows closing content when clicking trigger for an open item.
   * When type is "multiple", this prop has no effect.
   *
   * @default false
   */
  collapsible?: boolean

  /**
   * When true, prevents the user from interacting with the accordion and all its items
   *
   * @default false
   */
  disabled?: boolean

  /**
   * The reading direction of the accordion when applicable. If omitted, assumes LTR (left-to-right) reading mode.
   *
   * @default "ltr"
   */
  dir?: Direction

  /**
   * The orientation of the accordion.
   *
   * @default "vertical"
   */
  orientation?: DataOrientation
}

export interface AccordionRootEmits {
  'update:modelValue': [value: string | string[] | undefined]
}

const props = withDefaults(defineProps<AccordionRootProps>(), {
  asChild: false,
  dir: 'ltr',
  disabled: false,
  orientation: 'vertical',
  collapsible: false,
})

const emits = defineEmits<AccordionRootEmits>()

const ACCORDION_INJECTION_KEY
  = Symbol('accordion key') as InjectionKey<AccordionProvideValue>

export interface AccordionProvideValue {
  disabled?: AccordionRootProps['disabled']
  direction: AccordionRootProps['dir']
  orientation: AccordionRootProps['orientation']
  parentElement: Ref<HTMLElement | undefined>
  changeModelValue(value: string): void
  isSingle: ComputedRef<boolean>
  modelValue: Ref<string | undefined | string[]>
  collapsible: boolean
}

const { modelValue, changeModelValue } = useSingleOrMultipleValue(props, emits)

const { primitiveElement, currentElement: parentElement }
  = usePrimitiveElement()

provide<AccordionProvideValue>(ACCORDION_INJECTION_KEY, {
  disabled: props.disabled,
  direction: props.dir,
  orientation: props.orientation,
  parentElement,
  isSingle: computed(() => props.type === 'single'),
  collapsible: props.collapsible,
  modelValue,
  changeModelValue,
})

defineExpose({
  modelValue,
})
</script>

<template>
  <Primitive ref="primitiveElement" :as-child="asChild" :as="as">
    <slot :model-value="modelValue" />
  </Primitive>
</template>
