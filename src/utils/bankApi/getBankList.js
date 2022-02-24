// 선택 가능한 은행 목록 조회
import {BANK_BASE_URL, HEADERS} from '~/utils/apiInfo'
import axios from 'axios'

export default async function (){
  const token = sessionStorage.getItem('accessToken')

  const { data } = await axios({
    url: `${BANK_BASE_URL}/banks`,
    method: 'GET',
    headers: {
      ...HEADERS,
      authorization: `Bearer ${token}`
    }
  })
  // 리턴 데이터 - 선택 가능한 은행 목록
  // [ { name:,code:,digits:,disabled:},{}]
  return data
}
