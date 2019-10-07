import axios from 'axios';
import { SET_STATISTICS_FILTER, GET_CATEGORYINFO_DATA } from './types';
import setDataLoading from './dataLoading';
import { API_CONN_TRANSACTIONS } from '../utils/connection';
import { Dispatch } from 'redux';
import { TransactionDirections } from '../constants/transactions';

export const setStatisticsFilter = (filterId: any, filterType: any) => {
  return {
    type: SET_STATISTICS_FILTER,
    payload: { filterId, filterType }
  };
};

export const getCategoryInfoData = () => async (dispatch: Dispatch) => {
  dispatch(setDataLoading());
  try {
    const response = await axios.all([
      getCategoryInfoDataByDirection(TransactionDirections.INCOMING.id),
      getCategoryInfoDataByDirection(TransactionDirections.OUTGOING.id)
    ]);
    dispatch({
      type: GET_CATEGORYINFO_DATA,
      payload: { categoryInfoIncoming: response[0].data, categoryInfoOutgoing: response[1].data }
    });
  } catch (error) {
    console.error(error);
  }
};

const getCategoryInfoDataByDirection = (direction: string) => {
  return axios.get(`${API_CONN_TRANSACTIONS}/transactionsstatistics`, {
    params: {
      direction: direction
    }
  });
};
