import apiUtils from './apiUtils'

export const Register = params => {
  return apiUtils.commonPost('', params)
}

export const GetSendMsg = params => {
  return apiUtils.commonPost('',params)
}