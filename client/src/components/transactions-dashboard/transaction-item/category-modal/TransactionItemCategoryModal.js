import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Backdrop, FormControl, FormControlLabel, RadioGroup, Radio, Typography } from '@material-ui/core';
import Fade from '@material-ui/core/Fade';
import SingleCategoryForm from './SingleCategoryForm.tsx';
import CategorySplitForm from './CategorySplitForm.tsx';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    minWidth: '200px',
    minHeight: '150px',
    padding: theme.spacing(2, 4, 3)
  }
}));

const TransactionItemCategoryModal = props => {
  const FORM_CATEGORY_SINGLE = 'categSingle';
  const FORM_CATEGORY_SPLIT = 'categSplit';
  const classes = useStyles();
  const { transactionCategories, transactionCategoryInfo, transactionValue, open, handleModalClose } = props;
  const defaultMode = Object.keys(transactionCategoryInfo).length > 1 ? FORM_CATEGORY_SPLIT : FORM_CATEGORY_SINGLE;
  const [rgValue, setRgValue] = React.useState(defaultMode);

  const handleRgChange = event => {
    setRgValue(event.target.value);
  };

  return (
    <div>
      <Modal
        className={classes.modal}
        open={open}
        onClose={handleModalClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <Typography variant="h5">Category edit</Typography>
            <FormControl component="fieldset" className={classes.formControl}>
              <RadioGroup name="categSettingGroup" value={rgValue} onChange={handleRgChange}>
                <div style={{ display: 'inlineBlock' }}>
                  <FormControlLabel value="categSingle" control={<Radio />} label="Single category" />
                  <FormControlLabel value="categSplit" control={<Radio />} label="Category split" />
                </div>
                <div>
                  {rgValue === FORM_CATEGORY_SINGLE && (
                    <SingleCategoryForm
                      transactionCategories={transactionCategories}
                      transactionCategoryInfo={transactionCategoryInfo}
                    />
                  )}
                  {rgValue === FORM_CATEGORY_SPLIT && transactionCategoryInfo && (
                    <CategorySplitForm
                      transactionCategories={transactionCategories}
                      transactionCategoryInfo={transactionCategoryInfo}
                      transactionValue={transactionValue}
                    />
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
