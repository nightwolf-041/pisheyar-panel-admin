import React from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import axiosConfig from '../../../axiosConfigure/axiosConfig'
import PanelMainOrderRequestListhead from '../../panelMain/panelMainHeads/PanelMainOrderRequestListhead'
import PanelMain from '../../panelMain/PanelMain'


function OrderRequestChats() {

    let [loading, setLoading] = React.useState(true)
    let [chatMessages, setChatMessages] = React.useState(null)

    React.useEffect(() => {
        axiosConfig.get(`/OrderRequest/GetChatMessages?orderRequestGuid=${this.props.orderRequestGuid}`).then(res => {
            console.log(res.data);
            setLoading(false)
        })
    }, [])

    return (

        <PanelMain header={<PanelMainOrderRequestListhead />}>
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

