import { el } from '@/utility/dom'
import images from '@/wastebox-images'

import { Color, colorTypeMap } from '@/colors'

export class Wastebox {
   color: Color
   boxEl: HTMLElement
   topEl: HTMLElement
   topperEl: HTMLElement
   el: HTMLElement

   constructor(color: string) {
      // assign color
      this.color = color as Color

      // create and nest elements
      this.boxEl = el('div', '.box')
      this.topEl = el('div', '.top')
      this.topperEl = el('div', '.topper')
      this.el = el('div', '.wastebox')

      this.topEl.append(this.topperEl)
      this.el.append(this.topEl)
      this.el.append(this.boxEl)

      // work with styles
      this.boxEl.style.backgroundImage = `url(${images[color].box})`
      this.topEl.style.backgroundImage = `url(${images[color].top})`
      this.topperEl.style.backgroundColor = color

      // add label
      this.boxEl.innerHTML = colorTypeMap[color].toUpperCase()
   }

   // return coordinates to which the trash will travel
   getTopCenter(): { x: number; y: number } {
      const rect = this.el.getBoundingClientRect()
      return {
         x: rect.x + rect.width * 0.5,
         y: rect.y
      }
   }

   // animate the lid when the trash drops
   eat(): void {
      this.el.classList.add('omnomnom')
      window.setTimeout(() => this.el.classList.remove('omnomnom'), 400)
   }
}
