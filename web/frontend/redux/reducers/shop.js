const defaultState = {
  loaded: false,
  showPlans: false,
  data: {},
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'GET_SHOP':
      return { ...state, loaded: true, data: action.data };
    case 'SET_SHOP_KEY':
      return { ...state, [action.key]: action.data };
    default:
      return state;
  }
};

export default reducer;
