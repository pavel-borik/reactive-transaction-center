import axios from 'axios';
import { SET_STATISTICS_FILTER, GET_CATEGORYINFO_DATA } from './types';
import setDataLoading from './dataLoading';
import { API_CONN_TRANSACTIONS } from '../utils/connection';
import { Dispatch } from 'redux';
import { TransactionDirections } from '../constants/transactions';
import { TimePeriodFilters } from '../constants/transactionListFilters';
import moment from 'moment';

export const setStatisticsFilter = (filterId: any, filterType: any) => {
  return {
    type: SET_STATISTICS_FILTER,
    payload: { filterId, filterType }
  };
};

export const getCategoryInfoData = () => async (dispatch: Dispatch, getState: Function) => {
  const { statistics } = getState();
  const filterParam = createFilterParam(statistics.filters.FILTER_TIME_PERIOD);
  console.log(filterParam);
  //dispatch(setDataLoading());
  try {
    const response = await axios.all([
      getCategoryInfoDataByDirection(TransactionDirections.INCOMING.id, filterParam),
      getCategoryInfoDataByDirection(TransactionDirections.OUTGOING.id, filterParam)
    ]);
    dispatch({
      type: GET_CATEGORYINFO_DATA,
      payload: { categoryInfoIncoming: response[0].data, categoryInfoOutgoing: response[1].data }
    });
  } catch (error) {
    console.error(error);
  }
};

const getCategoryInfoDataByDirection = (direction: string, timePeriod: string) => {
  return axios.get(`${API_CONN_TRANSACTIONS}/transactions/statistics`, {
    params: {
      direction: direction,
      timePeriod: timePeriod
    }
  });
};

const createFilterParam = (activeFilter: string): string => {
  switch (activeFilter) {
    case TimePeriodFilters.ALL_TIME.id: {
      return '';
    }
    case TimePeriodFilters.LAST_WEEK.id: {
      return moment()
        .subtract(7, 'd')
        .format();
    }
    case TimePeriodFilters.LAST_MONTH.id: {
      return moment()
        .subtract(1, 'M')
        .format();
    }
    case TimePeriodFilters.LAST_SIX_MONTHS.id: {
      return moment()
        .subtract(6, 'M')
        .format();
    }
    case TimePeriodFilters.LAST_YEAR.id: {
      return moment()
        .subtract(1, 'y')
        .format();
    }
    default:
      return '';
  }
};
