import React from 'react';
import { connect } from 'react-redux';
import TransactionItemCategoryModal from '../../components/transactions-dashboard/transaction-item/category-modal/TransactionItemCategoryModal';
import { handleTransactionCategoryInfoUpdate } from '../../actions/transactionActions';

interface StateFromProps {
  isLoading: boolean;
}

interface DispatchFromProps {
  handleTransactionCategoryInfoUpdate: () => void;
}

type Props = {
  isLoading: boolean;
  handleTransactionCategoryInfoUpdate: () => void;
};

const TransactionCategoryModalContainer: React.FC<Props> = props => {
  return (
    <div>
      <TransactionItemCategoryModal {...props} />
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    isLoading: state.bankAccounts.loading
  };
};

const mapDispatchToProps = {
  handleTransactionCategoryInfoUpdate
};

export default connect<StateFromProps, DispatchFromProps, void>(
  mapStateToProps,
  mapDispatchToProps
)(TransactionCategoryModalContainer);
