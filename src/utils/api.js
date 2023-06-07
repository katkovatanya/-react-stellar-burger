const checkResponse = (res) => {
  if (res.ok) {
    return res.json()
  }
  return Promise.reject(`Ошибка ${res.status}`);
}

const api = (url) => {
  return fetch(url)
  .then(res => checkResponse(res))
}

export default api;