import { Server as SocketIOServer } from 'socket.io'

export default function initSocket(server: any) {
  const io = new SocketIOServer(server, {
    cors: {
      origin: '*', // Ajuste as políticas de CORS conforme necessário
      methods: ['GET', 'POST'],
    },
  })

  // Ouvinte para conexão de novos clientes
  io.on('connection', (socket) => {
    console.log('New client connected: ' + socket.id)

    // Ouvinte para receber mensagens e emitir para todos os clientes conectados
    socket.on('sendMessage', (message) => {
      io.emit('receiveMessage', message)
    })

    // Ouvinte para desconexao de clientes
    socket.on('disconnect', () => {
      console.log('Client disconnected: ' + socket.id)
    })
  })

  return io
}
