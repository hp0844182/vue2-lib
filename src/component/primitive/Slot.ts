import { defineComponent } from 'vue'

export const Slot = defineComponent({
  name: 'PrimitiveSlot',
  setup(_, { slots }) {
    return () => {
      if (!slots.default)
        return null
      return slots.default?.()
    }
  },
})
