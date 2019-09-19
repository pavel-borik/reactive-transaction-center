import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Modal,
  Backdrop,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
  Typography,
  IconButton,
  Grid
} from '@material-ui/core';
import Fade from '@material-ui/core/Fade';
import ClearIcon from '@material-ui/icons/Clear';
import { Button, Form, FormGroup, Col, Row, Input, Badge } from 'reactstrap';

import { TransactionCategoriesLookup, TransactionCategories } from '../../../constants/categories';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

const TransactionItemCategoryModal = props => {
  const FORM_CATEGORY_SINGLE = 'categSingle';
  const FORM_CATEGORY_SPLIT = 'categSplit';
  const [rgValue, setRgValue] = React.useState(FORM_CATEGORY_SINGLE);

  const { transactionCategoryInfo } = props;
  const classes = useStyles();

  const handleRgChange = event => {
    setRgValue(event.target.value);
  };

  return (
    <div>
      <Modal
        className={classes.modal}
        open={props.open}
        onClose={props.handleModalClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={props.open}>
          <div className={classes.paper}>
            <h2>Category edit</h2>
            <FormControl component="fieldset" className={classes.formControl}>
              <RadioGroup name="categSettingGroup" value={rgValue} onChange={handleRgChange}>
                <div style={{ display: 'inlineBlock' }}>
                  <FormControlLabel value="categSingle" control={<Radio />} label="Single category" />
                  <FormControlLabel value="categSplit" control={<Radio />} label="Category split" />
                </div>
                <div>
                  {rgValue === FORM_CATEGORY_SPLIT &&
                    transactionCategoryInfo &&
                    Object.entries(transactionCategoryInfo).length > 0 && (
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

                  {rgValue === FORM_CATEGORY_SINGLE && (
                    <Form>
                      <FormGroup>
                        <div style={{ flexGrow: 1 }}>
                          <Grid container direction="row" justify="space-between" alignItems="center">
                            <Grid item>
                              <Input
                                type="select"
                                name="categorySelect"
                                id="categorySelect"
                                // onChange={e => this.handleCategoryChange(e)}
                                onClick={e => {
                                  e.stopPropagation();
                                }}
                                disabled={false}
                                // value={this.state.categoryId}
                                bsSize="sm"
                                style={{ width: 220 }}
                              >
                                <option disabled value={'UNSELECTED'}>
                                  -- select a category --
                                </option>
                                {/* {Object.values(transactionCategories).map(c => (
                          <option key={c.id} value={c.id}>
                            {c.text}
                          </option>
                        ))} */}
                              </Input>
                            </Grid>
                            <Grid item>
                              <Button
                                // color={invalidForNewCategorySubmit ? 'secondary' : 'primary'}
                                type="submit"
                                // disabled={invalidForNewCategorySubmit}
                                size="sm"
                                // onClick={this.handleTransactionCategoryUpdate}
                                style={{ width: 80 }}
                              >
                                Save
                              </Button>
                            </Grid>
                          </Grid>
                        </div>
                      </FormGroup>
                    </Form>
                  )}
                </div>
              </RadioGroup>
            </FormControl>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default TransactionItemCategoryModal;
