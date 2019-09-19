import React, { Component } from 'react';
import { ExpansionPanelDetails, Divider, Typography, IconButton } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import { TransactionCategories, TransactionCategoriesLookup } from '../../../constants/categories';

class TransactionItemPanelDetail extends Component {
  handleTransactionUnsplit = (event, childTransactionId) => {
    event.preventDefault();
    this.props.handleTransactionUnsplit(this.props.transactionId, childTransactionId);
  };

  render() {
    const { detail, accountPreferredColor, transactionCategoryInfo } = this.props;
    return (
      <ExpansionPanelDetails style={{ borderLeft: `6px solid ${accountPreferredColor}`, marginTop: '-10px' }}>
        <div style={{ width: '100%' }}>
          <Divider style={{ marginBottom: '5px' }} />
          {transactionCategoryInfo && Object.entries(transactionCategoryInfo).length > 0 && (
            <div className="p-0">
              <Typography variant="h6" className="mb-1">
                Split into categories:
              </Typography>
              {Object.entries(transactionCategoryInfo)
                .filter(([categoryId, categoryAmount]) => {
                  return categoryAmount > 0;
                })
                .sort((a, b) => b[1] - a[1])
                .map(([categoryId, categoryAmount]) => {
                  const categoryText = TransactionCategoriesLookup.get(categoryId) || 'Unknown category';
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

          {detail && (
            <div>
              <hr />
              <Typography variant="title" className="mb-1">
                Detail:
              </Typography>
              {Object.entries(detail).map((it, i) => (
                <div>
                  {it[0]}:{it[1]}
                </div>
              ))}
            </div>
          )}
        </div>
      </ExpansionPanelDetails>
    );
  }
}

export default TransactionItemPanelDetail;
