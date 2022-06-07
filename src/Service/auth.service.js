import axios from 'axios';
import {API_URL}  from '../config';

const login = (mobile_number,otp) =>{
    return axios.post(API_URL+'auth/login',{
        mobile_number,
        otp
    }).then(res =>{
        if(res.data.success = true) {
            return res
        }
        else {
            return res
        }          
    }).catch((error) => {
        return error
    })
}

export default ({
    login
})

