import { connect, JSONCodec } from 'nats'
import TelegramBot from 'node-telegram-bot-api'

const TELEGRAM_CHAT_ID = '1848265945'
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN

const nats = await connect({ servers: 'nats://my-nats.project.svc.cluster.local:4222' })
const jsonCodec = JSONCodec()

const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: false })

const sub = nats.subscribe('todos', { queue: 'broadcaster.workers' })

for await (const msg of sub) {
  const todo = jsonCodec.decode(msg.data)
  bot.sendMessage(TELEGRAM_CHAT_ID, `Todo: ${JSON.stringify(todo, null, 2)}`, { parse_mode: 'HTML' })
}

await nats.close()
