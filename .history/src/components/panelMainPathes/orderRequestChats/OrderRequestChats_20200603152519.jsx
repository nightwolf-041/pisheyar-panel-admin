import React from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import axiosConfig from '../../../axiosConfigure/axiosConfig'
import PanelMainOrderRequestListhead from '../../panelMain/panelMainHeads/PanelMainOrderRequestListhead'
import PanelMain from '../../panelMain/PanelMain'


function OrderRequestChats() {

    React.useEffect(() => {
        
    }, [])

    return (

        <PanelMain header={<PanelMainOrderRequestListhead />}>
            {
                this.state.loading ?
                <div className="d-flex justify-content-center">
                <div className="spinner-border d-block mr-2" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
                <strong className="d-block">در حال بارگیری</strong>
                </div>
                
                : null
            }
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
        </PanelMain>
    )
}

const mapState = state => {
    return {
      token: state.authReducer.token,
      orderRequestGuid: state.pages.orderRequestGuid
    }
}
export default connect(mapState)(withRouter(OrderRequestChats))

