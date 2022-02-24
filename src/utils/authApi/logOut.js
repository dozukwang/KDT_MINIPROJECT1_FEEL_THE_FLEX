//로그아웃
import {AUTH_BASE_URL, HEADERS} from '~/utils/apiInfo'
import axios from 'axios'

export default async function (){
  const token = sessionStorage.getItem('accessToken')

  const { data } = await axios({
    url: `${AUTH_BASE_URL}/logout`,
    method: 'POST',
    headers: {
      ...HEADERS,
      authorization: `Bearer ${token}`
    } 
  })  
  return data
}
// 리턴 데이터
// : 로그아웃 여부
