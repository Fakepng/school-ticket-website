import { Server } from "socket.io";

const SocketHandler = (req, res) => {
  if (res.socket.server.io) {
    console.log('Socket is already running')
  } else {
    console.log('Socket is initializing')
    const io = new Server(res.socket.server)
    res.socket.server.io = io

    io.on('connection', socket => {
      socket.on('new-ticket', msg => {
        socket.broadcast.emit('update-table', msg)
      })
    })
  }
  res.end()
}

export const config = {
  api: {
    bodyParser: false
  }
}

export default SocketHandler