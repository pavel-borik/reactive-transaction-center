import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Spinner } from 'reactstrap';
import { bindActionCreators } from 'redux';
import { computeTransactionSumsPerCategoryByDirection, sumTransactions } from '../../selectors/statisticsSelector';
import { TransactionDirections } from '../../constants/transactions';
import CategoryOverviewArea from '../../components/statistics-dashboard/chart-section/CategoryOverviewArea';
import { setStatisticsFilter, getCategoryInfoData } from '../../actions/statisticsActions.ts';

class CategoryOverviewAreaContainer extends Component {
  componentDidMount() {
    this.props.getCategoryInfoData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.filters.FILTER_TIME_PERIOD !== this.props.filters.FILTER_TIME_PERIOD) {
      this.props.getCategoryInfoData();
    }
  }

  render() {
    return !this.props.isLoading ? (
      <CategoryOverviewArea {...this.props} />
    ) : (
      <div className="text-center">
        <Spinner type="grow" color="primary" />
      </div>
    );
  }
}

CategoryOverviewAreaContainer.propTypes = {
  chartData: PropTypes.array
};

const makeMapStateToProps = () => {
  const computePieChart = computeTransactionSumsPerCategoryByDirection();
  const sum = sumTransactions();
  const mapStateToProps = state => ({
    //incomeChartData: computePieChart(state, TransactionDirections.INCOMING.id),
    //expensesChartData: computePieChart(state, TransactionDirections.OUTGOING.id),
    incomeSum: state.statistics.totalIncoming,
    expensesSum: state.statistics.totalOutgoing,
    isLoading: state.transactions.loading,
    filters: state.statistics.filters,
    categoryInfoIncoming: state.statistics.categoryInfoIncoming,
    categoryInfoOutgoing: state.statistics.categoryInfoOutgoing
  });
  return mapStateToProps;
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators(
    {
      handleFilterChange: (filterId, filterType) => dispatch(setStatisticsFilter(filterId, filterType)),
      getCategoryInfoData
    },
    dispatch
  );
};

export default connect(
  makeMapStateToProps,
  mapDispatchToProps
)(CategoryOverviewAreaContainer);
