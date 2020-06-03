import React from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import axiosConfig from '../../../axiosConfigure/axiosConfig'


function OrderRequestChats() {

    React.useEffect(() => {
        
    }, [])

    return (
        <div>
             {this.state.chatMessages !== null && this.state.chatMessages !== [] && this.state.orderRequestAcceptState === 1
            ? this.state.chatMessages.map((msg, index) => {
                if (msg.from === 'سرویس گیرنده') {
                return (
                    <ChatRightMessage
                    key={index}
                    message={msg.text}
                    date={msg.sentAt}
                    image={amooLogo}
                    />
                )
                } else {
                return (
                    <ChatLeftMessage
                    key={index}
                    message={msg.text}
                    date={msg.sentAt}
                    image={rubyLogo}
                    />
                )
                }
                return null
            })
            : null}
        </div>
    )
}

const mapState = state => {
    return {
      token: state.authReducer.token,
      orderRequestGuid: state.pages.orderRequestGuid
    }
}
export default connect(mapState)(withRouter(OrderRequestChats))

