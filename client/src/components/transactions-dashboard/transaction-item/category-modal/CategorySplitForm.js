import React from 'react';
import { Typography, IconButton, Grid, Divider } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import {
  TransactionCategoriesLookup,
  TransactionCategories,
  SpecialCategories
} from '../../../../constants/categories';

const CategorySplitForm = props => {
  const { transactionCategoryInfo, transactionCategories } = props;
  const UNSELECTED = 'UNSELECTED';
  const [categorySplitInfo, changeCategorySplitInfo] = React.useState({
    ...transactionCategoryInfo,
    [SpecialCategories.UNCATEGORIZED.id]: 0
  });
  const [splitAmount, handleSplitAmountChange] = React.useState(0);
  const [categoryIdToSplit, handleCategoryInputChange] = React.useState(UNSELECTED);
  const freeToAssign = categorySplitInfo[SpecialCategories.UNCATEGORIZED.id];
  const regex = /^[0-9]+(\.[0-9]{1,2})?$/;
  const invalidForApply = !parseFloat(splitAmount) > 0 || categoryIdToSplit === UNSELECTED;
  const validForSubmit =
    parseFloat(freeToAssign) === 0 &&
    Object.keys(categorySplitInfo).filter(key => key !== SpecialCategories.UNCATEGORIZED.id).length > 1;

  const handleInputChange = event => {
    switch (event.target.name) {
      case 'splitAmount':
        regex.test(event.target.value)
          ? handleSplitAmountChange(event.target.value)
          : handleSplitAmountChange(splitAmount);
        break;
      case 'selectSplitCategoryId':
        handleCategoryInputChange(event.target.value);
        break;
      default:
        break;
    }
  };

  const add = (a, b) => {
    return Number.parseFloat((parseFloat(a) + parseFloat(b)).toFixed(2));
  };

  const subtract = (a, b) => {
    return Number.parseFloat((parseFloat(a) - parseFloat(b)).toFixed(2));
  };

  const handleTransactionSplit = () => {
    const val = categorySplitInfo[categoryIdToSplit];
    const newFree = subtract(freeToAssign, splitAmount);
    if (val !== undefined) {
      const newVal = add(val, splitAmount);
      changeCategorySplitInfo({
        ...categorySplitInfo,
        [categoryIdToSplit]: newVal,
        [SpecialCategories.UNCATEGORIZED.id]: newFree
      });
      return;
    }
    changeCategorySplitInfo({
      ...categorySplitInfo,
      [categoryIdToSplit]: add(0, splitAmount),
      [SpecialCategories.UNCATEGORIZED.id]: newFree
    });
  };

  const handleTranactionUnsplit = (event, categoryId, categoryAmount) => {
    const newFreeToAssign = add(freeToAssign, categoryAmount);
    const modifiedSplit = {
      ...categorySplitInfo,
      [categoryId]: 0,
      [SpecialCategories.UNCATEGORIZED.id]: newFreeToAssign
    };
    const result = Object.entries(modifiedSplit).reduce((accumulator, entry) => {
      const key = entry[0];
      const value = entry[1];

      if (value > 0 || key === SpecialCategories.UNCATEGORIZED.id) {
        accumulator[key] = value;
      }

      return accumulator;
    }, {});
    changeCategorySplitInfo(result);
  };

  return (
    <div>
      <Grid container direction="row" justify="space-between">
        <Typography>To assign:</Typography>
        <Typography variant="h3">{freeToAssign}</Typography>
      </Grid>
      <Divider />
      <Form>
        <FormGroup>
          <Label for="">Amount</Label>
          <Input
            name="splitAmount"
            id="splitAmount"
            placeholder="Insert amount"
            value={splitAmount}
            className="text-right"
            onChange={e => handleInputChange(e)}
            bsSize="sm"
            type="number"
            min="0"
            max={freeToAssign.toString()}
            step="0.01"
          />
          <Label for="" className="mt-2">
            Into category
          </Label>
          <Grid container direction="row" justify="space-between">
            <Input
              type="select"
              name="selectSplitCategoryId"
              id="selectSplitCategoryId"
              onChange={e => handleInputChange(e)}
              value={categoryIdToSplit}
              style={{ width: 220 }}
              bsSize="sm"
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
              name="applyNewSplit"
              color={invalidForApply ? 'secondary' : 'primary'}
              style={{ width: 80 }}
              size="sm"
              onClick={e => handleTransactionSplit(e)}
              disabled={invalidForApply}
            >
              Apply
            </Button>
          </Grid>
        </FormGroup>
      </Form>
      <Divider />
      {Object.entries(categorySplitInfo).length > 0 && (
        <div className="p-0">
          <Typography variant="h6" className="mb-1">
            Split into categories:
          </Typography>
          {Object.entries(categorySplitInfo)
            .filter(([, categoryAmount]) => {
              return categoryAmount > 0;
            })
            .sort((a, b) => b[1] - a[1])
            .map(([categoryId, categoryAmount]) => {
              const categoryText = TransactionCategoriesLookup.get(categoryId).text;
              const isUncategorized = categoryId === TransactionCategories.UNCATEGORIZED.id;
              return (
                <div>
                  <Grid container direction="row" justify="space-between">
                    <Grid item>
                      <IconButton
                        aria-label="Delete"
                        className="p-0 mb-1"
                        disabled={isUncategorized}
                        onClick={e => handleTranactionUnsplit(e, categoryId, categoryAmount)}
                      >
                        <ClearIcon fontSize="small" color={isUncategorized ? 'disabled' : 'error'} />
                      </IconButton>
                      {categoryText}
                    </Grid>
                    <Grid item>
                      {categoryAmount.toLocaleString('cs-cz', {
                        style: 'currency',
                        currency: 'CZK'
                      })}
                    </Grid>
                  </Grid>
                </div>
              );
            })}
        </div>
      )}
      <Divider />
      <Form>
        <FormGroup className="text-right">
          <Button
            name="submitNewSplit"
            color={validForSubmit ? 'primary' : 'secondary'}
            className="mt-2"
            style={{ width: 80 }}
            size="sm"
            //onClick={e => handleTransactionSplit(e)}
            disabled={!validForSubmit}
          >
            Save
          </Button>
        </FormGroup>
      </Form>
    </div>
  );
};

CategorySplitForm.propTypes = {};

export default CategorySplitForm;
