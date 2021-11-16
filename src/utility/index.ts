// preloads a single image from a string url
export function preloadImage(url: string): void {
   const img = new Image()
   img.src = url
}

//preloads images from an array of urls
export function preloadImages(urls: string[]): void {
   const img = new Image()
   urls.forEach(url => {
      img.src = url
   })
}
