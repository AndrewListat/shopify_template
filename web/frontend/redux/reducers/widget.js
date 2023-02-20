const defaultState = {
  loaded: false,
  isMobile: false,
  activeTab: 1,
  activePopupStep: null,
  showInstruction: false,
  data: {
    active: true,
  },
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'GET_WIDGET':
      return {
        ...state,
        loaded: true,
        data: action.data,
        showInstruction: action.data.show_instruction,
      };
    case 'SET_KEY_WIDGET':
      return { ...state, [action.key]: action.data };
    default:
      return state;
  }
};

export default reducer;
