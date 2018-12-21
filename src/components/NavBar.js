import React, { Component } from 'react'
import * as firebase from 'firebase'
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import { List, ListItem } from 'material-ui/List';
import FlatButton from 'material-ui/FlatButton';
// import '../App.css';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
// import FeedBacks from './feedBack.js'
// import BookParking from './bookParking.js'
// import ViewSlots from './viewSlots.js'
// import AddSlots from './addSlots.js'
// import FeedBack from './feedBack.js'
// import ViewBooking from './viewBooking.js'
// import MyParking from './myParking.js'
// import Login from './login.js'
// import App from '../App.js'
import * as mat from 'material-ui'
import Divider from 'material-ui/Divider';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Toggle from 'material-ui/Toggle/Toggle';
let style = {
    button: {
        color: '#fafbfc'
    },
    appBar: {
        backgroundColor: 'rgb(0, 188, 212)',
        color: '#fafbfc',

    },
    list: {
        // backgroundColor: 'rgb(0, 188, 212)',
        color: 'rgb(0, 188, 212)',
        textDecoration: 'none'
    }
}

class Navbar extends Component {
    constructor() {
        super()
        this.state = {
            drawerOpened: false,
            type: null,
            // active: null,
            active: false,
            btn: false

        }

    }

    toggleDrawer() {
        // console.log('toggle')
        // alert()
        this.setState({
            drawerOpened: !this.state.drawerOpened
        })
    }
    close() {
        this.setState({
            drawerOpened: !this.state.drawerOpened
        })
    }
    signOut() {
        this.props.history.push('/')
        firebase.auth().signOut().then(function () {
            alert("Logout")
            // localStorage.clear();
            // localStorage.setItem('activeUser', 'offline')
        }).catch(function (err) {
            console.log(err.message);
        })
        this.setState({
            active: false,
            btn: false
        })
        // this.setState({active: null})
    }

    componentDidMount() {
        // alert();
        let db = firebase.database();
        firebase.auth().onAuthStateChanged(() => {
            let userId = null;
            let user = firebase.auth().currentUser;
            if (user !== null) userId = user.uid
            let that = this;
            if (userId !== null) {
                db.ref('/users/' + userId).once('value', function (snapshot) {
                    that.setState({
                        type: snapshot.val().type,
                        active: true,
                        btn: true
                    })
                });
            }
        })
    }



    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <AppBar title="One to One Chat App" showMenuIconButton={this.state.btn}
                        iconElementRight={
                            <span>
                                {this.state.active ?
                                    <FlatButton label="SignOut" default={true} style={style.button} onClick={this.signOut.bind(this)} />
                                    :
                                    <Link to="/signup"> <FlatButton label="Register" style={style.button} default={true} /></Link>
                                }    </span>
                        }
                    />
                </MuiThemeProvider>
            </div>
        )
    }
}
export default Navbar