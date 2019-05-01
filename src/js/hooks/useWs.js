import { useEffect, useState } from 'react'

import { w3cwebsocket as WS } from 'websocket'

const client = new WS('ws://localhost:3002', 'echo-protocol')

export const useWs = ({
  goNextPage,
  goPreviousPage,
  goFirstPage,
  goLastPage,
  goToPage,
  toggleAutorotate,
  increaseAutorotateDelay,
  decreaseAutorotateDelay
}) => {
  const [uuid, setUuid] = useState(null)
  const [connectedToApi, setConnectedToApi] = useState(false)

  useEffect(() => {
    client.onopen = () => {
      setConnectedToApi(true)
    }
  }, [])

  client.onmessage = e => {
    if (typeof e.data === 'string') {
      const action = JSON.parse(e.data)

      handleAction(action)
    }
  }

  const handleAction = action => {
    switch (action.type) {
      case 'UUID':
        setUuid(action.uuid)
        break
      case 'nextPage':
        goNextPage()
        break
      case 'previousPage':
        goPreviousPage()
        break
      case 'firstPage':
        goFirstPage()
        break
      case 'lastPage':
        goLastPage()
        break
      case 'goToPage':
        goToPage(action.page)
        break
      case 'toggleAutorotateOn':
        toggleAutorotate(true)
        break
      case 'toggleAutorotateOff':
        toggleAutorotate(false)
        break
      case 'toggleAutorotate':
        toggleAutorotate()
        break
      case 'increaseAutorotateDelay':
        increaseAutorotateDelay()
        break
      case 'decreaseAutorotateDelay':
        decreaseAutorotateDelay()
        break
      default:
        break
    }
  }

  return {
    uuid,
    connectedToApi
  }
}
