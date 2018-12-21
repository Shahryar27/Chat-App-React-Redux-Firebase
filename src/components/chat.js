import React, { Component } from 'react';
import { changeRecipientUID, checkLoginAndFetchData, checkLogin, signOut, sendMessage, editMessage, deleteMessage, updateMessage, seenUpdate } from '../store/action/action'
import { connect } from 'react-redux';
import ChatBox from './chatbox';
import CircularProgress from 'material-ui/CircularProgress';

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            textAreaVal: '',
            time: 0,
            flag: true,
            editState: false,
            editKey: ''
        }
        this.seenUpdate = this.seenUpdate.bind(this);
    }
    componentWillMount() {
        this.props.checkLoginAndFetchData()
        // if (this.props.login) {
        //     this.props.fetchData()
        // }
    }
    signOut() {
        this.props.signOut();
    }
    setRecipient(recUid, currentUID, receiverName) {
        // console.log(recUid)
        // console.log(currentUID)
        // console.log(receiverName)
        // console.log('recipient', recUid);
        this.props.changeRecUID(recUid, currentUID, receiverName);
    }
    _textAreaHandler(event) {
        this.setState({
            textAreaVal: event.target.value
        })
    }
    sendMessage() {
        if (this.state.textAreaVal === '') {
            alert('please write something')
        } else {
            this.refs.msg.value = ''
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
            // console.log(messageData, 'messageDatamessageData');
            this.props.sendMessage(messageData);
            this.setState({
                textAreaVal: ''
            })

        }
    }
    deleteMsg(msgId, time) {
        console.log(msgId)
        if (((Date.now() - time) / 1000) > 60) {
            alert("Cant delete msg after 1 min ")
        }
        else {
            this.props.deleteMessage(msgId)
        }

    }
    editMsg(msgId, ind, time) {
        console.log(msgId)
        console.log(this.props.msgs[ind].message)
        if (((Date.now() - time) / 1000) > 60) {
            alert("Cant edit msg after 1 min ")
        }
        else {
            this.refs.msg.value = this.props.msgs[ind].message
            this.setState({
                editState: true,
                editKey: msgId
            })
            this.props.editMessage(msgId)

        }
    }
    // openEdit() {
    //     this.setState({
    //         editState: true
    //     })
    // }
    closeEdit() {
        this.refs.msg.value = ''
        this.setState({
            editState: false
        })
    }
    updateMessage() {
        if (this.state.textAreaVal === '') {
            alert('please write something')
        } else {
            this.refs.msg.value = ''
            let messageData = {
                senderID: this.props.currentUser.uid,
                receiverID: this.props.receipentDetails.recpUID,
                senderName: this.props.currentUser.username,
                receiverName: this.props.receipentDetails.receiverName,
                message: this.state.textAreaVal,
                timestamp: new Date().getTime(),
                seen: false
            }
            this.props.updateMessage(messageData, this.state.editKey);

            this.setState({
                editState: false
            })

        }

    }
    seenUpdate(msgId) {
        console.log('seen update')
        this.props.seenUpdate(msgId)
    }
    render() {
        // console.log(this.props.currentUser, 'CURRENT USER');
        // console.log(this.props.allUsers, 'allUsers');
        // console.log(this.props.allMessages, 'allMessages');
        console.log(this.state.editState)
        return (
            <div>
                {this.props.login === false ? <CircularProgress size={150} thickness={10} /> :
                    < div > <h1>Hello Chat {this.props.currentUser.username}</h1> <button onClick={this.signOut.bind(this)}>SIGNOUT</button>
                        <h1><u>All Users</u></h1>
                        {

                            this.props.allUsers.map((user, index) => {
                                return (<div key={index} >
                                    <span style={{ cursor: 'pointer' }} onClick={this.setRecipient.bind(this, user.uid, this.props.currentUser.uid, user.username)}><b>{user.username}</b></span> <br />
                                </div>)
                            })
                        }

                        <hr />
                        <div>

                            {this.props.msgs.map((msg, ind) => {
                                // console.log(new Date(msg.timestamp).toLocaleTimeString())
                                let time = new Date(msg.timestamp).toLocaleTimeString();
                                console.log(msg.receiverID, this.props.currentUser.uid);
                                // console.log((Date.now() - msg.timestamp) / 1000);
                                // this.setState({
                                //     time: Date.now() - msg.timestamp / 1000
                                // })
                                if (msg.receiverID === this.props.currentUser.uid) {
                                    this.seenUpdate(msg.id, ind)
                                    // console.log('seen update')


                                }

                                return (
                                    // msg.receiverID === this.props.currentUser.uid ? this.seenUpdate().bind(this) : null
                                    msg.senderID === this.props.currentUser.uid ?
                                        <div key={ind} style={{ border: '1px solid black' }}>
                                            <h2 >Sender  name:{msg.senderName}</h2><br />
                                            <span >message:{msg.message}</span>
                                            <br />
                                            <span >seen:'{JSON.stringify(msg.seen)}'</span>
                                            <br />
                                            <span >time:{time}</span>
                                            {(((Date.now() - msg.timestamp) / 1000) < 60) ?
                                                <div> <button onClick={this.editMsg.bind(this, msg.id, ind, msg.timestamp)}>EDIT</button>
                                                    <button onClick={this.deleteMsg.bind(this, msg.id, msg.timestamp)}>DELETE</button>
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
                        <input type="text" placeholder="Enter message" ref="msg" onChange={this._textAreaHandler.bind(this)}></input>
                        {this.state.editState ?
                            <div>
                                <button onClick={this.updateMessage.bind(this)}>UPDATE</button>
                                <button onClick={this.closeEdit.bind(this)}>CANCEL</button>

                            </div>
                            :
                            <button onClick={this.sendMessage.bind(this)}>send</button>
                        }
                    </div>
                }
            </div>
        )
    }
}

function mapStateToProp(state) {
    return ({
        currentUser: state.root.currentUser,
        receipentDetails: state.root.receipentDetails,
        allUsers: state.root.users,
        allMessages: state.root.messages,
        recipientID: state.root.recipientID,
        msgs: state.root.msgs,
        login: state.root.login

    })
}
function mapDispatchToProp(dispatch) {
    return ({
        // changeUserName: ()=>{dispatch(changeUserName())}
        changeRecUID: (recID, currentUID, receiverName) => {
            dispatch(changeRecipientUID(recID, currentUID, receiverName));
        },
        checkLogin: () => {
            dispatch(checkLogin())
        },
        signOut: () => {
            dispatch(signOut())
        },
        sendMessage: (msg) => {
            dispatch(sendMessage(msg));
        },
        deleteMessage: (msgId) => {
            dispatch(deleteMessage(msgId));
        },
        editMessage: (msgId) => {
            dispatch(editMessage(msgId));
        }, updateMessage: (msg, msgId) => {
            dispatch(updateMessage(msg, msgId));
        }
        , seenUpdate: (msgId) => {
            dispatch(seenUpdate(msgId));
        },
        checkLoginAndFetchData: () => {
            dispatch(checkLoginAndFetchData());
        },
    })
}
export default connect(mapStateToProp, mapDispatchToProp)(Chat);