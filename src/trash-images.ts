import { preloadImages } from '@/utility'

const trashJSON = require('@/trash.json')

// { plastic-bottle: url/to/plastic-bottle.png }
const trashImages: { [index: string]: string } = Object.fromEntries(
   trashJSON.map((i: { name: string; type: string }): [string, string] => [
      i.name,
      require(`@/assets/${i.name}.png`)
   ])
)

preloadImages(Object.values(trashImages))

export default trashImages
