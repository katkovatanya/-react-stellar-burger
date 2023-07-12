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
    .then(res => checkResponse(res))
}



export const resetPassword = (data) => {
  return fetch('https://norma.nomoreparties.space/api/password-reset', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: data
    })
  })
    .then(res => checkResponse(res))
}

export const sentNewPassword = (newPassword, key) => {
  return fetch('https://norma.nomoreparties.space/api/password-reset/reset', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      password: newPassword,
      token: key
    })
  })
    .then(res => checkResponse(res))
}

export const createNewUser = (email, password, name) => {
  return fetch('https://norma.nomoreparties.space/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email,
      password: password,
      name: name
    })
  })
    .then(res => checkResponse(res))
}

export const logIn = (email, password) => {
  return fetch('https://norma.nomoreparties.space/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email,
      password: password,
    })
  })
    .then(res => checkResponse(res))
}

export const logOut = (token) => {
  return fetch('https://norma.nomoreparties.space/api/auth/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      token: token
    })
  })
    .then(res => checkResponse(res))
}

export const refreshToken = () => {
  return fetch(`https://norma.nomoreparties.space/api/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  }).then(res => checkResponse(res));
};

export const fetchWithRefresh = async (method, endpoint) => {
  const config = {
    method: method,
    headers: {
      'Content-Type': "application/json",
      authorization: localStorage.getItem("accessToken")
    },
    body: JSON.stringify(endpoint)
  }
  try {
    const res = await fetch('https://norma.nomoreparties.space/api/auth/user', config);
    return await checkResponse(res);
  } catch (err) {
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken(); //обновляем токен
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      localStorage.setItem("accessToken", refreshData.accessToken);
      config.headers.authorization = refreshData.accessToken;
      const res = await fetch('https://norma.nomoreparties.space/api/auth/user', config); //повторяем запрос
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};

export { api };
