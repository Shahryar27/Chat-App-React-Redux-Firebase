import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    BrowserRouter as Router,
    Route,
    Link,
} from 'react-router-dom';
import firebase from 'firebase';
import CircularProgress from 'material-ui/CircularProgress';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import PasswordField from 'material-ui-password-field';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { signupAction, checkLogin } from '../store/action/action';
const style = {
    width: 400,
    margin: 20,
    textAlign: 'left',
    paddingLeft: 60,
    paddingTop: 10,
    display: 'inline-block',
}

class Signup extends Component {
    constructor(props) {
        super(props);

        this.state = {

            error: null,
            info: null,
            email: '',
            password: '',
            userName: '',
            open: false,
            errorUserName: '',
            errorEmail: '',
            errorPassword: ''
        }


        this.signup = this.signup.bind(this);
        // this._onChangeEmail = this._onChangeEmail.bind(this);
        // this._onChangeUserName = this._onChangeUserName.bind(this);
        // this._onChangePassword = this._onChangePassword.bind(this);

    }
    componentWillMount() {
        this.props.checkLogin()
    }


    signup() {
        if (this.state.userName === '' && this.state.email === '' && this.state.password === '') {
            this.setState({ open: true, error: 'All fields are required' });

        }
        else {
            let user = {
                email: this.state.email,
                username: this.state.userName,
                password: this.state.password
            }
            this.setState({
                email: '',
                userName: '',
                password: ''
            })
            this.props.signupwithEmailPassword(user);
        }
    }
    // _onChangeEmail(event) {
    //     this.setState({
    //         email: event.target.value
    //     })
    // }
    // _onChangeUserName(event) {
    //     this.setState({
    //         userName: event.target.value
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
    handleDialog = () => {
        console.log('open')
        this.setState({ open: !this.state.open });
    };
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

            <div>
                <Dialog
                    // title="ERROR"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleDialog}
                >{this.state.error}
                </Dialog>
                {this.props.login === false ? <CircularProgress  size={150} thickness={10} /> :
                    <div style={{width:600,margin:'auto'}}>

                        <Paper style={style} zDepth={5}>
                            <h1 style={{ color: 'rgb(0, 188, 212)' }}>SIGN UP FORM</h1>

                            <TextField
                                onChange={
                                    this.handleForm.bind(this, 'userName', 'errorUserName')

                                }
                                hintText="Enter Your User Name"
                                floatingLabelText="User Name"
                                errorText={this.state.errorUserName}
                            /><br />
                            <br />
                            {/* <TextField
                                onChange={
                                    this.handleForm.bind(this, 'lName', 'errorlName')

                                }
                                hintText="Enter Your Last Name"
                                floatingLabelText="Last Name"
                                errorText={this.state.errorlName}
                            /><br />
                            <br /> */}
                            <TextField
                                onChange={
                                    this.handleForm.bind(this, 'email', 'errorEmail')

                                }
                                hintText="Enter Your Email"
                                floatingLabelText="Email"
                                errorText={this.state.errorEmail}
                            /><br />
                            <br />


                            <PasswordField
                                onChange={
                                    this.handleForm.bind(this, 'password', 'errorPassword')

                                }
                                floatingLabelText="Password"
                                errorText={this.state.errorPassword}
                            /> <br /><br />
                            <RaisedButton label='Signup' primary={true} style={{ marginLeft: '30%' }} onClick={this.signup.bind(this)} />
                            <br /><Link to="/" ><FlatButton label="ALREADY HAVE A ACCOUNT? LOGIN NOW" /></Link>
                            <br /><br />
                        </Paper>
                    </div>
                }
            </div>

            // <div>
            //     <h1>Hello World Signup</h1>
            //     <label>Email:<input type='text' name='email' value={this.state.email} onChange={this._onChangeEmail} /></label>
            //     <br />
            //     <label>User Name:<input type='text' name='username' value={this.state.userName} onChange={this._onChangeUserName}/></label>
            //     <br />
            //     <label>Password:<input type='password' name='password' value={this.state.password} onChange={this._onChangePassword}/></label>
            //     <button onClick={this.signup}>Signup</button>
            //     <br /><Link to="/" >SIGN IN</Link>

            // </div>


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
        signupwithEmailPassword: (userDetails) => {
            dispatch(signupAction(userDetails));
        },
        checkLogin: () => {
            dispatch(checkLogin())
        }
    })
}

export default connect(mapStateToProp, mapDispatchToProp)(Signup);

