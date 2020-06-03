import React from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import axiosConfig from '../../../axiosConfigure/axiosConfig'
import PanelMainOrderRequestChatshead from '../../panelMain/panelMainHeads/PanelMainOrderRequestChatshead'
import PanelMain from '../../panelMain/PanelMain'
import OrderRequestChatRightMessage from './OrderRequestChatRightMessage'
import OrderRequestChatLeftMessage from './OrderRequestChatLeftMessage'


function OrderRequestChats(props) {

    let [loading, setLoading] = React.useState(true)
    let [chatMessages, setChatMessages] = React.useState(null)

    React.useEffect(() => {
        axiosConfig.get(`/OrderRequest/GetChatMessages?orderRequestGuid=${props.orderRequestGuid}`, {
            headers: { Authorization: "Bearer " + props.token }
        }
        ).then(res => {
            console.log(res.data.chatMessages);
            setLoading(false)
            setChatMessages(res.data.chatMessages)
        })
    }, [])

    return (

        <PanelMain header={<PanelMainOrderRequestChatshead />}>
            {
                loading ?
                <div className="d-flex justify-content-center">
                <div className="spinner-border d-block mr-2" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
                <strong className="d-block">در حال بارگیری</strong>
                </div>
                
                : null
            }
            <div>
                {chatMessages !== null && chatMessages !== [] ?
                 chatMessages.map((msg, index) => {
                    if (msg.from === 'سرویس گیرنده') {
                    return (
                        <OrderRequestChatRightMessage
                        key={index}
                        message={msg.text}
                        date={msg.sentAt}
                        // image={amooLogo}
                        />
                    )
                    } else {
                    return (
                        <OrderRequestChatLeftMessage
                        key={index}
                        message={msg.text}
                        date={msg.sentAt}
                        // image={rubyLogo}
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

