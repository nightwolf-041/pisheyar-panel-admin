import React from 'react'
import './orderRequestChats.css'

const OrderRequestChatRightMessage = (props) => {
    return (
        <div className="chatbox-main-content-sended-right">
            <div className="chatbox-main-content-sended-right-desc">
                <p className="chatbox-main-content-sended-right-desc-text">
                    {props.message}
                </p>
                <span className="chatbox-main-content-sended-right-desc-date">
                    {props.date}
                </span>
            </div>
            <div className="chatbox-main-content-sended-right-profbox">
                <img src={props.image} alt="" className="chatbox-main-content-sended-right-profile" />
            </div>
        </div>
    )
}

export default OrderRequestChatRightMessage