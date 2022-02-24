// 회원가입 
import {AUTH_BASE_URL, HEADERS} from '~/utils/apiInfo'
import axios from 'axios'

export default async function ({email,password,displayName}){
  //! 사용자 프로필도 처리 필요 
  const { data } = await axios({
    url: `${AUTH_BASE_URL}/signup`,
    method: 'POST',
    headers: HEADERS,
    data:{email,password,displayName}
  })
  return data
}
// 리턴 데이터 - data. 에 들어있음 (data.user.email / data.accessToken)
// {"user": {"email": "","displayName": "","profileImg":},"accessToken": ""}
