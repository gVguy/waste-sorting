// creates element with class or id
export function el(e: string, qSelector?: string): HTMLElement {
   const el = document.createElement(e)

   // if a selector is passed, assign it
   if (qSelector) {
      const selectorName = qSelector.slice(1)
      if (qSelector.charAt(0) == '.') {
         // selector is a class
         el.className = selectorName
      } else if (qSelector.charAt(0) == '#') {
         // selector is an id
         el.id = selectorName
      }
   }
   return el
}
