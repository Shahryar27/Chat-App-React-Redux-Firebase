import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { signinAction, checkLogin } from '../store/action/action';

import history from '../History'
import firebase from 'firebase';
import CircularProgress from 'material-ui/CircularProgress';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import PasswordField from 'material-ui-password-field';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
const style = {
    width: 400,
    margin: 20,
    textAlign: 'left',
    paddingLeft: 60,
    paddingTop: 10,
    display: 'inline-block',
}

class Signin extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            error: '',
            loader: true,
            open: false,
            errorEmail: '',
            errorPassword: '',
        }


        this.signin = this.signin.bind(this);
        // this._onChangeEmail = this._onChangeEmail.bind(this);
        // this._onChangePassword = this._onChangePassword.bind(this);

    }
    componentWillMount() {
        this.props.checkLogin()
    }

    handleDialog = () => {
        console.log('open')
        this.setState({ open: !this.state.open });
    };

    signin() {
        if (this.state.email === '' && this.state.password === '') this.setState({ open: true, error: "All fields are required" });
        else {
            this.setState({ errorEmail: "", errorPassword: "" });
            let user = {
                email: this.state.email,
                password: this.state.password
            }
            this.setState({
                email: '',
                password: ''
            })
            this.props.signinWithEmailPassword(user);
        }
    }
    // _onChangeEmail(event) {
    //     this.setState({
    //         email: event.target.value
    //     })
    // }
    // _onChangePassword(event) {
    //     this.setState({
    //         password: event.target.value
    //     })
    // }
    handleForm(labelState, error, ev) {
        // console.log(ev.target.value)
        let stmt = '';
        if (ev.target.value === '') stmt = 'This field is required';
        this.setState({
            [labelState]: ev.target.value,
            [error]: stmt
        })
    }

    render() {
        const actions = [
            <FlatButton
                label="OK"
                primary={true}
                onClick={this.handleDialog.bind(this)}
            />,
            // <FlatButton
            //   label="Submit"
            //   primary={true}
            //   keyboardFocused={true}
            //   onClick={this.handleClose}
            // />,
        ];
        return (
            // <div>
            //     <h1>Hello World Signin</h1>
            //     <label>Email:<input type='text' name='email' value={this.state.email} onChange={this._onChangeEmail} /></label>
            //     <br />
            //     <label>Password:<input type='password' name='password' value={this.state.password} onChange={this._onChangePassword} /></label>
            //     <button onClick={this.signin}>Signin</button><br />
            //     <br /><Link to="/signup" >SIGN UP</Link>

            // </div>
            <div>
                <Dialog
                    title="ERROR"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleDialog}
                >{this.state.error}
                </Dialog>
                {this.props.login === false ? <CircularProgress size={150} thickness={10} /> :
                    <div style={{ width: 600, margin: 'auto' }}>
                        <Paper style={style} zDepth={5}>
                            <h1 style={{ color: 'rgb(0, 188, 212)' }}>Login</h1>

                            <TextField
                                onChange={
                                    this.handleForm.bind(this, 'email', 'errorEmail')

                                }
                                errorText={this.state.errorEmail}
                                hintText="Enter Your Email"
                                floatingLabelText="Email"
                            /><br />
                            <br />
                            <PasswordField
                                onChange={
                                    this.handleForm.bind(this, 'password', 'errorPassword')

                                }
                                floatingLabelText="Password"
                                errorText={this.state.errorPassword}
                            /> <br /><br />
                            <RaisedButton label='Login' primary={true} onClick={this.signin.bind(this)} />
                            <br /><br />
                        </Paper>
                    </div>
                }
            </div>
        )
    }
}

function mapStateToProp(state) {
    return ({
        login: state.root.login
    })
}
function mapDispatchToProp(dispatch) {
    return ({
        // changeUserName: ()=>{dispatch(changeUserName())}
        signinWithEmailPassword: (user) => {
            dispatch(signinAction(user))
        },
        checkLogin: () => {
            dispatch(checkLogin())
        }
    })
}

export default connect(mapStateToProp, mapDispatchToProp)(Signin);

