<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue2'
import { Motion, Presence } from '@/component/motion'
import { DialogClose, DialogContent, DialogDescription, DialogOverlay, DialogPortal, DialogRoot, DialogTitle, DialogTrigger } from '@/component/dialog'

const show = ref(false)
function handleClick() {
  show.value = !show.value
}
</script>

<template>
  <div>
    <DialogRoot>
      <DialogTrigger class="fixed z-20 text-red-500 " data-data="2" as-child>
        <button @click="handleClick">
          open
        </button>
      </DialogTrigger>
      <DialogPortal>
        <Presence>
          <DialogOverlay as-child>
            <Motion class="fixed inset-0 bg-black/25" :initial="{ opacity: 0 }" :animate="{ opacity: 1, transition: { duration: 0.3, easing: 'ease-out' } }" :exit="{ opacity: 0, transition: { duration: 0.2, easing: 'ease-in' } }" />
          </DialogOverlay>
        </presence>
        <Presence>
          <DialogContent
            class="fixed inset-0 overflow-y-auto"
            as-child
          >
            <Motion
              :initial="{
                opacity: 0,
                scale: 0.95,
              }"
              :exit="{
                opacity: 0,
                scale: 0.95,

              }"
              :animate="{
                opacity: 1,
                scale: 1,
                transition: {
                  duration: 0.3,
                  easing: 'ease-out',
                },
              }"
              class="flex min-h-full items-center justify-center p-4 text-center"
            >
              <div
                class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
              >
                <DialogClose
                  class="text-grass11 hover:bg-green4 focus:shadow-green7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                  aria-label="Close"
                >
                  <Icon icon="lucide:x" />
                </DialogClose>
                <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
                  Payment successful
                </DialogTitle>
                <DialogDescription class="mt-2 text-sm text-gray-500">
                  Make changes to your profile here. Click save when you're done.
                </DialogDescription>
                <div class="mt-4">
                  <DialogClose as-child>
                    <button
                      type="button"
                      class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    >
                      Got it, thanks!
                    </button>
                  </DialogClose>
                </div>
              </div>
            </Motion>
          </DialogContent>
        </Presence>
      </DialogPortal>
    </DialogRoot>
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
