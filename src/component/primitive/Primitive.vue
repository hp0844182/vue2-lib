<script setup lang="ts">
import { getCurrentInstance, inject, onUpdated, useListeners, watch } from 'vue'
import type { Vue } from 'vue/types/vue'
import { Slot as SlotV } from './Slot'
import type { PrimitiveProps } from './types'
import { type PresenceState, presenceId } from '@/component/motion/context'

defineOptions({
  name: 'VuePrimitive',
})

withDefaults(defineProps<PrimitiveProps>(), {
  as: 'div',
})
const { transition } = inject(presenceId, {}) as PresenceState
const instance = getCurrentInstance()?.proxy as Vue
watch(() => transition?.value, () => {
  instance.$vnode.data!.transition = transition.value || instance.$vnode.data!.transition
})
const lesteners = useListeners()
</script>

<template>
  <SlotV v-if="asChild" v-on="lesteners">
    <slot />
  </SlotV>
  <component :is="as" v-else v-on="lesteners">
    <slot />
  </component>
</template>
