export type Color = 'blue' | 'green' | 'red' | 'yellow'

export const colors = ['blue', 'green', 'red', 'yellow']

export const colorTypeMap = new Proxy(
   {
      green: 'glass',
      blue: 'plastic',
      yellow: 'paper',
      red: 'metal'
   },
   {
      get(target: { [index: string]: string }, prop: string) {
         if (target.hasOwnProperty(prop)) {
            return target[prop]
         } else {
            return Object.keys(target).find(key => target[key] == prop)
         }
      }
   }
)
