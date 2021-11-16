import { colors, Color } from '@/colors'

const wasteboxImages: { [index: string]: { box: string; top: string } } = {}

colors.forEach((color: Color) => {
   wasteboxImages[color] = {
      box: require(`@/assets/wastebox_${color}.png`),
      top: require(`@/assets/wastetop_${color}.png`)
   }
})

export default wasteboxImages
