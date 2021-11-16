import { colors, Color } from '@/colors'
import { preloadImages } from '@/utility'

const wasteboxImages: { [index: string]: { box: string; top: string } } = {}

colors.forEach((color: Color) => {
   const box = require(`@/assets/wastebox_${color}.png`)
   const top = require(`@/assets/wastetop_${color}.png`)

   preloadImages([box, top])

   wasteboxImages[color] = { box, top }
})

export default wasteboxImages
