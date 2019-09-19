import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Pagination from 'react-js-pagination';
import { withStyles, Grid } from '@material-ui/core';
import { Spinner } from 'reactstrap';
import TransactionFilterContainer from '../../../containers/transactions/TransactionFilterContainer';
import TransactionItem from '../transaction-item/TransactionItem';

class TransactionsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      itemsCountPerPage: 8
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.transactions.length !== prevProps.transactions.length) {
      this.setState({ activePage: 1 });
    }
  }

  handlePageChange = pageNumber => {
    this.setState({ activePage: pageNumber });
  };

  render() {
    const { activePage, itemsCountPerPage } = this.state;
    const {
      bankAccounts,
      transactions,
      isLoading,
      handleTransactionCategoryUpdate,
      handleTransactionSplit,
      handleTransactionUnsplit
    } = this.props;

    const nonChildTransactions = transactions.filter(t => t.parentId === null);
    const transactionItems = transactions
      .slice((activePage - 1) * itemsCountPerPage, (activePage - 1) * itemsCountPerPage + itemsCountPerPage)
      .map((transaction, index) => {
        const account = bankAccounts.find(acc => acc.id === transaction.accountId);
        const color = account ? account.color : '';
        return (
          <TransactionItem
            key={transaction.id}
            index={index}
            {...transaction}
            accountPreferredColor={color}
            handleTransactionCategoryUpdate={handleTransactionCategoryUpdate}
            handleTransactionSplit={handleTransactionSplit}
            handleTransactionUnsplit={handleTransactionUnsplit}
          />
        );
      });

    return (
      <div>
        <h2>Transactions</h2>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <TransactionFilterContainer />
          </Grid>
          <Grid item>
            {isLoading ? (
              <div className="text-center">
                <Spinner type="grow" color="primary" />
              </div>
            ) : (
              transactionItems
            )}
          </Grid>
          <Grid item container justify="center" className="">
            <Pagination
              itemClass="page-item"
              linkClass="page-link"
              pageRangeDisplayed={5}
              activePage={activePage}
              totalItemsCount={nonChildTransactions.length}
              itemsCountPerPage={itemsCountPerPage}
              onChange={this.handlePageChange}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

TransactionsList.propTypes = {
  transactions: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired
};

export default TransactionsList;
