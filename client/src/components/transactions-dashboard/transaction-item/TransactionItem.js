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
import TransactionItemCategorySplitForm from './TransactionItemCategorySplitForm';
import TransactionItemCategoryModal from './TransactionItemCategoryModal';

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

  handleTransactionCategoryUpdate = event => {
    event.stopPropagation();
    event.preventDefault();
    this.props.handleTransactionCategoryUpdate(this.props.id, this.state.categoryId);
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

    // const isParentTransaction = childTransactionsList !== null && childTransactionsList.length > 0 && parentId === null;
    // const isSplitableTransaction = childTransactionsList !== null && parentId === null;
    // const valueAmount = isParentTransaction ? originalValue : transactionValueAmount;

    // let maxValueToAssign = 0;
    // if (isSplitableTransaction) {
    //   const uncategorizedChild = childTransactionsList.find(
    //     it => it.categoryId === TransactionCategories.UNCATEGORIZED.id
    //   );
    //   if (uncategorizedChild !== undefined) {
    //     maxValueToAssign = uncategorizedChild.amount;
    //   } else {
    //     maxValueToAssign = valueAmount;
    //   }
    // }

    // let isSplitOffered = false;
    // if (isParentTransaction) {
    //   isSplitOffered = maxValueToAssign > 0;
    // } else {
    //   isSplitOffered = categoryId === TransactionCategories.UNCATEGORIZED.id;
    // }

    // const invalidForNewCategorySubmit =
    //   this.state.categoryId === UNSELECTED ||
    //   categoryId === this.state.categoryId ||
    //   transactionType === TransactionTypes.CASH.id ||
    //   isParentTransaction;

    // const categoryEnum = this.getCategoryEnum(isParentTransaction, childTransactionsList, categoryId, valueAmount);
    // const categoryText = categoryEnum === undefined ? 'Unknown' : categoryEnum.text;
    // const transactionTypeEnum = Object.values(TransactionTypes).find(type => type.id === transactionType);
    // const transactionTypeText = transactionTypeEnum === undefined ? 'Unknown' : transactionTypeEnum.text;
    // const transactionCategories =
    //   direction === TransactionDirections.INCOMING.id ? IncomingTransactionCategories : OutgoingTransactionCategories;
    // const detailCardPayments = { 'Merchant name': transactionAdditionalInfoCardMerchantName };
    // const detailTransfers = {
    //   'Party account': `${transactionPartyAccountPrefix}-${transactionPartyAccountAccountNumber}/${transactionPartyAccountBankCode}`,
    //   'Variable symbol': transactionAdditionalInfoDomesticVariableSymbol,
    //   'Constant symbol': transactionAdditionalInfoDomesticConstantSymbol,
    //   Message: `${direction === TransactionDirections.INCOMING.id ? payeeMessage : payerMessage}`
    // };
    // let activeDetail;
    // switch (transactionType) {
    //   case TransactionTypes.CARD.id:
    //     activeDetail = detailCardPayments;
    //     break;
    //   case TransactionTypes.CASH.id:
    //     activeDetail = null;
    //     break;
    //   default:
    //     activeDetail = detailTransfers;
    // }

    const categoryText = TransactionCategoriesLookup.get(categoryId) || 'Unknown';

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
                    {/* <Grid item xs={12} md={11} className="ml-xs-3 ml-sm-0"> */}
                    {/* <Grid container justify="space-between" alignItems="center"> */}
                    {/* <Row> */}
                    {/* <Col xs={12} lg={4} className="m-0 p-0"> */}
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
                    {/* </Col> */}
                    {/* <Col xs={12} md={8}>
                        <Grid container justify="flex-start" alignItems="center" className="mt-3">
                          <Grid item>
                            <Form inline>
                              <FormGroup className="p-0 m-0">
                                <Input
                                  type="select"
                                  name="categorySelect"
                                  id="categorySelect"
                                  onChange={e => this.handleCategoryChange(e)}
                                  onClick={e => {
                                    e.stopPropagation();
                                  }}
                                  disabled={false}
                                  value={this.state.categoryId}
                                  bsSize="sm"
                                  style={{ width: 220 }}
                                >
                                  <option disabled value={UNSELECTED}>
                                    -- select a category --
                                  </option>
                                  {Object.values(transactionCategories).map(c => (
                                    <option key={c.id} value={c.id}>
                                      {c.text}
                                    </option>
                                  ))}
                                </Input>

                                <Button
                                  color={invalidForNewCategorySubmit ? 'secondary' : 'primary'}
                                  type="submit"
                                  className="ml-md-2"
                                  disabled={invalidForNewCategorySubmit}
                                  size="sm"
                                  onClick={this.handleTransactionCategoryUpdate}
                                >
                                  Save
                                </Button>
                              </FormGroup>
                            </Form>
                          </Grid>
                          <Grid item xs={12} md="auto" className="ml-xl-2">
                            {isSplitOffered && (
                              <TransactionItemCategorySplitForm
                                transactionCategories={transactionCategories}
                                handleTransactionSplit={this.props.handleTransactionSplit}
                                transactionId={id}
                                maxValueToAssign={maxValueToAssign}
                              />
                            )}
                          </Grid>
                        </Grid>
                      </Col> */}
                    {/* </Row> */}

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
            />
          </ExpansionPanel>
        </Grow>
        <TransactionItemCategoryModal
          open={this.state.categoryModalOpen}
          transactionCategoryInfo={transactionCategoryInfo}
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
