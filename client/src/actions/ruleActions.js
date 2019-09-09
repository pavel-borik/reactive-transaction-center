import axios from 'axios';
import {
  GET_RULES,
  TOGGLE_RULE_MODAL,
  RULE_ADD,
  RULE_EDIT,
  RULE_SUBMIT_CREATE,
  RULE_SUBMIT_UPDATE,
  RULES_DELETE
} from './types';
import { API_CONN_TRANSACTIONS } from '../utils/connection';
import setDataLoading from './dataLoading';

export const getRules = () => async dispatch => {
  dispatch(setDataLoading());
  try {
    const response = await axios.get(`${API_CONN_TRANSACTIONS}/rules`);
    dispatch({
      type: GET_RULES,
      payload: response
    });
  } catch (error) {
    console.error(error);
  }
};

export const handleRuleAdd = () => {
  return {
    type: RULE_ADD
  };
};

export const handleRuleEdit = ruleId => dispatch => {
  console.log(ruleId);
  dispatch({
    type: RULE_EDIT,
    payload: ruleId
  });
};

export const handleRuleSubmitCreate = newRule => async dispatch => {
  try {
    const response = await axios.post(`${API_CONN_TRANSACTIONS}/rules`, newRule);
    const savedRule = await axios.get(`${API_CONN_TRANSACTIONS}${response.headers.location}`);
    dispatch({
      type: RULE_SUBMIT_CREATE,
      payload: savedRule.data
    });
  } catch (error) {
    console.error(error);
  }
};

export const handleRuleSubmitUpdate = editedRule => dispatch => {
  axios({
    method: 'put',
    url: `${API_CONN_TRANSACTIONS}/rules`,
    data: editedRule
  })
    .then(response => {
      console.log(response);
      dispatch({
        type: RULE_SUBMIT_UPDATE,
        payload: response.data
      });
    })
    .catch(error => {
      console.log(error);
    });
};

export const handleRulesDelete = ruleIds => async dispatch => {
  try {
    const res = await axios.post(`${API_CONN_TRANSACTIONS}/rules/delete`, { ids: ruleIds });
    if (res.status >= 200 && res.status < 300) {
      dispatch({
        type: RULES_DELETE,
        payload: ruleIds
      });
    }
  } catch (error) {
    console.error(error);
  }
};

export const toggleModal = () => {
  return {
    type: TOGGLE_RULE_MODAL
  };
};
