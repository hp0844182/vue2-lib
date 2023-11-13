import { defineComponent } from 'vue'

export const Slot = defineComponent({
  name: 'PrimitiveSlot',
  inheritAttrs: true,
  setup(_, { slots, listeners }) {
    return () => {
      if (!slots.default)
        return null
      return slots.default?.({
        listeners,
      })
    }
  },
})
