const mongoose = require('mongoose');
const DataSchema = new mongoose.Schema({
    id: {
        type: String,
    },
    name: {
        type: String,
    },
    amount: {
        type: Number
    },
    selected: {
        type: Boolean
    }
})

const historySchema = new mongoose.Schema({
    id: {
        type: String,
    },
    myDate: {
        type: Date,
    },
    data: {
        type: [],
    }
})


historySchema.statics.insertNewUser = async function () {
    return await this.insertMany([{
        "name": "דודי",
        "amount": 0,
        "selected": false
    }
    ])
}

DataSchema.statics.getAllData = async function () {
    return await this.find();
}

DataSchema.statics.update = async function (obj) {
    const updatePromises = obj.map(async (item) => {
      const filter = { name: item.name };
      const update = { amount: item.amount };
    //   console.log(`${JSON.stringify(filter)} and ${JSON.stringify(update)}`);
      return this.findOneAndUpdate(filter, update);
    });
    const updatedData = await Promise.all(updatePromises);
    // HistoryModel.insertNewUser({myDate:new Date(),data:updatedData});
    const myObject = new HistoryModel({ myDate: new Date(),data:updatedData });
    myObject.save()
      .then(result => console.log(result))
      .catch(err => console.error(err));
  }

const HistoryModel = mongoose.model('splitBillsHistory', historySchema);
module.exports = mongoose.model('splitBills', DataSchema);


// {
//     "_id":{
//        "$oid":"63afc4d9738583d7b53994a9"
//     },
//     "name":"דן מרינסקו",
//     "amount":0,
//     "selected":false
//  },
// {
//     "_id":{
//        "$oid":"63afc4d9738584d7b53994a9"
//     },
//     "name":"ולד",
//     "amount":0,
//     "selected":false
//  },
// {
//     "_id":{
//        "$oid":"63afc4d9738585d7b53994a9"
//     },
//     "name":"הללי",
//     "amount":0,
//     "selected":false
//  },
// {
//     "_id":{
//        "$oid":"63afc4d9738586d7b53994a9"
//     },
//     "name":"אליאור",
//     "amount":0,
//     "selected":false
//  },
// {
//     "_id":{
//        "$oid":"63afc4d9738587d7b53994a9"
//     },
//     "name":"אילן",
//     "amount":0,
//     "selected":false
//  },
// {
//     "_id":{
//        "$oid":"63afc4d9738588d7b53994a9"
//     },
//     "name":"ורד רגב",
//     "amount":0,
//     "selected":false
//  },
// {
//     "_id":{
//        "$oid":"63afc4d9738589d7b53994a9"
//     },
//     "name":"ערן כרמי",
//     "amount":0,
//     "selected":false
//  },
// {
//     "_id":{
//        "$oid":"63afc4d9738593d7b53994a9"
//     },
//     "name":"ארי",
//     "amount":0,
//     "selected":false
//  },
// {
//     "_id":{
//        "$oid":"63afc4d9738683d7b53994a9"
//     },
//     "name":"ורד גולן",
//     "amount":0,
//     "selected":false
//  },
// {
//     "_id":{
//        "$oid":"63afc4d9738783d7b53994a9"
//     },
//     "name":"טטיאנה",
//     "amount":0,
//     "selected":false
//  },
// {
//     "_id":{
//        "$oid":"63afc4d9738883d7b53994a9"
//     },
//     "name":"לי",
//     "amount":0,
//     "selected":false
//  },
//  {
//     "_id":{
//        "$oid":"63afc4d9738983d7b53994a9"
//     },
//     "name":"קסניה",
//     "amount":0,
//     "selected":false
//  },
//  {
//     "_id":{
//        "$oid":"63afc4d9738183d7b53994a9"
//     },
//     "name":"אבי",
//     "amount":0,
//     "selected":false
//  },
//  {
//     "_id":{
//        "$oid":"63afc4d9738283d7b53994a9"
//     },
//     "name":"אודליה",
//     "amount":0,
//     "selected":false
//  }








