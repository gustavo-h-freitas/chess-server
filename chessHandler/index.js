const players = []
let piecesPosition = []
let playerTurn = 'white'

function handlePlayerConnection () {
  const playerConnected = players.find(({ player }) => player === 'white' || player === 'black')
  if (playerConnected) {
    return playerConnected.player === 'white' ? 'black' : 'white'
  }

  return 'white'
}

const chessHandler = (socket, io) => {
  socket.on('playerDisconnect', (playerDisconnected) => {
    players.splice(players.findIndex(({ player }) => player === playerDisconnected), 1)
  })

  socket.on('disconnect', () => {
    console.log('A user disconnected')
  })

  socket.on('movePiece', piecesPayload => {
    piecesPosition = piecesPayload
    playerTurn = playerTurn === 'white' ? 'black' : 'white'
    io.emit('playerMove', { piecesPosition, playerTurn })
  })

  socket.on('resetGame', () => {
    playerTurn = 'white'
    io.emit('resetGame')
  })
  
  if (players.length === 2) return
  
  socket.emit('currentPlayer', {
    player: handlePlayerConnection()
  })
  players.push({ player: handlePlayerConnection() })
}

module.exports = chessHandler