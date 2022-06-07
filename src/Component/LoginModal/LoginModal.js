import { Input, message, Modal, Row } from "antd";
import React, { useState, useRef } from "react";
import {login} from '../../Redux/Actions/AuthActions';
import { useDispatch, useSelector } from "react-redux";
import { brokerLogin } from "../../Redux/Actions/BrokerActions";
import {Routes, Route, useNavigate} from 'react-router-dom';
import MainLayout from '../MainLayout/MainLayout'
import "./LoginModal.scss";

function LoginModal(props) {
  let navigate = useNavigate();

  const { visible, setvisible } = props;
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const form = useRef();
  const [mobile_number, setMobile] = useState();
  const [otp, setOTP] = useState();
  const [userData, setUserData] = useState();


  const onChangeMobile = (e) => {
    const mobile_number = e.target.value;
    setMobile(mobile_number);
  };
  const onChangeOtp = (e) => {
    const otp = e.target.value;
    setOTP(otp);
  };

  const handleLogin =(e) => {
    e.preventDefault();
    dispatch(login(mobile_number,otp)).then(res=>{
      let userData = res;
      console.log(userData,'usersssssssssss')
      setUserData(userData);
      localStorage.setItem('userName',res.data.user.name);
      localStorage.setItem('userId',res.data.user.id);
      navigate('/userpanel')
    })
  }


  const loading = useSelector(
    (state) => state?.BrokerLogin?.brokerLoginLoading
  );

  const onLoginBroker = async () => {
    if (!userId || !password) {
      message.error("Enter valid userID and password..");
      return;
    }
    const data = { uid: userId, pwd: password };
    dispatch(
      brokerLogin(data, () => {
        setvisible(false);
      })
    );
  };

  return (
    <div className="container">
        <div className="row">
          <div className="col-4"></div>
          <div className="col-4">
           <form onSubmit={handleLogin} ref={form}>
              <div className="form-group">
                <label>Mobile Number</label>
                <input type="text" className="form-control" value = {mobile_number} onChange={onChangeMobile} id="mobilenum" placeholder="Enter mobile number" />
              </div>
              <div className="form-group">
                <label>OTP</label>
                <input type="number" className="form-control" value = {otp} onChange = {onChangeOtp} id="otp" placeholder="Password" />
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
  );
}

export default LoginModal;
