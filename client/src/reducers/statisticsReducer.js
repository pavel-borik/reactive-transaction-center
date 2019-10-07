import { SET_STATISTICS_FILTER, GET_CATEGORYINFO_DATA } from '../actions/types';
import {
  FILTER_TIME_PERIOD,
  FILTER_DIRECTION,
  TimePeriodFilters,
  DirectionFilters
} from '../constants/transactionListFilters';

const initialState = {
  totalIncoming: 0,
  totalOutgoing: 0,
  categoryInfoIncoming: [],
  categoryInfoOutgoing: [],
  filters: {
    [FILTER_TIME_PERIOD.id]: TimePeriodFilters.ALL_TIME.id,
    [FILTER_DIRECTION.id]: DirectionFilters.ALL.id
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_STATISTICS_FILTER: {
      return {
        ...state,
        filters: {
          ...state.filters,
          [action.payload.filterType]: action.payload.filterId
        }
      };
    }
    case GET_CATEGORYINFO_DATA: {
      return {
        ...state,
        totalIncoming: action.payload.categoryInfoIncoming.total,
        totalOutgoing: action.payload.categoryInfoOutgoing.total,
        categoryInfoIncoming: action.payload.categoryInfoIncoming.aggregation,
        categoryInfoOutgoing: action.payload.categoryInfoOutgoing.aggregation
      };
    }
    default:
      return state;
  }
}
