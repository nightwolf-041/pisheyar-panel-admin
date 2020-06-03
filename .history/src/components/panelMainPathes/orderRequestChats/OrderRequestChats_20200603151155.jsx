import React from 'react'

function OrderRequestChats() {
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

export default OrderRequestChats
