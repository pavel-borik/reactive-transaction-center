import React, { Fragment } from 'react';
import { Grid } from '@material-ui/core';
import CustomPieChart from './CustomPieChart';
import StatisticsFilterArea from '../filters/StatisticsFilterArea';
import { TransactionDirections } from '../../../constants/transactions';

const CategoryOverviewArea = props => {
  const {
    incomeChartData,
    expensesChartData,
    incomeSum,
    expensesSum,
    isLoading,
    filters,
    handleFilterChange,
    categoryInfoIncoming,
    categoryInfoOutgoing
  } = props;
  return (
    <>
      <Grid container direction="column" alignItems="center" justify="center">
        <h3>Category overview</h3>
        <Grid item xs={12} style={{ minWidth: 200 }}>
          <StatisticsFilterArea filters={filters} handleFilterChange={handleFilterChange} />
        </Grid>
      </Grid>
      <Grid container direction="row" justify="space-between" className="mt-4">
        <Grid item lg={6} xs={12} className={isLoading ? 'text-center' : ''}>
          {incomeChartData.length > 0 ? (
            <div className="text-center">
              <h4>
                Incomes total:&nbsp;
                {incomeSum.toLocaleString('cs-cz', {
                  style: 'currency',
                  currency: 'CZK'
                })}
              </h4>
              <CustomPieChart
                chartData={categoryInfoIncoming}
                direction={TransactionDirections.INCOMING.id}
                sum={incomeSum}
              />
            </div>
          ) : (
            <div className="text-center">
              <h4>There is no data for this filter option.</h4>
            </div>
          )}
        </Grid>
        <Grid item lg={6} xs={12} className={isLoading ? 'text-center' : ''}>
          {expensesChartData.length > 0 ? (
            <div className="text-center">
              <h4>
                Expenses total:&nbsp;
                {expensesSum.toLocaleString('cs-cz', {
                  style: 'currency',
                  currency: 'CZK'
                })}
              </h4>
              <CustomPieChart
                chartData={categoryInfoOutgoing}
                direction={TransactionDirections.OUTGOING.id}
                sum={expensesSum}
              />
            </div>
          ) : (
            <div className="text-center">
              <h4>There is no data for this filter option.</h4>
            </div>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default CategoryOverviewArea;
