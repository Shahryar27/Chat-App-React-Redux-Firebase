
import ActionTypes from '../constant/constant';
import history from '../../History';
// import createBrowserHistory from 'history/createBrowserHistory'
import firebase from 'firebase';
// import createBrowserHistory from 'history/createBrowserHistory';
// const history = createBrowserHistory()

// const hsitory = createBrowserHistory()




export function changeUserName() {
    return dispatch => {
        dispatch({ type: ActionTypes.USERNAME, payload: 'Ali' })
    }
}


export function signupAction(user) {

    return dispatch => {
        console.log('user', user);
        // history.push('/signin');

        firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then((createdUser) => {
                console.log('signed up successfully', createdUser.uid);
                delete user.password;
                user.uid = createdUser.uid;
                firebase.database().ref('users/' + createdUser.uid + '/').set(user)
                    .then(() => {
                        history.push('/chat');
                        // firebase.database().ref('users/').once('value')
                        //     .then((userData) => {
                        //         let allUsers = userData.val();
                        //         let currentUserUid = firebase.auth().currentUser.uid;
                        //         delete allUsers[currentUserUid];
                        //         let allUsersArr = [];
                        //         for (var key in allUsers) {
                        //             allUsersArr.push(allUsers[key]);
                        //         }
                        //         console.log(allUsersArr);
                        //         dispatch({ type: ActionTypes.ALLUSERS, payload: allUsers })
                        //         dispatch({ type: ActionTypes.CURRENTUSER, payload: currentUserUid })
                        //         firebase.database().ref('message/').once('value')
                        //             .then((messagesData) => {
                        //                 let messages = messagesData.val();
                        //                 console.log(messages);
                        //                 dispatch({ type: ActionTypes.MESSAGES, payload: messages })
                        //                 history.push('/chat');
                        //             })

                        //     })
                    })


            })



    }
}



export function signinAction(user) {
    return dispatch => {
        console.log('user in signin', user);
        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then((signedinUser) => {
                history.push('/chat');
                // firebase.database().ref('users/').once('value')
                //     .then((userData) => {

                //         let allUsers = userData.val();
                //         let currentUserUid = firebase.auth().currentUser.uid;
                //         console.log(allUsers)
                //         console.log(currentUserUid)
                //         delete allUsers[currentUserUid];
                //         console.log(allUsers)
                //         let allUsersArr = [];
                //         for (var key in allUsers) {
                //             allUsersArr.push(allUsers[key]);
                //         }
                //         console.log(allUsersArr);
                //         dispatch({ type: ActionTypes.ALLUSERS, payload: allUsersArr })
                //         dispatch({ type: ActionTypes.CURRENTUSER, payload: currentUserUid })
                //         firebase.database().ref('message/').once('value')
                //             .then((messagesData) => {
                //                 let messages = messagesData.val();
                //                 console.log(messages);

                //                 dispatch({ type: ActionTypes.MESSAGES, payload: messages })
                //                 history.push('/chat');
                //             })




                //     })
            })
    }
}
let messagesArr = [];
export function checkLogin() {
    return dispatch => {
        console.log('in check login')
        let db = firebase.database();
        firebase.auth().onAuthStateChanged(() => {
            let userId = null;
            let user = firebase.auth().currentUser;
            if (user !== null) userId = user.uid
            // console.log(userId);
            let that = this;
            if (userId !== null) {
                console.log('user is logged in')
                // firebase.database().ref('users/').once('value')
                //     .then((userData) => {
                //         let allUsers = userData.val();

                //         // let currentUserUid = firebase.auth().currentUser.uid;
                //         console.log(allUsers)
                //         console.log(userId)
                //         let currentUser = allUsers[userId]
                //         delete allUsers[userId];
                //         console.log(allUsers)
                //         let allUsersArr = [];
                //         for (var key in allUsers) {
                //             allUsersArr.push(allUsers[key]);
                //         }
                //         console.log(allUsersArr);
                //         dispatch({ type: ActionTypes.ALLUSERS, payload: allUsersArr })
                //         dispatch({ type: ActionTypes.CURRENTUSER, payload: currentUser })
                //         history.push('/chat');                   
                //     })
                // dispatch({ type: ActionTypes.LOGIN, payload: true })
                history.push('/chat');
            } else {
                console.log('no user is logged in');
                dispatch({ type: ActionTypes.LOGIN, payload: true })

            }
        })
    }
}
export function checkLoginAndFetchData() {
    return dispatch => {
        console.log('in check login')
        let db = firebase.database();
        firebase.auth().onAuthStateChanged(() => {
            let userId = null;
            let user = firebase.auth().currentUser;
            if (user !== null) userId = user.uid
            // console.log(userId);
            let that = this;
            if (userId !== null) {
                console.log('user is logged in')
                firebase.database().ref('users/').once('value')
                    .then((userData) => {
                        let allUsers = userData.val();

                        // let currentUserUid = firebase.auth().currentUser.uid;
                        console.log(allUsers)
                        console.log(userId)
                        let currentUser = allUsers[userId]
                        delete allUsers[userId];
                        console.log(allUsers)
                        let allUsersArr = [];
                        for (var key in allUsers) {
                            allUsersArr.push(allUsers[key]);
                        }
                        console.log(allUsersArr);
                        dispatch({ type: ActionTypes.LOGIN, payload: true })
                        dispatch({ type: ActionTypes.ALLUSERS, payload: allUsersArr })
                        dispatch({ type: ActionTypes.CURRENTUSER, payload: currentUser })
                        history.push('/chat');
                    })
                // dispatch({ type: ActionTypes.LOGIN, payload: true })
                // history.push('/chat');
            } else {
                console.log('no user is logged in');
                dispatch({ type: ActionTypes.LOGIN, payload: false })

            }
        })
    }
}

