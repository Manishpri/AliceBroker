import React from "react";
import "./Success.scss";
import Successmodal from "../../Assets/Images/Successmodal.png";
function Success() {
  return (
    <div className="pop-up-modal-main">
      <img className="successmodal" src={Successmodal} alt="" />
      <div className="success-head">Success</div>
      <div className="success-paragraph">
        Your order has been placed successfully
      </div>
    </div>
  );
}

export default Success;
