import crypto from 'crypto'
import fs from 'fs'
import path from 'path'

const dir = path.join('/', 'usr', 'src','app', 'files')
const filePath = path.join(dir, 'log.txt')

const createFileIfNotExists = () => {
    return new Promise((resolve, reject) => {
        fs.access(filePath, fs.constants.F_OK, (err) => {
            if (err) {
                fs.writeFile(filePath, '', (err) => {
                    if (err) {
                        console.error('Error creating the file:', err)
                        reject(err)
                    } else {
                        console.log(`File created at: ${filePath}`)
                        resolve()
                    }
                })
            } else {
                console.log(`File already exists at: ${filePath}`)
                resolve()
            }
        })
    })
}

const getHashNow = () => {
    const randomUUID = crypto.randomUUID()
    const timeNow = new Date().toISOString()

    return `${timeNow}: ${randomUUID}`
}

const main = async () => {
    try {
        await createFileIfNotExists()
        setInterval(() => {
            const hash = getHashNow()

            fs.writeFile(filePath, hash, (err) => {
                if (err) {
                    console.error(err)
                }
                console.log(hash)
            })
        }, 5000)
    } catch (err) {
        console.error('Error in creating file:', err)
    }
}

main()
