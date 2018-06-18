const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
  user: {
    type: Schema.Type.ObjectId,
    ref: 'users'
  },
  accountNumber: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  active: {
    type: Boolean,
    required: true
  },
  currentPlan: {
    name: {
      type: String,
      required: true
    },
    upload: [
      {
        month: {
          type: String,
          required: true
        },
        amount: {
          type: Number,
          required: true
        }
      }
    ],
    download: [
      {
        month: {
          type: String,
          required: true
        },
        amount: {
          type: Number,
          required: true
        }
      }
    ],
    traffic: {
      spent: {
        type: Number
      },
      current: {
        type: Number
      }
    },
    balance: {
      nextMonthPayment: {
        type: Number,
        required: true
      },
      currentAmount: {
        type: Number,
        required: true
      },
      daysLeft: {
        type: Number,
        required: true
      }
    }
  }
});

module.exports = Account = mongoose.model('account', AccountSchema);
