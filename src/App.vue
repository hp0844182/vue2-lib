<script setup lang="ts">
import { ref } from 'vue'
import { Primitive } from '@/component/primitive'
import { Motion, Presence } from '@/component/motion'
import { DialogClose, DialogContent, DialogDescription, DialogOverlay, DialogPortal, DialogRoot, DialogTitle, DialogTrigger } from '@/component/dialog'
</script>

<template>
  <div>
    <DialogRoot>
      <DialogTrigger class="fixed z-20 text-red-500 fixed" as-child>
        <button>
          open
        </button>
      </DialogTrigger>
      <DialogPortal>
        <Presence>
          <DialogOverlay as-child>
            <Motion class="fixed inset-0 bg-black/25" :initial="{ opacity: 0, transition: { duration: 300, easing: 'ease-out' } }" :animate="{ opacity: 1 }" :exit="{ opacity: 0, transition: { duration: 200, easing: 'ease-in' } }" />
          </DialogOverlay>
        </Presence>
        <DialogContent
          class=" fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-[100]"
        >
          <DialogTitle class="text-mauve12 m-0 text-[17px] font-semibold">
            Edit profile
          </DialogTitle>
          <DialogDescription class="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
          <fieldset class="mb-[15px] flex items-center gap-5">
            <label class="text-grass11 w-[90px] text-right text-[15px]" for="name"> Name </label>
            <input
              id="name"
              class="text-grass11 shadow-green7 focus:shadow-green8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
              defaultValue="Pedro Duarte"
            >
          </fieldset>
          <fieldset class="mb-[15px] flex items-center gap-5">
            <label class="text-grass11 w-[90px] text-right text-[15px]" for="username"> Username </label>
            <input
              id="username"
              class="text-grass11 shadow-green7 focus:shadow-green8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
              defaultValue="@peduarte"
            >
          </fieldset>
          <div class="mt-[25px] flex justify-end">
            <DialogClose as-child>
              <button
                class="bg-green4 text-green11 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-semibold leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
              >
                Save changes
              </button>
            </DialogClose>
          </div>
          <DialogClose
            class="text-grass11 hover:bg-green4 focus:shadow-green7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
            aria-label="Close"
          >
            <Icon icon="lucide:x" />
          </DialogClose>
        </DialogContent>
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
