<script setup lang="ts">
import { Slot as SlotV } from './Slot'
import type { PrimitiveProps } from './types'

defineOptions({
  name: 'VuePrimitive',
})

withDefaults(defineProps<PrimitiveProps>(), {
  as: 'div',
})
</script>

<template>
  <SlotV v-if="asChild">
    <slot />
  </SlotV>
  <component :is="as" v-else>
    <slot />
  </component>
</template>
