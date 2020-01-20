import Cookie from 'js-cookie'
export const state = () => ({
  token: null
})

export const mutations = {
  setToken (state, token) {
    state.token = token
  },
  clearToken (state) {
    state.token = null
  }
}

export const getters = {
  getToken (state) {
    return state.token
  },
  isAuthenticated (state) {
    return state.token != null
  }
}

export const actions = {
  authenticateUser (vuexContext, authData) {
    let authUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.fbKey}`
    if (!authData.isLogin) {
      authUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.fbKey}`
    }
    return this.$axios.post(authUrl, {
      email: authData.email,
      password: authData.password,
      returnSecureToken: true
    })
      .then(({ data }) => {
        vuexContext.commit('setToken', data.idToken)
        localStorage.setItem('token', data.idToken)
        localStorage.setItem('tokenExpiration', new Date().getTime() + Number.parseInt(data.expiresIn) * 1000)
        Cookie.set('jwt', data.idToken)
        Cookie.set(
          'expirationDate',
          new Date().getTime() + Number.parseInt(data.expiresIn) * 1000
        )
        this.$axios.post('http://localhost:3000/api/track-data', {
          data: 'This is my data'
        })
      })
      .catch(error => console.log(error))
  },
  setLogoutTimer (vuexContext, duration) {
    setTimeout(() => {
      vuexContext.commit('clearToken')
    }, duration)
  },
  initAuth (vuexContext, req) {
    let token, expirationDate

    // if request is on server side
    if (req) {
      if (!req.headers.cookie) {
        return true
      }
      // token and expiration date from the cookie
      token = req.headers.cookie.split(';').find(c => c.trim().startsWith('jwt=')).split('=')[1]
      expirationDate = req.headers.cookie.split(';').find(c => c.trim().startsWith('expirationDate=')).split('=')[1]
      if (!token) {
        vuexContext.dispatch('logout')
        return
      }
    } else {
      // token and expiration date from the localStorage
      token = localStorage.getItem('token')
      expirationDate = localStorage.getItem('tokenExpiration')
    }
    // commit clearToken for invalid case
    if (new Date().getTime() > +expirationDate || !token) {
      console.log(new Date().getTime() > Number.parseInt(expirationDate))
      vuexContext.dispatch('logout')
      return true
    }
    vuexContext.commit('setToken', token)
  },
  logout (vuexContext) {
    vuexContext.commit('clearToken')
    Cookie.remove('jwt')
    Cookie.remove('expirationDate')
    if (process.client) {
      localStorage.removeItem('token')
      localStorage.removeItem('tokenExpiration')
    }
  }
}
