export const checkResponse = (res) => {
  if (res.ok) {
    return res.json()
  }
  return Promise.reject(`Ошибка ${res.status}`);
}

const api = (url) => {
  return fetch(url)
    .then(res => checkResponse(res))
}

export const apiOrder = (urlOrder, burger) => {
  return fetch(urlOrder, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ingredients: burger
    })
  })
  .then(res => {
    if (res.ok) {
      return res.json()
    }
    return ('ошибка :(');
  })
}
export { api };