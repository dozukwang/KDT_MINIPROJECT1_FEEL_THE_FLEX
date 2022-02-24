//로그인
import {AUTH_BASE_URL, HEADERS} from '~/utils/apiInfo'
import axios from 'axios'

export default async function ({email,password}){
  const {data} = await axios({
    url: `${AUTH_BASE_URL}/login`,
    method: 'POST',
    headers: HEADERS,
    data:{
        email,
        password
      }
    
  })
  
  return data
}
// 리턴 데이터
// {"user": {"email": "","displayName": "","profileImg":},"accessToken": ""}

