
export const SET_HELP_OPEN = 'SET_HELP_OPEN';
export const SET_HELP_ACTIVITY = 'SET_HELP_ACTIVITY';


export const setHelpOpen = (value) => (dispatch, getState) => {
    dispatch({
        type: SET_HELP_OPEN,
        payload: value,
    });
};

export const setHelpActivity = (value) => (dispatch, getState) => {
    dispatch({
        type: SET_HELP_ACTIVITY,
        payload: value,
    });
};