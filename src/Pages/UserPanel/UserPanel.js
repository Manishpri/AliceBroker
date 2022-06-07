import {
  Input,
  Pagination,
  Select,
  Switch,
  Table,
  
  Modal,
  Button,
  
} from "antd";
//import ImageButton from "react-image-button";
//import { Action } from "history";
import React, {  useState,useRef,useEffect } from "react";
//import { HiChatAlt, HiSearch } from "react-icons/hi";
//import { useDispatch, useSelector } from "react-redux";
import active from "../../Assets/Images/active.svg";
import action_1 from "../../Assets/Images/action_1.svg";
import action_2 from "../../Assets/Images/action_2.svg";
import { adduser,getUsers,getAllUsersLogin,edit, deleteUser } from "../../Redux/Actions/UserActions";
import { useDispatch, useSelector } from "react-redux";
import {Routes, Route, useNavigate} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import fontawesome from '@fortawesome/fontawesome'
// import { faCheckSquare, faCoffee } from '@fortawesome/fontawesome-free-solid'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./UserPanel.scss";

const { Option } = Select;

function UserPanel(props) {

  let navigate = useNavigate();
  //const [ordersData, setOrdersData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
 // const [search, setSearch] = useState("");
 const dispatch = useDispatch();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };



  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const [name, setName] = useState();
  const [broker_client_password, setbroker_client_password] = useState();
  const [broker_client_twoFA, setbroker_client_twoFA] = useState();
  const [brokerId, setbrokerId] = useState();
  const [allUsers, setAllUsers] = useState([]);
  const initUser = {id: null, name: '', broker_client_password: '', broker_client_twoFA:''};
  const [user, setUser] = useState(initUser);

 let userName = localStorage.getItem('userName');
 var userId = localStorage.getItem('userId')
 const form = useRef();

 
 const onChangeuser = (e) => {
   console.log(e)
   const  name = e.target.name;
  const  value = e.target.value;
  setUser({...user, [name]: value});
}

const edituser = e => {
  dispatch(edit(user.name,user.broker_client_password,user.broker_client_twoFA,user.id)).then(res=>{
      console.log(res);
      getAllUSers(userId)
    })
 
}
  const onChangeName = (e) => {
    console.log(e)
    const name = e.target.value;
    setName(name);
  };
  const onChangePassword = (e) => {
    const broker_client_password = e.target.value;
    setbroker_client_password(broker_client_password);
  };
  const onChangeTwofa = (e) => {
    const broker_client_twoFA = e.target.value;
    setbroker_client_twoFA(broker_client_twoFA);
  };
  const onChangeId = (e) => {
    const brokerId = e.target.value;
    setbrokerId(brokerId);
  };

 
  const handleOk = () => {
    setIsModalVisible(false);
    let brokerId = userId;
    dispatch(adduser(name,broker_client_password,broker_client_twoFA,brokerId)).then(res=>{
      console.log(brokerId,'current');
    })
  };

  const getAllUSers = (userId) =>{
    dispatch(getUsers(userId)).then(res => {
      const users = res.data.users;
      setAllUsers(users);
    })
  }
  
  useEffect(() => {
    getAllUSers(userId);
  },[]);

  const allLogin = () => {
  var userId = localStorage.getItem('userId')

  console.log(userId,'login');
  document.getElementsByClassName('allLogin')[0].classList.add('allLogin_hide');;
  document.getElementsByClassName('allLogin_hide')[0].classList.remove('allLogin');
  document.getElementsByClassName('allLogout')[0].classList.add('allLogout_show');
  document.getElementsByClassName('allLogout_show')[0].classList.remove('allLogout');
  const toggleHtml = document.getElementsByClassName('Switch-button-login');
  console.log(toggleHtml)
  for (var i=0; i<toggleHtml.length; i++) {
    const button = toggleHtml[i].firstChild;
    console.log(button)
    button.classList.add('ant-switch-checked') 
  }

  
  dispatch(getAllUsersLogin(userId)).then(res => {
    console.log(JSON.stringify(res))
  })
}
const allLogout = () => {
  console.log('logout')
  document.getElementsByClassName('allLogin_hide')[0].classList.add('allLogin');;
  document.getElementsByClassName('allLogin')[0].classList.remove('allLogin_hide');
  document.getElementsByClassName('allLogout_show')[0].classList.add('allLogout');
  document.getElementsByClassName('allLogout')[0].classList.remove('allLogout_show');
  const toggleHtml = document.getElementsByClassName('Switch-button-login');
  for (var i=0; i<toggleHtml.length; i++) {
    const button = toggleHtml[i].firstChild;
    button.classList.remove('ant-switch-checked')
  }
}

const  editUser =(id) =>{
  allUsers.map((user) =>{

    if (user.id == id) {
      console.log(user,'usersssss')
      setUser(user);
    }
  }
  );
}

