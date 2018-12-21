import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPortfolio } from '../store/action/action'
class Portfolio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userNameInput: '',
            professionInput: '',
            apperanceInput: ''
        }
    }
    createPortfolio() {
        let createPortfolio = {
            userName: this.state.userNameInput,
            profession: this.state.professionInput,
            apperance: this.state.apperanceInput,
        }
        this.setState({
            userNameInput: '',
            professionInput: '',
            apperanceInput: ''
        })
        let portfoliosClone = this.props.currentPortfolio;
        portfoliosClone.push(createPortfolio)
        this.props.pleaseCreateNewPortfolio(portfoliosClone);
    }

    _userNameonChange(ev) {
        this.setState({
            userNameInput: ev.target.value
        })
    }
    _professionChange(ev) {
        this.setState({
            professionInput: ev.target.value
        })
    }
    _apperanceChange(ev) {
        this.setState({
            apperanceInput: ev.target.value
        })
    }
    render() {
        return (
            <div>
                <h1>Hello portfolio</h1>
                UserName:    <input type="text" value={this.state.userNameInput} onChange={this._userNameonChange.bind(this)} />
                Profession:   <input type="text" value={this.state.professionInput} onChange={this._professionChange.bind(this)} />
                apperance:   <input type="text" value={this.state.apperanceInput} onChange={this._apperanceChange.bind(this)} />
                <button onClick={this.createPortfolio.bind(this)}> SUBMIT</button>
                {
                    this.props.currentPortfolio.map((portfolio, ind) => {
                        return (
                            <div key={ind}>
                                <h1>Username:   {portfolio.userName}</h1>
                                <h2>profession:  {portfolio.profession}</h2>
                                <h2>  apperance:   {portfolio.apperance}</h2>

                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

function mapStateToProp(state) {
    console.log(state.root.portfolios)
    return ({
        currentPortfolio: state.root.portfolios
        // userName: state.root.userName
    })
}
function mapDispatchToProp(dispatch) {
    return ({

        pleaseCreateNewPortfolio: (newPortfolio) => {
            dispatch(createPortfolio(newPortfolio))
        }
        // changeUserName: ()=>{dispatch(changeUserName())}

    })
}


export default connect(mapStateToProp, mapDispatchToProp)(Portfolio);
