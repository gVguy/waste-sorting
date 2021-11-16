import { el } from '@/utility/dom'

export class Counter {
   value = 0
   el: HTMLElement
   contentEl: HTMLElement

   constructor(className: string) {
      this.el = el('div', '.counter ' + className)
      this.contentEl = el('div', '.counter-content')
      this.el.append(this.contentEl)
      this.contentEl.innerHTML = this.value + ''
   }

   add() {
      this.value++
      this.update()
   }

   reset() {
      this.value = 0
      this.update()
   }

   update() {
      this.contentEl.innerHTML = this.value + ''
      this.el.classList.add('add')
      this.contentEl.addEventListener(
         'transitionend',
         () => this.el.classList.remove('add'),
         { once: true }
      )
   }
}
