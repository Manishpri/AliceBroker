import React from "react";
import "./Success.scss";
import Errormodal from "../../Assets/Images/Errormodal.png";
function Error() {
  return (
    <div className="pop-up-modal-main">
      <img className="successmodal" src={Errormodal} alt="" />
      <div className="success-head">Error</div>
      <div className="success-paragraph">
        There was an error placing your order.
      </div>
    </div>
  );
}

export default Error;
