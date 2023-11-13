import {
  defineComponent,
  getCurrentInstance,
  h,
  ref,
  toRefs,
  useSlots,
} from 'vue'
import type {
  Ref,
  VNode,
} from 'vue'
import { unrefElement } from '@vueuse/core'
import { usePresence } from './usePresence'

export interface PresenceProps {
  /**
   * Conditional to mount or unmount the child element. Similar to `v-if`
   *
   * @required true
   */
  present: boolean
  /**
   * Force the first child element to render all the time.
   * Useful for programmatically render grandchild component together with the exposed `present`
   *
   * @default false
   */
  forceMount?: boolean
}

export default defineComponent({
  name: 'Presence',
  props: {
    present: {
      type: Boolean,
      required: true,
    },
    forceMount: {
      type: Boolean,
    },
  },
  setup(props, { expose }) {
    const { present, forceMount } = toRefs(props)
    // const slots = useSlots()
    const node = ref<HTMLElement>()
    // Mount composables once to prevent duplicated eventListener
    const { isPresent } = usePresence(present, node)
    expose({ present: isPresent })

    // const children = slots?.default?.({ present: isPresent })
    // const instance = getCurrentInstance()

    // if (children && children?.length > 1) {
    //   const componentName = instance?.parent?.type.name
    //     ? `<${instance.parent.type.name} />`
    //     : 'component'

    //   throw new Error(
    //     [
    //       `Detected an invalid children for \`${componentName}\` for  \`Presence\` component.`,
    //       '',
    //       'Note: Presence works similarly to `v-if` directly, but it waits for animation/transition to finished before unmounting. So it expect only one direct child of valid VNode type.',
    //       'You can apply a few solutions:',
    //       [
    //         'Provide a single child element so that `presence` directive attach correctly.rv',
    //         'Ensure the first child is an actual element instead of a raw text node or comment node.',
    //       ]
    //         .map(line => `  - ${line}`)
    //         .join('\n'),
    //     ].join('\n'),
    //   )
    // }
    return {
      isPresent,
      node,
      forceMount,
    }
  },
  render() {
    if (this.forceMount || this.present || this.isPresent) {
      return h('div', {
        ref: (v) => {
          const el = unrefElement(v as HTMLElement)
          if (typeof el?.hasAttribute === 'undefined')
            return el
          // special case to handle animation for PopperContent
          if (el?.hasAttribute('data-radix-popper-content-wrapper'))
            this.node = el.firstChild as HTMLElement
          else
            this.node = el

          return el
        },
      })
    }
    else { return null }
  },
})
