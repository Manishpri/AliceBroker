import React,{useState} from 'react'
import { Modal, Button } from 'antd';
const AddNewUser = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
      setIsModalVisible(true);
    };
  
    const handleOk = () => {
      setIsModalVisible(false);
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
    };
  return (
    <div>
             <Button type="primary" onClick={showModal}>
       ADD NEW USER
      </Button>
      <Modal title="ADD NEW USER" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </div>
  )
}

export default AddNewUser