const app = require('express')()
const http = require('http').createServer(app)
const chessHandler = require('./chessHandler/index')
const io = require('socket.io')(http, {
	cors: {
		origins: ['http://localhos:8080']
	}
})

app.get('/', (req, res) => {
  res.send('<h1>Hey Socket.io</h1>')
})

io.on('connection', socket => chessHandler(socket, io))

http.listen(3000, () => {
	console.log('listening on localhost:3000')
})