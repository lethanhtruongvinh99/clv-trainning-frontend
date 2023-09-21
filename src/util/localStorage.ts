export const getAccessToken = () => {
  return window.localStorage.getItem('access_token')
}

export const clearAccessToken = () => {
  window.localStorage.clear()
}