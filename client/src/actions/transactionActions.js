import axios from 'axios';
import {
  GET_TRANSACTIONS,
  SET_FILTER,
  UPDATE_TRANSACTION_CATEGORY,
  SPLIT_TRANSACTION,
  UNSPLIT_TRANSACTION
} from './types';
import { API_CONN_TRANSACTIONS } from '../utils/connection';
import setDataLoading from './dataLoading';

export const getTransacations = () => async (dispatch, getState) => {
  dispatch(setDataLoading());
  try {
    const response = await axios.get(`${API_CONN_TRANSACTIONS}/transactions`);
    dispatch({
      type: GET_TRANSACTIONS,
      payload: response
    });
  } catch (error) {
    console.error(error);
  }
};

export const setTransactionFilter = (filterId, filterType) => {
  return {
    type: SET_FILTER,
    payload: { filterId, filterType }
  };
};

export const handleTransactionCategoryUpdate = (transactionId, newCategoryId) => dispatch => {
  axios({
    method: 'put',
    url: `${API_CONN_TRANSACTIONS}/transactions/update`,
    data: { id: transactionId, categoryId: newCategoryId }
  })
    .then(response => {
      console.log(response);
      dispatch({
        type: UPDATE_TRANSACTION_CATEGORY,
        payload: {
          transactionId,
          newCategoryId
        }
      });
    })
    .catch(error => {
      console.log(error);
    });
};
export const handleTransactionSplit = transactionSplitDto => dispatch => {
  axios({
    method: 'post',
    url: `${API_CONN_TRANSACTIONS}/transactions/split`,
    data: transactionSplitDto
  })
    .then(response => {
      console.log(response);
      dispatch({
        type: SPLIT_TRANSACTION,
        payload: response.data
      });
    })
    .catch(error => {
      console.log(error);
    });
};

export const handleTransactionUnsplit = (parentTransactionId, childTransactionId) => dispatch => {
  axios({
    method: 'post',
    url: `${API_CONN_TRANSACTIONS}/transactions/removeSplit`,
    data: { id: childTransactionId }
  })
    .then(response => {
      console.log(response);
      dispatch({
        type: UNSPLIT_TRANSACTION,
        payload: {
          parentTransactionId,
          childTransactionId,
          data: response.data
        }
      });
    })
    .catch(error => {
      console.log(error);
    });
};
