import { urls } from './data-location'
import testEvent from './mock/event-testEvent.json'
import otherEvent from './mock/event-otherEvent.json'

const jsonData = {
  'event-testEvent': testEvent,
  'event-otherEvent': otherEvent
}

const FETCH_MODES = {
  mock: 'mock',
  url: 'url'
}

const SELECTED_FETCH_MODE = FETCH_MODES.mock

const fetchData = dataLocation => {
  const location = urls[dataLocation.urlKey](dataLocation)

  switch (SELECTED_FETCH_MODE) {
    case FETCH_MODES.mock:
      return fetchMockData(location.mock)
    case FETCH_MODES.url:
      return fetchRealData(location.url)
    default:
      return Promise.resolve()
  }
}

const fetchMockData = mockfileName => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(jsonData[mockfileName])
    }, 1000)
  })
}

const fetchRealData = url => {
  return fetch(url).then(response => {
    if (response.ok) {
      return response.json()
    }

    throw new Error(response.text)
  })
}

export default fetchData
