import React from "react";
import '../style/main.css'
import axios from 'axios'
import Table from "../Components/Table";

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            names: [],
            paymentAmount: 5,
            usersArray: [],
            paymentMethod: 'split',
            paymentName: '',
            myData: null,
            loading: false, // add a loading flag to track if the component is already loading data
        };
    }

    componentDidMount() {
        this.loadData();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.myData !== this.state.myData) {
            this.loadData();
        }
    }

    loadData() {
        // check if the component is already loading data before making the API call
        if (!this.state.loading) {
            this.setState({ loading: true }); // set the loading flag to true
            axios.get('http://localhost:3500/data')
                .then(response => {
                    let data = response.data;
                    console.log(data)
                    let tempNamesArr = []
                    for (let i = 0; i < data.objsArray.length; i++) {
                        tempNamesArr.push(data.objsArray[i].name)
                    }
                    this.setState({
                        usersArray: data.objsArray,
                        names: tempNamesArr,
                        paymentName: tempNamesArr[0],
                        loading: false // reset the loading flag to false
                    })
                })
                .catch(err => {
                    console.log(err);
                    this.setState({ loading: false }); // reset the loading flag to false on error
                })
        }
    }


    changePaymentAmount = (e) => {
        const value = parseInt(e.target.value.replace(/\D/g, '')) || 0;
        this.setState({ paymentAmount: value })
    }
    changePaymentMethod = (e) => {
        this.setState({ paymentMethod: e.target.value })
    }
    changePaymentName = (e) => {
        this.setState({ paymentName: e.target.value })
    }

    render() {
        return (
            <>
                <div className="container">
                    <h1>חלוקת תשלומים </h1>
                    <div className="payment-container">
                        <div className="payment-name-container">
                            <label className="payment-name-label">:בחירת השם של מי ששילם</label>
                            <select className="payment-name-select" onChange={this.changePaymentName}>
                                {this.state.names.map((name, key) => {
                                    return <option key={key}>{name}</option>
                                })}
                            </select>
                        </div>
                        <div className="payment-amount-container">
                            <label className="payment-amount-label">סכום:</label>
                            <input type="text" onChange={this.changePaymentAmount} value={this.state.paymentAmount} className="payment-amount-input"></input>
                        </div>
                        <div className="payment-method">
                            <input type="radio" value="split" onChange={this.changePaymentMethod} checked={this.state.paymentMethod === 'split'} name="payment-method" /> חלוקה שווה
                            <input type="radio" value="edit" onChange={this.changePaymentMethod} checked={this.state.paymentMethod === 'edit'} name="payment-method" /> עריכה חופשית
                        </div>
                        <div className="table">
                            <Table data={this.state.usersArray} paymentName={this.state.paymentName} paymentAmount={this.state.paymentAmount} readOnly={this.state.paymentMethod === 'split'} />
                        </div>
                    </div>
                </div>
            </>


        )
    }
}
export default Main;