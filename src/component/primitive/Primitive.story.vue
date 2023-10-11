<!-- Meow.story.vue -->
<script setup lang="ts">
import { Primitive } from './index'
</script>

<template>
  <Story>
    <Variant title="as a">
      <Primitive as="a">
        a element
      </Primitive>
    </Variant>
    <Variant title="asChild">
      <Primitive as-child>
        <div>as child</div>
      </Primitive>
    </Variant>
  </Story>
</template>
