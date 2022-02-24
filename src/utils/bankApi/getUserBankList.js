// 사용자 계좌 목록 및 잔액 조회
import {BANK_BASE_URL, HEADERS} from '~/utils/apiInfo'
import axios from 'axios'

export default async function (){
  const token = sessionStorage.getItem('accessToken')

  const { data } = await axios({
    url: BANK_BASE_URL,
    method: 'GET',
    headers: {
      ...HEADERS,
      authorization: `Bearer ${token}`
    }
  })
  // 리턴 데이터 - 연결된 계좌 정보
  // {totalBalance:,accounts:{id,bankName}}
  return data
}
