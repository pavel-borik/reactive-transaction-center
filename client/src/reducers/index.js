import { combineReducers } from 'redux';
import statisticsReducer from './statisticsReducer';
import transactionReducer from './transactionReducer';
import bankAccountReducer from './bankAccountReducer';
import ruleReducer from './ruleReducer';

export default combineReducers({
  bankAccounts: bankAccountReducer,
  statistics: statisticsReducer,
  transactions: transactionReducer,
  rules: ruleReducer
});
