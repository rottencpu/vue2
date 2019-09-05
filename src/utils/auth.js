import Cookies from 'js-cookie'

const TokenKey = 'x-auth-token'
const RandomKey = 'x-auth-random'

export function getToken () {
  return Cookies.get(TokenKey)
}

export function setToken (token) {
  return Cookies.set(TokenKey, token)
}

// 清空随机码和token
export function removeToken () {
  Cookies.remove(TokenKey)
  Cookies.remove(RandomKey)
}

export function getRandom () {
  let randomString = Cookies.get(RandomKey)
  if (randomString === '' || randomString === undefined) {
    randomString = createUniqueString()
    setRandom(randomString)
  }
  return randomString
}

export function setRandom (random) {
  return Cookies.set(RandomKey, random)
}

export function createUniqueString () {
  const timestamp = +new Date() + ''
  const randomNum = parseInt((1 + Math.random()) * 65536) + ''
  return (+(randomNum + timestamp)).toString(32)
}

/**
 * 需要设置时间 7 天
 */
