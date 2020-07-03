import axios from 'axios';
import isEmpty from 'is-empty';
import setAuthToken from '../../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import { FETCHING_USER, SET_CURRENT_USER, GET_ERRORS } from './types';
import { getBaseUrl } from '../../utils/constants';

const initialState = {
    isAuthenticated: false,
    user: {},
    isFetching: false,
};

export const authActions = {
    register: (userInfo, history) => (dispatch) => {
        const url = `${getBaseUrl()}/user/register`;
        axios
            .post(url, userInfo)
            .then((res) => history.push('/login'))
            .catch((error) => {
                dispatch({ type: GET_ERRORS, payload: error.response.data });
            });
    },

    login: (userInfo) => (dispatch) => {
        const url = `${getBaseUrl()}/user/login`;

        axios
            .post(url, userInfo)
            .then((res) => {
                const { token } = res.data;
                localStorage.setItem('jwtToken', token);

                setAuthToken();
                const decoded = jwt_decode(token);
                dispatch(setCurrentUser(decoded));
            })
            .catch((error) => {
                dispatch({ type: GET_ERRORS, payload: error.response.data });
            });
    },
};

export const setCurrentUser = (decoded) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded,
    };
};

export const fetchingUser = () => {
    return {
        type: FETCHING_USER,
    };
};

export const logoutUser = () => (dispatch) => {
    // Remove token from local storage
    localStorage.removeItem('jwtToken');
    // Remove auth header for future requests
    setAuthToken(false);
    // Set current user to empty object {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
};

export default function auth(state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload,
                isFetching: false,
            };
        case FETCHING_USER:
            return {
                ...state,
                isFetching: true,
            };
        default:
            return state;
    }
}
