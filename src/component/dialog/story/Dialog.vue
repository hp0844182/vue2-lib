<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import {
  DialogClose,
  DialogContent,
  // DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from '../'
import { Motion, Presence } from '@/component/motion'

const dialogOpen = ref(false)
</script>

<template>
  <div>
    <button class="absolute z-20" @click="dialogOpen = !dialogOpen">
      change
    </button>
    <Transition name="fade">
      <!-- <DialogOverlay  as-child> -->
      <div v-if="dialogOpen" class="bg-blackA9  fixed inset-0 " />
      <!-- </DialogOverlay> -->
    </Transition>
  </div>
</template>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
