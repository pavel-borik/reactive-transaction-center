import React, { Component } from 'react';
import moment from 'moment';
import { withStyles, ExpansionPanel, ExpansionPanelSummary, Typography, Grid, Grow, Chip } from '@material-ui/core/';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
  OutgoingTransactionCategories,
  TransactionCategories,
  IncomingTransactionCategories,
  SpecialCategories,
  TransactionCategoriesLookup
} from '../../../constants/categories';
import TransactionItemPanelDetail from './TransactionItemPanelDetail';
import { TransactionTypes, TransactionDirections } from '../../../constants/transactions';
import TransactionCategoryModalContainer from '../../../containers/transaction-item/TransactionCategoryModalContainer.tsx';

class TransactionItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryId: UNSELECTED,
      chipHover: false,
      categoryModalOpen: false
    };
  }

  componentDidMount() {
    const { categoryId } = this.props;
    if (categoryId !== SpecialCategories.UNCATEGORIZED.id) {
      this.setState({ categoryId });
    }
  }

  handleCategoryChange = event => {
    this.setState({ categoryId: event.target.value });
  };

  getCategoryEnum = (isParentTransaction, childTransactionsList, transactionCategoryId, transactionValue) => {
    if (isParentTransaction) {
      if (childTransactionsList.length === 2) {
        const categorizedChild = childTransactionsList.find(
          c => c.categoryId !== TransactionCategories.UNCATEGORIZED.id
        );
        if (categorizedChild !== undefined && categorizedChild.amount === transactionValue) {
          return Object.values(TransactionCategories).find(cat => cat.id === categorizedChild.categoryId);
        }
        return TransactionCategories.SPLIT;
      }
      return TransactionCategories.SPLIT;
    }
    return Object.values(TransactionCategories).find(cat => cat.id === transactionCategoryId);
  };

  render() {
    const {
      classes,
      index,
      id,
      categoryId,
      transactionCategoryInfo,
      direction,
      accountPreferredColor,
      partyDescription,
      partyAccount,
      additionalInfoDomestic,
      additionalInfoForeign,
      additionalInfoCard,
      payeeMessage,
      payerMessage,
      value,
      valueDate,
      transactionType
    } = this.props;

    let categoryText;
    if (transactionCategoryInfo === null || Object.keys(transactionCategoryInfo).length === 0) {
      categoryText = SpecialCategories.UNCATEGORIZED.text;
    } else if (Object.keys(transactionCategoryInfo).length === 1) {
      categoryText =
        TransactionCategoriesLookup.get(Object.keys(transactionCategoryInfo)[0]).text ||
        SpecialCategories.UNCATEGORIZED.text;
    } else {
      categoryText = SpecialCategories.SPLIT.text;
    }

    const transactionTypeEnum = TransactionTypes[transactionType];
    const transactionTypeText = transactionTypeEnum === undefined ? 'Unknown' : transactionTypeEnum.text;

    const transactionCategories =
      direction === TransactionDirections.INCOMING.id ? IncomingTransactionCategories : OutgoingTransactionCategories;

    const invalidForNewCategorySubmit = false;
    const isSplitOffered = false;
    const maxValueToAssign = 100;
    const valueAmount = value.amount;
    const valueCurrency = value.currency;
    const activeDetail = null;
    return (
      <div className="mb-2">
        <Grow in timeout={500 + 100 * index}>
          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              style={{ borderLeft: `6px solid ${accountPreferredColor}` }}
            >
              <div style={{ flexGrow: 1 }}>
                <Grid container direction="row" justify="space-between" alignItems="center">
                  <Grid item>
                    <Chip
                      size="small"
                      className={classes.chip}
                      label={<Typography className={classes.chipLabel}>{categoryText}</Typography>}
                      onMouseEnter={() => this.setState({ chipHover: true })}
                      onMouseLeave={() => this.setState({ chipHover: false })}
                      onDelete={
                        this.state.chipHover || this.state.categoryModalOpen
                          ? () => {
                              this.setState({ categoryModalOpen: true });
                            }
                          : null
                      }
                      deleteIcon={<MoreHorizIcon />}
                    />
                    <Typography className={classes.heading}>{partyDescription}</Typography>
                    <Typography>
                      <span className={classes.secondaryHeading}>{transactionTypeText}</span>
                    </Typography>
                    <Typography className={classes.date}>{moment(valueDate).format('DD MMM YYYY')}</Typography>
                  </Grid>
                  <Grid item>
                    {direction === TransactionDirections.OUTGOING.id && (
                      <Typography className={classes.amountNegative}>
                        &#8722;&nbsp;
                        {valueAmount.toLocaleString('cs-cz', {
                          style: 'currency',
                          currency: valueCurrency || 'CZK'
                        })}
                      </Typography>
                    )}
                    {direction === TransactionDirections.INCOMING.id && (
                      <Typography className={classes.amountPositive}>
                        {valueAmount.toLocaleString('cs-cz', {
                          style: 'currency',
                          currency: valueCurrency || 'CZK'
                        })}
                      </Typography>
                    )}
                  </Grid>
                </Grid>
              </div>
            </ExpansionPanelSummary>
            <TransactionItemPanelDetail
              detail={activeDetail}
              accountPreferredColor={accountPreferredColor}
              transactionCategoryInfo={transactionCategoryInfo}
              handleTransactionUnsplit={this.props.handleTransactionUnsplit}
              transactionId={id}
              value={value}
            />
          </ExpansionPanel>
        </Grow>
        <TransactionCategoryModalContainer
          open={this.state.categoryModalOpen}
          transactionId={id}
          transactionCategoryInfo={transactionCategoryInfo}
          transactionCategories={transactionCategories}
          transactionValue={value}
          handleModalClose={() => this.setState({ categoryModalOpen: false })}
        />
      </div>
    );
  }
}

const UNSELECTED = 'UNSELECTED';

const styles = theme => ({
  heading: {
    fontSize: theme.typography.pxToRem(18),
    fontWeight: 600
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: 100
  },
  date: {
    fontSize: theme.typography.pxToRem(15),
    paddingTop: 3
  },
  amountPositive: {
    fontSize: theme.typography.pxToRem(18),
    color: 'green',
    fontWeight: 600
  },
  amountNegative: {
    fontSize: theme.typography.pxToRem(18),
    color: 'red',
    fontWeight: 600
  },
  chip: {
    background: '#ffbb33'
  },
  chipLabel: {
    fontWeight: 600,
    fontSize: theme.typography.pxToRem(12)
  }
});

export default withStyles(styles)(TransactionItem);
