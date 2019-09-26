import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { TransactionCategoriesLookup } from '../../../constants/categories';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  table: {
    minWidth: 200
  }
}));

const PanelDetailSplitOveviewTable = props => {
  const { transactionCategoryInfo, value } = props;
  const classes = useStyles();
  const rows = Object.entries(transactionCategoryInfo).map(([categoryId, categoryAmount]) => {
    return {
      id: categoryId,
      ratio: `${Math.round((categoryAmount / value.amount) * 100)}%`,
      amount: categoryAmount.toLocaleString('cs-cz', {
        style: 'currency',
        currency: 'CZK'
      })
    };
  });

  return (
    <div className={classes.root}>
      <Table className={classes.table} size="small">
        <TableHead>
          <TableRow>
            <TableCell>Transaction category breakdown</TableCell>
            <TableCell align="right">Ratio</TableCell>
            <TableCell align="right">Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {TransactionCategoriesLookup.get(row.id).text}
              </TableCell>
              <TableCell align="right">{row.ratio}</TableCell>
              <TableCell align="right">{row.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PanelDetailSplitOveviewTable;
