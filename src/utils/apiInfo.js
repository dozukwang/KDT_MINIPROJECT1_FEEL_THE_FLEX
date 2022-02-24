export const AUTH_BASE_URL='https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth'
export const BANK_BASE_URL='https://asia-northeast3-heropy-api.cloudfunctions.net/api/account'
export const HEADERS={
  'content-type': 'application/json',
  'apikey': process.env.API_KEY,
  'username': process.env.USERNAME
}
