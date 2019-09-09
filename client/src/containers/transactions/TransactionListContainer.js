import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  getTransacations,
  handleTransactionCategoryUpdate,
  handleTransactionSplit,
  handleTransactionUnsplit
} from '../../actions/transactionActions';
import TransactionList from '../../components/transactions-dashboard/transaction-list/TransactionList';
import { computeAccountBalance } from '../../selectors/statisticsSelector';
import { filterTransactions } from '../../selectors/transactionSelector';

class TransactionListContainer extends Component {
  componentDidMount() {
    this.props.getTransacations();
  }

  render() {
    return <TransactionList {...this.props} />;
  }
}

const makeMapStateToProps = () => {
  const getVisibleTransactions = filterTransactions();
  const mapStateToProps = state => ({
    bankAccounts: state.bankAccounts.bankAccounts,
    transactions: getVisibleTransactions(state),
    isLoading: state.transactions.loading,
    accountBalance: computeAccountBalance(state)
  });
  return mapStateToProps;
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators(
    { getTransacations, handleTransactionCategoryUpdate, handleTransactionSplit, handleTransactionUnsplit },
    dispatch
  );
};

export default connect(
  makeMapStateToProps,
  mapDispatchToProps
)(TransactionListContainer);
