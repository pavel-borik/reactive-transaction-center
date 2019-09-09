import React from 'react';
import TransactionListContainer from '../../containers/transactions/TransactionListContainer';
import AccountsContainer from '../../containers/transactions/AccountsContainer';
import BankAccountContainer from '../../containers/bankAccounts/BankAccountContainer';

const TransactionsDashboard = () => {
  return (
    <>
      <BankAccountContainer />
      <TransactionListContainer />
    </>
  );
};

export default TransactionsDashboard;
