// 인증 확인
import {AUTH_BASE_URL, HEADERS} from '~/utils/apiInfo'
import axios from 'axios'

export default async function (){
  const token = sessionStorage.getItem('accessToken')

  const { data } = await axios({
    url: `${AUTH_BASE_URL}/me`,
    method: 'POST',
    headers: {
      ...HEADERS,
      authorization: `Bearer ${token}`
    }
  })
  // 리턴 데이터 - 로그인한 사용자 정보
  // { email:,displayName:,profileImg:""}
  return data
}
