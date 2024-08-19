import { Server as SocketIOServer } from 'socket.io'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'

let io: SocketIOServer<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>

export default function initSocket(server: any) {
  io = new SocketIOServer(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  })

  io.on('connection', (socket) => {
    console.log('New client connected: ' + socket.id)
    socket.on('sendMessage', (message) => {
      io.emit('receiveMessage', message)
    })
    socket.on('disconnect', () => {
      console.log('Client disconnected: ' + socket.id)
    })
  })

  return io
}

export function getIO() {
  if (!io) {
    throw new Error('Socket.io not initialized')
  }
  return io
}
