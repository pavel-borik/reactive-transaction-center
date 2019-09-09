import axios from 'axios';
import { GET_BANK_ACCOUNTS } from './types';
import { API_CONN_ACCOUNTS } from '../utils/connection';
import setDataLoading from './dataLoading';

const getBankAccounts = () => async (dispatch, getState) => {
  dispatch(setDataLoading());
  try {
    const response = await axios.get(`${API_CONN_ACCOUNTS}/bankAccounts`);
    dispatch({
      type: GET_BANK_ACCOUNTS,
      payload: response
    });
  } catch (error) {
    console.error(error);
  }
};

export default getBankAccounts;
