import React, { Component } from 'react';
import { connect } from 'react-redux';
import AccountOverviewArea from '../../components/transactions-dashboard/accounts-overview/AccountOverviewArea';
import getBankAccounts from '../../actions/bankAccountActions';

class BankAccountContainer extends Component {
  componentDidMount() {
    this.props.getBankAccounts();
  }

  render() {
    return <AccountOverviewArea bankAccounts={this.props.bankAccounts} isLoading={this.props.isLoading} />;
  }
}

const mapStateToProps = state => {
  return {
    bankAccounts: state.bankAccounts.bankAccounts,
    isLoading: state.bankAccounts.loading
  };
};

const mapDispatchToProps = {
  getBankAccounts
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BankAccountContainer);
