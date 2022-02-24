// 정보수정
import {AUTH_BASE_URL, HEADERS} from '~/utils/apiInfo'
import axios from 'axios'

export default async function (changeValue){
  const token = sessionStorage.getItem('accessToken')
  
  const { data } = await axios({
    url: `${AUTH_BASE_URL}/user`,
    method: 'PUT',
    headers: {
      ...HEADERS,
      authorization: `Bearer ${token}`
    },
    data:{
      ...changeValue
      }
    
  })
  
  return data
}
// 리턴 데이터
// 수정된 사용자 정보
