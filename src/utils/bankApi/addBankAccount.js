// 계좌 연결
import {BANK_BASE_URL, HEADERS} from '~/utils/apiInfo'
import axios from 'axios'

export default async function (values){
  const token = sessionStorage.getItem('accessToken')

  const { data } = await axios({
    url: BANK_BASE_URL,
    method: 'POST',
    headers: {
      ...HEADERS,
      authorization: `Bearer ${token}`
    },
    data:values
  })
  // 리턴 데이터 - 연결된 계좌 정보
  // { id,bankName:,bankCode:,accountNumber:,balance:},{}
  return data
}
