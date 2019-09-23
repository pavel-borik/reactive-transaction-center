import React, { Component } from 'react';
import { ExpansionPanelDetails, Divider, Typography } from '@material-ui/core';
import PanelDetailSplitOveviewTable from './PanelDetailSplitOveviewTable';

class TransactionItemPanelDetail extends Component {
  handleTransactionUnsplit = (event, childTransactionId) => {
    event.preventDefault();
    this.props.handleTransactionUnsplit(this.props.transactionId, childTransactionId);
  };

  render() {
    const { detail, accountPreferredColor, transactionCategoryInfo, value } = this.props;
    return (
      <ExpansionPanelDetails style={{ borderLeft: `6px solid ${accountPreferredColor}`, marginTop: '-10px' }}>
        <div style={{ width: '100%' }}>
          <Divider style={{ marginBottom: '5px' }} />
          {transactionCategoryInfo && Object.entries(transactionCategoryInfo).length > 1 && (
            <PanelDetailSplitOveviewTable transactionCategoryInfo={transactionCategoryInfo} value={value} />
          )}
          {detail && (
            <div>
              <hr />
              <Typography variant="title" className="mb-1">
                Detail:
              </Typography>
              {Object.entries(detail).map(it => (
                <div>
                  {it[0]}
                  {':'}
                  {it[1]}
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
