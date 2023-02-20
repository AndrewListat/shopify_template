/* eslint-disable consistent-return */
/* eslint-disable no-console */
import fetchCustom from '../lib/fetch';


export function getShop() {
  return async (dispatch) => {
    try {
      const data = await fetchCustom('/api/shop');
      const widget = await fetchCustom('/api/widget');
      dispatch({ type: 'GET_SHOP', data: data });
      dispatch({ type: 'GET_WIDGET', data: widget });
      return data;
    } catch (error) {
      console.log('🚀 ~ file: actions.js ~ line 26 ~ getShop ~ error', error);
      // TODO: process error
    }
  };
}


export function enableShop() {
  return (dispatch) => {
    return fetchCustom('/shops/enable', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    })
      .then((resp) => resp.json())
      .then(() => {
        dispatch({ type: 'SET_IS_ACTIVE', data: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function disableShop() {
  return (dispatch) => {
    return fetchCustom('/shops/disable', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    })
      .then((resp) => resp.json())
      .then(() => {
        dispatch({ type: 'SET_IS_ACTIVE', data: false });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
