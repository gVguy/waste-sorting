const trashJSON = require('@/trash.json')

const trashImages: { [index: string]: string } = Object.fromEntries(
   trashJSON.map((i: { name: string; type: string }): [string, string] => [
      i.name,
      require(`@/assets/${i.name}.png`)
   ])
)

export default trashImages
