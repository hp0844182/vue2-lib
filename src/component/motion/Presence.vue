<script setup lang="ts">
import { type Ref, computed, getCurrentInstance, onBeforeUpdate, onUpdated, provide, ref } from 'vue'
import type { Vue } from 'vue/types/vue'
import { mountedStates } from '@motionone/dom'
import type { PresenceState } from './context'
import { presenceId } from './context'

interface PresenceProps {
  name?: string
  initial?: boolean
  exitBeforeEnter?: boolean
}
const props = withDefaults(defineProps<PresenceProps>(), {
  initial: true,
  exitBeforeEnter: false,
})
const doneCallbacks = new WeakMap<Element, VoidFunction>()

function removeDoneCallback(element: Element) {
  const prevDoneCallback = doneCallbacks.get(element)
  prevDoneCallback
    && element.removeEventListener('motioncomplete', prevDoneCallback)
  doneCallbacks.delete(element)
}

const transitionRef = ref<object | null>(null)
const state: PresenceState = { initial: props.initial, transition: transitionRef }

provide(presenceId, state)

onBeforeUpdate(() => {
  state.initial = undefined
})

const instance = getCurrentInstance()?.proxy as Vue
onUpdated(() => {
  const child = instance.$slots.default?.[0]
  transitionRef.value = child?.data?.transition || null
})

function enter(element: Element) {
  const state = mountedStates.get(element)
  if (!state)
    return

  removeDoneCallback(element)
  state.setActive('exit', false)
}

function exit(element: Element, done: VoidFunction) {
  const state = mountedStates.get(element)
  if (!state)

    return done()

  state.setActive('exit', true)

  removeDoneCallback(element)
  doneCallbacks.set(element, done)
  element.addEventListener('motioncomplete', done)
}

const mode = computed(() => {
  return props.exitBeforeEnter ? 'out-in' : undefined
})
</script>

<template>
  <transition
    v-bind="$attrs"
    :name="name"
    :mode="mode"
    @enter="enter"
    @leave="name ? undefined : exit"
  >
    <slot />
  </transition>
</template>
