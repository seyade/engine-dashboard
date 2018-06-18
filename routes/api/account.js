const express = require('express');
const router = express.Router();
const passport = require('passport');

const Account = require('../../models/Account');

/**
 * @route POST api/account/
 * @desc Create or edit account of user
 * @access Private
 */
router.post('/', (req, res) => {
  let accountFields = {};

  accountFields.currentPlan = {};
  accountFields.currentPlan.traffic = {};
  accountFields.currentPlan.balance = {};

  accountFields.user = req.user.id;

  const AccountSchema = {
    user: {
      type: Schema.Type.ObjectId,
      ref: 'users'
    },
    accountNumber: '',
    active: '',
    currentPlan: {
      name: '',
      upload: [
        {
          month: '',
          amount: ''
        }
      ],
      download: [
        {
          month: '',
          amount: ''
        }
      ],
      traffic: {
        spent: '',
        current: ''
      },
      balance: {
        nextMonthPayment: '',
        currentAmount: '',
        daysLeft: ''
      }
    }
  };

  if (req.body.accountNumber)
    accountFields.accountNumber = req.body.accountNumber;
  if (req.body.active) accountFields.active = req.body.active;
  if (req.body.currentPlanName)
    accountFields.currentPlan.name = req.body.currentPlanName;
  // if (req.body.currentPlanUpload) accountFields.currentPlan.upload = req.body.currentPlanUpload;
  if (req.body.currentPlanTrafficCurrent)
    accountFields.currentPlan.traffic.current =
      req.body.currentPlanTrafficCurrent;

  if (req.body.currentPlanTrafficSpent)
    accountFields.currentPlan.traffic.spent = req.body.currentPlanTrafficSpent;

  if (req.body.currentPlanBalanceNextMonthPayment)
    accountFields.currentPlan.balance.nextMonthPayment =
      req.body.currentPlanBalanceNextMonthPayment;

  if (req.body.currentPlanBalanceCurrentAmount)
    accountFields.currentPlan.balance.currentAmount =
      req.body.currentPlanBalanceCurrentAmount;

  if (req.body.currentPlanBalanceDaysLeft)
    accountFields.currentPlan.balance.daysLeft =
      req.body.currentPlanBalanceDaysLeft;

  Account.findOne({ user: req.user.id }).then(account => {
    if (user) {
      // Update account
      Account.findOneAndUpdate(
        { user: req.user.id },
        { $set: accountFields },
        { new: true }
      ).then(account => res.json(account));
    } else {
      // Create account
      Account.findOne({ accountNumber: accountFields.accountNumber });
    }
  });
});
