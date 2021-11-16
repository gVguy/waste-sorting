import { el } from '@/utility/dom'

import { colors, Color, colorTypeMap } from '@/colors'
import { Wastebox } from '@/wastebox'

import trashImages from '@/trash-images'

const trashJSON = require('@/trash.json')

export class Trash {
   color: Color
   el: HTMLElement
   name: string
   type: string
   isFlying = false

   constructor() {
      // create a random piece of trash
      const rand = Math.floor(Math.random() * trashJSON.length)
      this.name = trashJSON[rand].name
      this.type = trashJSON[rand].type
      this.color = colorTypeMap[this.type] as Color

      console.log(this.type, this.color, this.name)

      // create element
      this.el = el('div', '.trash')

      // work with styles
      this.el.style.backgroundImage = `url(${trashImages[this.name]})`
   }

   appear(): Trash {
      document.querySelector('#trash-container').append(this.el)
      return this
   }

   disappear(): void {
      this.el.classList.add('disappear')
      this.el.addEventListener('animationend', () => this.el.remove(), {
         once: true
      })
   }

   goToWastebox(wb: Wastebox): Promise<void> {
      const target = wb.getTopCenter()
      const rect = this.el.getBoundingClientRect()
      const x = target.x - rect.x - rect.width * 0.5
      const y = target.y - rect.y

      return new Promise(async resolve => {
         // fly to box
         // set the class
         this.isFlying = true
         this.el.classList.add('flying')
         // wait for class style to apply
         const compStyle = window.getComputedStyle(this.el)
         await new Promise<void>(resolve => {
            const wait = () => {
               setTimeout(() => {
                  if (compStyle.getPropertyValue('transition-duration') != '0s')
                     resolve()
                  else wait()
               }, 0)
            }
            wait()
         })

         // then fly to new location
         this.el.style.transform = `translate(${x}px, ${y}px)`

         // drop to box
         this.el.addEventListener(
            'transitionend',
            () => {
               this.el.remove()
               this.el.style.transform = ''
               this.el.classList.add('drop')
               wb.el.append(this.el)
            },
            { once: true }
         )
         this.el.addEventListener(
            'animationend',
            () => {
               this.el.remove()
               resolve()
            },
            { once: true }
         )
      })
   }
}
