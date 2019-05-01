const WebSocketServer = require('websocket').server
const http = require('http')
const uuidv1 = require('uuid/v1')

// Stores the connected clients to be controlled by the rest API
let connections = []

const sendRawData = (data, client) => {
  if (client.readyState === client.OPEN) {
    client.send(data)

    return Promise.resolve()
  }

  return Promise.reject()
}

const sendJSONData = (data, client) => {
  sendRawData(JSON.stringify(data), client)
}

const server = http.createServer((req, res) => {
  res.writeHead(404)
  res.end()
})

server.listen(3002, () => {
  console.log('WebsocketServer is listening on port 3002')
})

const wsServer = new WebSocketServer({
  httpServer: server,
  autoAcceptConnections: false
})

wsServer.on('request', req => {
  const connection = req.accept('echo-protocol')
  const connectionId = uuidv1()
  connection.on('close', () => {
    console.log(connectionId + ' disconnected.')
    connections = connections.filter(
      connectionData => connectionData.uuid !== connectionId
    )
  })
  console.log(connectionId + ' connected.')
  connections.push({ uuid: connectionId, connection: connection })
  sendJSONData({ type: 'UUID', uuid: connectionId }, connection)
})

// Triggered by the API => Send message to client
const handleWsMessage = (message, clientId) => {
  console.log('received ' + message + ' from api')
  connections.forEach(connectionData => {
    if (clientId && connectionData.uuid !== clientId) {
      return
    }
    console.log('sending data to ' + connectionData.uuid)

    sendJSONData({ type: message }, connectionData.connection)
  })
}

module.exports = {
  connections: connections,
  handleWsMessage: handleWsMessage
}
