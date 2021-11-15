import { el } from '@/utility/dom'

const app = el('div', '#app')

app.innerHTML = '<h1>Hi</h1>'

const imgContainer = el('div', '.img')
app.append(imgContainer)

export default app
