import React from 'react';
import { Grid } from '@material-ui/core';
import { Button, Form, FormGroup, Input } from 'reactstrap';
import { CategoryModalFormProps } from './types';

const SingleCategoryForm: React.FunctionComponent<CategoryModalFormProps> = props => {
  const { transactionCategories, transactionCategoryInfo, handleFormCategoryInfoUpdate, transactionValue } = props;
  const UNSELECTED = 'UNSELECTED';
  const SELECT_PLACEHOLDER = '-- select a category --';
  const selectedCategoryDefault =
    Object.keys(transactionCategoryInfo).length === 1 ? Object.keys(transactionCategoryInfo)[0] : UNSELECTED;
  const [selectedCategory, selectCategory] = React.useState<string>(selectedCategoryDefault);

  const invalidForNewCategorySubmit = selectedCategory === selectedCategoryDefault || selectedCategory === UNSELECTED;

  const handleSelectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    selectCategory(event.target.value);
  };

  return (
    <div>
      <Form>
        <FormGroup>
          <div style={{ flexGrow: 1 }}>
            <Grid container direction="row" justify="space-between" alignItems="center">
              <Grid item>
                <Input
                  type="select"
                  name="categorySelect"
                  id="categorySelect"
                  onChange={e => handleSelectChange(e)}
                  onClick={e => {
                    e.stopPropagation();
                  }}
                  value={selectedCategory}
                  bsSize="sm"
                  style={{ width: 220 }}
                >
                  <option disabled value={UNSELECTED}>
                    {SELECT_PLACEHOLDER}
                  </option>
                  {Object.values(transactionCategories).map(c => (
                    <option key={c.id} value={c.id}>
                      {c.text}
                    </option>
                  ))}
                </Input>
              </Grid>
              <Grid item>
                <Button
                  color={invalidForNewCategorySubmit ? 'secondary' : 'primary'}
                  type="submit"
                  disabled={invalidForNewCategorySubmit}
                  size="sm"
                  onClick={e => {
                    e.preventDefault();
                    handleFormCategoryInfoUpdate({ [selectedCategory]: transactionValue.amount });
                  }}
                  style={{ width: 80 }}
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </div>
        </FormGroup>
      </Form>
    </div>
  );
};

SingleCategoryForm.propTypes = {};

export default SingleCategoryForm;