export function signOut() {
    return dispatch => {
        // dispatch({ type: ActionTypes.CHANGERECPUID, payload: recpUID })

        firebase.auth().signOut().then(function () {
            console.log("Logout")
            // localStorage.clear();
            // localStorage.setItem('activeUser', 'offline')
        }).catch(function (err) {
            console.log(err.message);
        })
        history.push('/')

    }
}



export function changeRecipientUID(recpUID, currentUID, receiverName) {
    return dispatch => {
        firebase.database().ref('message/').on("value", (messagesData) => {


            let allMessages = messagesData.val();
            console.log(allMessages);
            // dispatch({ type: ActionTypes.MESSAGES, payload: messages })
            // history.push('/chat');

            console.log(recpUID)

            console.log(currentUID)
            console.log(allMessages)

            console.log(receiverName)
            let receipentDetails = {
                recpUID, receiverName
            }
            let allMessagesArr = [];
            let msgs = []
            for (var key in allMessages) {
                allMessages[key].id = key;
                allMessagesArr.push(allMessages[key]);
            }
            console.log(allMessagesArr)

            for (var i = 0; i < allMessagesArr.length; i++) {
                // console.log(allMessagesArr[i])
                if ((allMessagesArr[i].senderID === currentUID && allMessagesArr[i].receiverID === recpUID) ||
                    allMessagesArr[i].senderID === recpUID && allMessagesArr[i].receiverID === currentUID
                ) {
                    msgs.push(allMessagesArr[i])
                }
            }
            console.log(msgs);
            dispatch({ type: ActionTypes.CHANGERECPUID, payload: receipentDetails })
            dispatch({ type: ActionTypes.SHOW_MESSAGES, payload: msgs })
        })
        // alllMessages = this.props.allMessages;

    }
}



export function sendMessage(message) {
    return dispatch => {
        firebase.database().ref('message/').push(message)
            .then(() => {
                console.log('message sent')
            })

    }
}

export function editMessage(msgId) {
    return dispatch => {
        // firebase.database().ref('message/').push(message)
        //     .then(() => {
        //         console.log('message sent')
        //     })

    }
}

export function deleteMessage(msgId) {
    return dispatch => {
        firebase.database().ref('message/' + msgId).remove();

    }
}
export function updateMessage(msg, msgId) {
    return dispatch => {
        firebase.database().ref('message/' + msgId + '/').set(
            msg
        )
        // firebase.database().ref('message/' + msgId).remove();

    }
}
export function seenUpdate(msgId) {
    return dispatch => {
        firebase.database().ref('message/' + msgId + '/').update({
            seen: true
        }
        )
        // firebase.database().ref('message/' + msgId).remove();

    }
}
export function createPortfolio(newPortfolio) {
    return dispatch => {
        console.log('new portfolio', newPortfolio);
        dispatch({
            type: ActionTypes.UPDATEPORTFOLIO,
            payload: newPortfolio
        })
    }
}