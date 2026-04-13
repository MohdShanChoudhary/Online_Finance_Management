const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },  // removed `unique: true`
  phone: { type: String, required: true },

  email: { type: String, required: true },


  transactionType: { type: String, enum: ['Buy', 'Sell'], required: true },
  amount: { type: Number, required: true },
  payableAmount: { type: Number },
  receivedAmount: { type: Number },
  pendingAmount: { type: Number },
  remarks: { type: String },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
