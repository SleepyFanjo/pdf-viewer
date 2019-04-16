export const uploadFileToConverter = file => {
  const form = new FormData()
  form.append('file', file)

  return fetch('/convert', {
    method: 'POST',
    body: form
  }).then(response => {
    return response.blob()
  })
}
