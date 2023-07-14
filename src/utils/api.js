import { PATH, urlOrder } from "./constants";

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


export const resetPassword = (data) => {
  return fetch(`${PATH}/password-reset`, {
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
  return fetch(`${PATH}/password-reset/reset`, {
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
  return fetch(`${PATH}/auth/register`, {
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
  return fetch(`${PATH}/auth/login`, {
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
  return fetch(`${PATH}/auth/logout`, {
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

export const getUser = () => {
  return fetchWithRefresh('GET', `${PATH}/auth/user`)
}

export const editUser = (newName, newEmail, newPassword) => {
  return fetchWithRefresh('PATCH', `${PATH}/auth/user`, { name: newName, email: newEmail, password: newPassword })
}

export const postOrder = (burger) => {
  return fetchWithRefresh('POST', `${PATH}/orders`, { ingredients: burger })
}


export const refreshToken = () => {
  return fetch(`${PATH}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  }).then(res => checkResponse(res));
};

export const fetchWithRefresh = async (method, URL, endpoint) => {
  const config = {
    method: method,
    headers: {
      'Content-Type': "application/json",
      authorization: localStorage.getItem("accessToken")
    },
    body: JSON.stringify(endpoint)
  }
  try {
    const res = await fetch(URL, config);
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
      const res = await fetch(URL, config); //повторяем запрос
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};

export { api };
