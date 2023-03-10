import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import '../style/table.css'
import axios from 'axios'
class Table extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      editing: '',
      masterSelect: false,
      tempData: this.props.data
    }
    // this.changeMasterSelect = this.changeMasterSelect.bind(this);
  }

  componentDidMount() {
    console.log(this.state.tempData)
  }

  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data) {
      this.setState({ tempData: this.props.data });
    }
  }
  handleEdit(id) {
    this.setState({ editing: id })
  };

  handleSave(id) {
    this.setState({ editing: '' })
  }
  setAmount(id, value) {
    value = parseInt(value.replace(/\D/g, '')) || 0;
    this.setState(prevState => ({
      tempData: prevState.tempData.map(item => {
        if (item._id === id) {
          return { ...item, amount: value };
        }
        return item;
      })
    }))
  }

  changeSelected(event, id) {
    const { checked } = event.target;
    this.setState(prevState => ({
      tempData: prevState.tempData.map(item => {
        if (item._id === id) {
          return { ...item, selected: checked };
        }
        return item;
      })
    }))
  }

  changeMasterSelect = (event) => {
    console.log(this.props)
    this.setState({ masterSelect: event.target.checked })
    this.setState(prevState => ({
      tempData: prevState.tempData.map((item) => ({
        ...item,
        selected: event.target.checked,
      })),
    }));
  }

  calculateSplit = async () => {
    if (this.props.readOnly) return;
    let countParticipants = 0;
    this.state.tempData.map(item => {
      if (item.selected)
        countParticipants++;
    })
    let paymentPerParticipant = this.props.paymentAmount / countParticipants;
    return await this.setState(prevState => ({
      tempData: prevState.tempData.map(item => {
        if (item.name === this.props.paymentName && item.selected)
          return { ...item, amount: Number((item.amount + this.props.paymentAmount - paymentPerParticipant).toFixed(2)) }
        if (item.name === this.props.paymentName)
          return { ...item, amount: Number((item.amount + this.props.paymentAmount).toFixed(2)) }
        if (item.selected)
          return { ...item, amount: Number((item.amount - paymentPerParticipant).toFixed(2)) }
        return item;
      })
    }))
  }

  submitData = () => {
    //splitting is true
    this.calculateSplit().then(() => {
      let dataToSend = this.state.tempData
      console.log(dataToSend)

      axios.post('http://localhost:3500/update', { dataToSend }).then(response => {
        // let data = response.data;
      }).catch(err => {
        console.log(err);
      })


    });


  }

  render() {
    return (
      <>
        <table className="table">
          <thead>
            <tr>
              <th><input type="checkbox" checked={this.state.masterSelect} onChange={this.changeMasterSelect} /></th>
              <th>Name</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {(this.state.tempData).map((item) => (
              <tr key={item._id}>
                <td><input type="checkbox" onChange={e => this.changeSelected(e, item._id)} checked={item.selected} /></td>
                <td>{item.name}</td>
                <td>
                  {this.state.editing === item._id ? (
                    <input
                      type="text"
                      value={item.amount}
                      onChange={(e) => this.setAmount(item._id, e.target.value)}
                      placeholder={item.amount}
                    />
                  ) : (
                    <span onClick={() => { if (this.props.readOnly) this.handleEdit(item._id) }}>{item.amount}</span>
                  )}
                </td>
              </tr>
            )
            )
            }
          </tbody>
        </table>
        <Button variant="primary" onClick={this.submitData} type='submit'>עדכון</Button>
      </>
    );
  };
}
export default Table;