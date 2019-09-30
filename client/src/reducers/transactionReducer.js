import moment from 'moment';
import {
  GET_TRANSACTIONS,
  DATA_LOADING,
  SET_FILTER,
  UPDATE_TRANSACTION_CATEGORY_INFO,
  SPLIT_TRANSACTION,
  UNSPLIT_TRANSACTION
} from '../actions/types';
import {
  FILTER_TIME_PERIOD,
  FILTER_DIRECTION,
  TimePeriodFilters,
  DirectionFilters
} from '../constants/transactionListFilters';

const initialState = {
  transactions: [],
  filters: {
    [FILTER_TIME_PERIOD.id]: TimePeriodFilters.ALL_TIME.id,
    [FILTER_DIRECTION.id]: DirectionFilters.ALL.id
  },

  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TRANSACTIONS: {
      return {
        ...state,
        transactions: action.payload.data.sort((t1, t2) => moment(t2.valueDate).diff(t1.valueDate)),
        loading: false
      };
    }
    case DATA_LOADING: {
      return {
        ...state,
        loading: true
      };
    }
    case SET_FILTER: {
      return {
        ...state,
        filters: {
          ...state.filters,
          [action.payload.filterType]: action.payload.filterId
        }
      };
    }
    case UPDATE_TRANSACTION_CATEGORY_INFO: {
      return {
        ...state,
        transactions: state.transactions.map(t => {
          if (t.id === action.payload.transactionId) {
            t.transactionCategoryInfo = action.payload.transactionCategoryInfo;
            return t;
          }
          return t;
        })
      };
    }
    case SPLIT_TRANSACTION: {
      return {
        ...state,
        transactions: state.transactions.map(t => {
          if (t.id === action.payload.id) {
            return {
              ...t,
              childTransactionsList: action.payload.childTransactionsList,
              originalValue: action.payload.originalValue,
              transactionValueAmount: action.payload.transactionValueAmount
            };
          }
          return t;
        })
      };
    }
    case UNSPLIT_TRANSACTION: {
      return {
        ...state,
        transactions: state.transactions.map(t => {
          if (t.id === action.payload.parentTransactionId) {
            return {
              ...t,
              childTransactionsList: action.payload.data.childTransactionsList,
              originalValue: action.payload.data.originalValue,
              transactionValueAmount: action.payload.data.transactionValueAmount
            };
          }
          return t;
        })
      };
    }
    default:
      return state;
  }
};
