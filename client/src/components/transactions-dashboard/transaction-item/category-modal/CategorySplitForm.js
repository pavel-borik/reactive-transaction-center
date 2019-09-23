import React from 'react';
import { Typography, IconButton } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import { TransactionCategoriesLookup, TransactionCategories } from '../../../../constants/categories';

const CategorySplitForm = props => {
  const { transactionCategoryInfo } = props;
  return (
    <div>
      {Object.entries(transactionCategoryInfo).length > 0 && (
        <div className="p-0">
          <Typography variant="h6" className="mb-1">
            Split into categories:
          </Typography>
          {Object.entries(transactionCategoryInfo)
            .filter(([, categoryAmount]) => {
              return categoryAmount > 0;
            })
            .sort((a, b) => b[1] - a[1])
            .map(([categoryId, categoryAmount]) => {
              const categoryText = TransactionCategoriesLookup.get(categoryId).text || 'Unknown category';
              const isUncategorized = categoryId === TransactionCategories.UNCATEGORIZED.id;
              return (
                <div>
                  <IconButton
                    aria-label="Delete"
                    className="p-0 mb-1"
                    disabled={isUncategorized}
                    onClick={e => this.handleTransactionUnsplit(e, categoryId)}
                  >
                    <ClearIcon fontSize="small" color={isUncategorized ? 'disabled' : 'error'} />
                  </IconButton>
                  {categoryText}
                  {categoryAmount.toLocaleString('cs-cz', {
                    style: 'currency',
                    currency: 'CZK'
                  })}
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

CategorySplitForm.propTypes = {};

export default CategorySplitForm;
