import axios from 'axios';
import {API_URL}  from '../config';

const adduser = (name,broker_client_password,broker_client_twoFA,brokerId,broker_client_id=12345) => {
    return axios.post(API_URL+'customer/add_user',{
        name,
        broker_client_password,
        broker_client_twoFA,
        brokerId,
        broker_client_id
    }).then (res => {
        return res
    }).catch(error => {
        return error
    })
}
const getUsers = (brokerId) => {
    return axios.post(API_URL+'customer/users', {
        brokerId : brokerId
    }).then(res=>{
        return res
    }).catch(error=>{
        return error
    })
}

const getAllUsersLogin = (brokerId) => {
    console.log(brokerId,'kkkkkk')
    return axios.post(API_URL+'customer/all_user_login', {
        brokerId : brokerId
    }).then(res => {
        return res
    }).catch(error => {
        return error
    })
}

const editUser = (name,password,twoFA,userId) => {
    console.log('servce', userId)
    return axios.post(API_URL+'customer/edit_user',{
        name,
        password,
        twoFA,
        userId
    }).then(res => {
        return res
    }).catch(error=>{
        return error
    })
}

const deleteUser = (userId) => {
    console.log('servce', userId)
    return axios.post(API_URL+'customer/deleteUser',{
        userId
    }).then(res => {
        return res
    }).catch(error=>{
        return error
    })
}

export default ({
    adduser,
    getUsers,
    getAllUsersLogin,
    editUser,
    deleteUser
})