import { el, elNS } from '@/utility/dom'

// runs when new game button is clicked
export function newGame(cb: () => void) {
   // work with new game button
   timerContainer.classList.add('active')

   // start game
   active = true
   timeLeft = 60000
   gameStarted = Date.now()

   // time indicator shoud not blink
   indicatorCircle.classList.remove('hurry')

   requestAnimationFrame(step)

   // remember the callback function
   gameOverCallback = cb
}

// called when each second passes
function step() {
   timeLeft = 60000 - (Date.now() - gameStarted)

   if (timeLeft > 0) {
      // there is still time

      // update the circle
      indicatorCircle.setAttribute(
         'stroke-dasharray',
         (timeLeft * 440) / 60000 + ' 440'
      )

      // when little time left blink the indicator
      if (timeLeft < 10000 && !indicatorCircle.classList.contains('hurry')) {
         indicatorCircle.classList.add('hurry')
      }

      // continue the loop
      requestAnimationFrame(step)
   } else {
      // time over
      // end game
      active = false
      timerContainer.classList.remove('active')

      // let the app know game ended
      gameOverCallback()
   }
}

export function showFeedback(isCorrect: boolean): void {
   const feedback = el('div', '.feedback')
   feedback.classList.add(isCorrect ? 'correct' : 'wrong')
   feedback.addEventListener('animationend', () => feedback.remove(), {
      once: true
   })
   feedbackContainer.append(feedback)
}

export let active = false
export let timeLeft = 0

let gameOverCallback: () => void

let gameStarted = 0

// create and nest new game and timer elements
export const timerWrapper = el('div', '.timer-wrapper')
const timerContainer = el('div', '.timer-container')

const timer = elNS('svg', {
   class: 'timer',
   viewBox: '0 0 150 150'
})
timer.append(
   elNS('circle', {
      r: '70',
      cx: '75',
      cy: '75',
      class: 'backdrop'
   })
)
const indicatorCircle = elNS('circle', {
   r: '70',
   cx: '75',
   cy: '75',
   class: 'indicator',
   'stroke-dasharray': '440'
})
timer.append(indicatorCircle)

const trashContainer = el('div', '#trash-container')
export const newGameButton = el('div', '.new-game')

newGameButton.innerHTML = 'Начать!'

const feedbackContainer = el('div', '#feedback-container')

timerContainer.append(timer)
timerContainer.append(feedbackContainer)
timerContainer.append(trashContainer)
timerContainer.append(newGameButton)

timerWrapper.append(timerContainer)
