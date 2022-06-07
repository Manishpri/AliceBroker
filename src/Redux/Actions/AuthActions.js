import axios from "axios";
import { API_URL } from "../../config";
import * as actionTypes from "./ActionTypes";
import authService from "../../Service/auth.service";

export const sendOtp = async (data, onSuccess, onFail) => {
  axios
    .post(`${API_URL}/auth/otp`, { ...data })
    .then((res) => {
      if (res.data?.success) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch((e) => {
      onFail();
    });
};

export const login = (mobile_number,otp) => (dispatch) => {
  return authService.login(mobile_number,otp).then((res) => {
    dispatch({
      type: actionTypes.LOGIN_USER_INIT,
      payload: res
    });
    return res;
  },
  (error) => {
    dispatch({
      type: actionTypes.LOGIN_USER_FAIL,
      error:error
    })
    return Promise.reject();
  }
  )
};
export const sendContactUsMessag = (data, onSuccess, onFail) => {
  return async (dispatch) => {
    axios
      .post(`${API_URL}/sendMessage`, { ...data })
      .then((res) => {
        if (res.data?.success) {
          onSuccess();
        } else {
          onFail(res?.data?.error);
        }
      })
      .catch((e) => {
        onFail(e?.response?.data?.error);
      });
  };
};
