import { GET_BANK_ACCOUNTS, DATA_LOADING } from '../actions/types';

const initialState = {
  bankAccounts: [],
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_BANK_ACCOUNTS: {
      return {
        ...state,
        bankAccounts: action.payload.data,
        loading: false
      };
    }
    case DATA_LOADING: {
      return {
        ...state,
        loading: true
      };
    }
    default:
      return state;
  }
};
