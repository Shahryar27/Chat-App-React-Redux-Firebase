import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { sendMessage } from '../store/action/action'

class ChatBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            textAreaVal: '',
            time: 0,
            flag: true
        }

    }


    // componentDidMount() {
    //     setTimeout(this.setState({ flag: false }), 3000);

    // }
    _textAreaHandler(event) {
        this.setState({
            textAreaVal: event.target.value
        })
    }
    sendMessage() {
        console.log(this.state.textAreaVal);
        let messageData = {
            senderID: this.props.currentUser.uid,
            receiverID: this.props.receipentDetails.recpUID,
            senderName: this.props.currentUser.username,
            receiverName: this.props.receipentDetails.receiverName,
            message: this.state.textAreaVal,
            timestamp: new Date().getTime(),
            seen: false
        }
        console.log(messageData, 'messageDatamessageData');
        this.props.sendMessage(messageData);
        // setTimeout(this.setState({ flag: false }), 10000);
    }
    deleteMsg() {

    }
    render() {
        console.log(this.props.messages, 'aaaaaaaaaa')
        console.log(this.props.msgs, 'msgs')

        return (
            <div>
                <textarea value={this.state.textAreaVal} onChange={this._textAreaHandler.bind(this)}></textarea>
                <button onClick={this.sendMessage.bind(this)}>send</button>
                {this.props.msgs.map((msg, ind) => {
                    // console.log(new Date(msg.timestamp).toLocaleTimeString())
                    let time = new Date(msg.timestamp).toLocaleTimeString();
                    console.log(msg.senderID, this.props.currentUser.uid);
                    console.log((Date.now() - msg.timestamp) / 1000);
                    // this.setState({
                    //     time: Date.now() - msg.timestamp / 1000
                    // })


                    return (
                        msg.senderID === this.props.currentUser.uid ?
                            <div key={ind} style={{ border: '1px solid black' }}>
                                <h2 >Sender  name:{msg.senderName}</h2><br />
                                <span >message:{msg.message}</span>
                                <br />
                                <span >seen:'{JSON.stringify(msg.seen)}'</span>
                                <br />
                                <span >time:{time}</span>
                                {(((Date.now() - msg.timestamp) / 1000) < 60) ?
                                    <div> <button>EDIT</button>
                                        <button onClick={this.deleteMsg.bind(this, )}>DELETE</button>
                                    </div> : null
                                }
                            </div> :

                            <div key={ind}>
                                <h2 >Sender  name:{msg.senderName}</h2><br />
                                <span >message:{msg.message}</span>
                                <br />
                                <span >time:{time}</span>
                            </div>
                    )
                })}


            </div>
        )
    }
}

function mapStateToProp(state) {
    return ({
        currentUser: state.root.currentUser,
        receipentDetails: state.root.receipentDetails,
        messages: state.root.messages,
        msgs: state.root.msgs
    })
}

function mapDispatchToProp(dispatch) {
    return ({
        // changeUserName: ()=>{dispatch(changeUserName())}
        sendMessage: (msg) => {
            dispatch(sendMessage(msg));
        }
    })
}
export default connect(mapStateToProp, mapDispatchToProp)(ChatBox);
