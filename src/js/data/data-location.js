export const urls = {
  event: ({ eventReference }) => ({
    url: `/event/${eventReference}`,
    mock: `event-${eventReference}`
  })
}
