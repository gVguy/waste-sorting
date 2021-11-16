import { el } from '@/utility/dom'
import { Wastebox } from '@/wastebox'
import { Trash } from '@/trash'
import * as Game from '@/game'
import { colors, Color } from '@/colors'
import { Counter } from '@/counter'

// runs on wastebox click
function wasteboxClickHandler(wb: Wastebox) {
   if (!(Game.active && activeTrash && !activeTrash.isFlying)) return
   // game is active
   // process the answer
   const isCorrect = wb.color == activeTrash.color

   if (isCorrect) {
      correctCounter.add()
   } else {
      wrongCounter.add()
   }

   // move trash to the wastebox
   // wait for it to disappear and create a new one
   activeTrash.goToWastebox(wb).then(() => {
      if (Game.active) activeTrash = new Trash().appear()
   })

   Game.showFeedback(isCorrect)

   // wastebox omnomnom
   wb.eat()
}

// runs on wastebox hover
function wasteboxOverHandler(e: PointerEvent) {
   if (e.pointerType == 'touch') return
   if (!(Game.active && activeTrash)) return
   const wb = e.target as HTMLElement
   wb.classList.add('sneak')
}

// runs on wastebox hover out
function wasteboxOutHandler(e: PointerEvent) {
   if (e.pointerType == 'touch') return
   const wb = e.target as HTMLElement
   wb.classList.remove('sneak')
}

// runs on new game button click
function newGameClickHandler() {
   if (Game.active) return

   // reset counters
   correctCounter.reset()
   wrongCounter.reset()

   // start game
   // providing a callback to be called when game ends
   Game.newGame(gameOver)

   // create new piece of garbage
   activeTrash = new Trash().appear()
}

// game over callback
// runs when time runs out
function gameOver() {
   if (activeTrash && !activeTrash.isFlying) {
      activeTrash.disappear()
      activeTrash = null
   }
}

// variables for storing trash instances
let activeTrash: Trash

// create app
const app = el('div', '#app')

// new game / timer
// create containing element
const upperContainer = el('div', '.upper-container')

// create counters
const correctCounter = new Counter('correct')
const wrongCounter = new Counter('wrong')

// add elements to upper container from left ot right
upperContainer.append(correctCounter.el)
upperContainer.append(Game.timerWrapper)
upperContainer.append(wrongCounter.el)

// add upper container to the app
app.append(upperContainer)

// attach event listener to new game button
Game.newGameButton.addEventListener('click', newGameClickHandler)

// create wasteboxes
// create containing element
const wasteboxesContainer = el('div', '.wasteboxes-container')

// array of wastebox instances
const wasteboxes = colors.map((color: Color) => {
   // crate a wastebox
   const wastebox = new Wastebox(color)

   // attach the event listenerы
   wastebox.el.addEventListener('click', () => wasteboxClickHandler(wastebox))
   wastebox.el.addEventListener('pointerenter', wasteboxOverHandler)
   wastebox.el.addEventListener('pointerleave', wasteboxOutHandler)

   // append to parent container
   wasteboxesContainer.append(wastebox.el)
   return wastebox
})

// add wasteboxes to app
app.append(wasteboxesContainer)

// export app
export default app
