import React from 'react';
import { Grid } from '@material-ui/core';
import { Spinner } from 'reactstrap';
import AccountBalanceInfo from './AccountBalanceInfo';

const dummyData = [
  { accountNumber: '873113211/2010', accountOwner: 'Legolas', accountPreferredColor: 'orange', balance: 5000 },
  { accountNumber: '512345678/6210', accountOwner: 'Bilbo Baggins', accountPreferredColor: 'green', balance: 80000 },
  { accountNumber: '791919191/2700', accountOwner: 'Gandalf the White', accountPreferredColor: 'blue', balance: 133004 }
];

const AccountOverviewArea = props => {
  const realAccount = {
    accountNumber: '717717717/0800',
    accountOwner: 'Gimli, son of Gloin',
    accountPreferredColor: 'red',
    balance: props.balance || 0
  };
  const { bankAccounts, isLoading } = props;
  return (
    <div>
      <h2>Accounts</h2>
      {isLoading && (
        <div className="text-center">
          <Spinner type="grow" color="primary" />
        </div>
      )}
      <Grid container direction="row" spacing={4}>
        {bankAccounts.map(account => {
          return (
            <Grid item key={account.id}>
              <AccountBalanceInfo accountInfo={account} />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default AccountOverviewArea;
