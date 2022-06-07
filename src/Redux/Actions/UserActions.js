
import * as actionTypes from "./ActionTypes";
import userService from "../../Service/user.service";

export const adduser = (name,broker_client_password,broker_client_twoFA,brokerId) => (dispatch) => {

    return userService.adduser(name,broker_client_password,broker_client_twoFA,brokerId).then((res) => {
      dispatch({
        type: actionTypes.ADD_USER,
        payload: res
      });
      return res;
    },
    (error) => {
      dispatch({
        type: actionTypes.ADD_USER_FAIL,
        error:error
      })
      return error
    }
    ).catch(error=>{
      return error
    })
  };
  
  export const getUsers = (brokerId) => (dispatch) => {
    return userService.getUsers(brokerId).then(res =>{
      dispatch({
        type:actionTypes.GET_ALL_USERS,
        payload:res
      });
      return res
    },
    (error) =>{
      dispatch({
        type:actionTypes.GET_ALL_USERS_FAILS,
        payload:error
      })
    }
    ).catch(error=>{
      return error
    })
  }
  export const getAllUsersLogin = (brokerId) => (dispatch) => {
    return userService.getAllUsersLogin(brokerId).then(res => {
      dispatch({
        type:actionTypes.GET_ALL_USERS_LOGIN,
        payload:res
      });
      return res
    },
    (error) => {
      dispatch({
        type: actionTypes.GET_ALL_USERS_LOGIN_FAILS,
        payload : error
      })
    }
    ).catch (error => {
      return error
    })
  }

  export const edit = (editname,editbroker_client_password,editbroker_client_twoFA,userId) => (dispatch)=>{
    console.log('user action', editbroker_client_password)
    return userService.editUser(editname,editbroker_client_password,editbroker_client_twoFA,userId).then(res => {
      dispatch({
        type : actionTypes.UPDATE_USER,
        payload : res
      });
      return res
    },
    (error) =>{
      dispatch({
        type : actionTypes.UPDATE_USER_FAILS,
        payload : error
      })
    }
    ).catch (error =>{
      return error
    })
  }

  export const deleteUser = (userId) => (dispatch) => {
    return userService.deleteUser(userId).then(res => {
      dispatch({
        type:actionTypes.DELETE_USER,
        payload:res
      });
      return res
    },
    (error) => {
      dispatch({
        type: actionTypes.DELETE_USER_FAILS,
        payload : error
      })
    }
    ).catch (error => {
      return error
    })
  }