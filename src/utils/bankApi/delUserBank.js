// 등록된 계좌 해지
import {BANK_BASE_URL, HEADERS} from '~/utils/apiInfo'
import axios from 'axios'

export default async function (values){
  const token = sessionStorage.getItem('accessToken')

  const { data } = await axios({
    url: BANK_BASE_URL,
    method: 'DELETE',
    headers: {
      ...HEADERS,
      authorization: `Bearer ${token}`
    },
    data:values
  })
  // 리턴 데이터 - 계좌 해지 여부
  // t/f
  return data
}