const deleteuser = (id) => {
  console.log('detete user');
  dispatch(deleteUser(userId)).then(res => {
    console.log(res)
  })

}


 

  return (
    <>
      <div className="user-panel-main-wrap">
        <div className="table-top-panel-section">
          <div className="left-section">
            <span className="title"></span>
          </div>
          <div className="right-section">
            {/* <div className="get-all-login">Get all login </div>
            <div className="Switch-button">
              <Switch />
            </div> */}
            <button type="button" class="btn btn-outline-success allLogin" onClick={allLogin}>All Users Login</button>
            <button type="button" class="btn btn-outline-danger allLogout" onClick={allLogout}>All Users Logout</button>
            <button className="btn btn-outline-primary m-3" onClick={showModal}>
              ADD NEW USERS
            </button>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-12">
            <div className="table-wrap">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">USER ON/OFF</th>
                    <th scope="col">LOGIN</th>
                    <th scope="col">CLIENT CODE</th>
                    <th scope="col">PLAN END DATE</th>
                    <th scope="col">P&L</th>
                    <th scope="col">TOTAL BUY</th>
                    <th scope="col">TOTAL SELL</th>
                    <th scope="col">PAYMENT STATUS</th>
                    <th scope="col">PLAN STATUS</th>
                    <th scope="col">ACTION</th>

                  </tr>
                </thead>
                <tbody>
                {allUsers.map((user, index) => (  
                  <tr data-index={index}>  
                    <td key="{index}">{index+1}</td>
                    <td key="{user.name}">{user.name}</td>  
                    <td>
                    <div className="Switch-button">
                    <Switch />
                    </div>
                    </td>
                    <td>                
                    <div className="Switch-button Switch-button-login">
                    <Switch />
                    </div>
                    </td>  
                    <td key="{user.broker_client_id}">{user.broker_client_id}</td>  
                    <td key="{user.plan_end_date}">{user.plan_end_date}</td>  
                    <td>{'p&L'}</td>  
                    <td>{'total Buy'}</td>  
                    <td>{'tota sell'}</td>  
                    <td>
                    {(() => {
                      if (user.plan_status ==1 || user.plan_status ==4) {
                        return (
                          <div>{'Paid'}</div>
                        )
                      } else{
                        return (
                          <div>{'Unpaid'}</div>
                        )
                      } 
                    })()}
                    </td>    
                    <td>
                    {(() => {
                      if (user.plan_status ==1 || user.plan_status ==4) {
                        return (
                          <div>{'Active'}</div>
                        )
                      } else{
                        return (
                          <div>{'Inactive'}</div>
                        )
                      } 
                    })()}
                    </td>  
                    <td>
                    <FontAwesomeIcon data-bs-toggle="tooltip" data-bs-placement="top" title="Edit" style = {{color:'rgb(228, 155, 15)'}} icon={faEdit} data-toggle="modal" data-target="#updateUser" onClick={() => editUser(user.id)}/>  
                    <span> &nbsp;</span>
                    <FontAwesomeIcon style = {{color:'red'}} icon={faTrash} data-bs-toggle="tooltip" data-bs-placement="top" title="Delete" onClick={() => deleteuser(user.id)}/>

                    </td>
                  </tr>  
                ))}  
                </tbody>
              </table>
              </div>
            </div>
          </div>
        </div>

       </div>
       <Modal
         title="ADD NEW USER"
         className="modal-add"
         visible={isModalVisible}
         okText="Save"
         cancelText="Close"
         onOk={handleOk}
         onCancel={handleCancel}
       >
        <form ref={form}>
              <div className="add-user-form">
                <div className="form-group">
                <label>Enter Name</label>
                <input type="text" value={name} onChange={onChangeName} className="form-control"  placeholder="Enter Name number" />
                </div>
                  <div className="box-2-3 form-control">
                    <div className="client">
                      <p>Client ID</p>
                      <Input value = {userId} onChange = {onChangeId} style={{ width: "302px" }} placeholder="Client ID"/>
                    </div>
                    <div className="password-add">
                      <p style={{ width: "302px" }}>Password</p>
                      <Input.Password value={broker_client_password} onChange={onChangePassword} placeholder="****"/> 
                    </div>
                  </div>
                  <div className="box-2-3 form-control">
                    <div className="client">
                      <p>Two Factor Authentication</p>
                      <Input type='text' value ={broker_client_twoFA} onChange={onChangeTwofa} style={{ width: "302px" }} placeholder="Security Answer"/>
                    </div>
                    <div className="password-add">
                      <p  style={{ width: "302px" }}>Dealer Name</p>
                      <Input value = {userName} disabled></Input>
                  </div>
                </div>
              </div>
          </form>
       </Modal>
       {/* Edit Users Modal start */}
        <div class="modal fade" id="updateUser" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                 <form ref={form}>
                    <div className="add-user-form">
                      <div className="form-group">
                      <label>Enter Name</label>
                      
                      <input type="text" name="name"  defaultValue={user.name} onChange={onChangeuser} className="form-control"  placeholder="Enter Name number" />
                      </div>
                        <div className="box-2-3 form-control">
                          <div className="client">
                            <p>Client ID</p>
                            <Input value = {user.broker_client_id}   placeholder="Client ID" disabled/>
                          </div>
                          <div className="password-add">
                            <p>Password</p>
                            <Input type="password" name="broker_client_password" value={user.broker_client_password} onChange={onChangeuser} placeholder="****"/> 
                          </div>
                        </div>
                        <div className="box-2-3 form-control">
                          <div className="client">
                            <p>TwoFA</p>
                            <Input name="broker_client_twoFA" value = {user.broker_client_twoFA} onChange={onChangeuser}  placeholder="Client ID" />
                          </div>
                          <div className="password-add">
                            <p>Dealer Name</p>
                            <Input defaultValue={userName}  placeholder="Dealer Name" disabled/> 
                          </div>
                        </div>
                    </div>
                  </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={() => edituser(user.id)}>Update</button>
              </div>
            </div>
          </div>
        </div>
       {/* Edit users Modal End */}

    </>
  );
}

export default UserPanel;
