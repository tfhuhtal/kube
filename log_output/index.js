import crypto from 'crypto'

const getHashNow = () => {
  const randomUUID = crypto.randomUUID()
  const timeNow = new Date().toISOString()

  console.log(`${timeNow}: ${randomUUID}`)

  setTimeout(getHashNow, 5000)
}

getHashNow()


