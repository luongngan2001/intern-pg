import React, { useState } from "react";
import { ISignUpParams } from '../../../models/auth';
import SignUpForm from "../components/SignUpForm";
import logo from '../../../logo-420-x-108.png';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../redux/reducer';
import { Action } from 'redux';
import { fetchThunk } from '../../common/redux/thunk';
import { API_PATHS } from '../../../configs/api';
import { RESPONSE_STATUS_SUCCESS } from '../../../utils/httpResponseCode';
import { ROUTES } from '../../../configs/routes';
import { replace } from 'connected-react-router';
import { getErrorMessageResponse } from '../../../utils';
import { useEffect } from "react";
import { setUserInfo } from "../redux/authReducer";

const SignUpPage = () => {
    const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [locations, setLocations] = useState([]);
    const [states, setStates] = useState([]);

    const getLocations = React.useCallback(
        async () => {
            setLoading(true);
            const json = await dispatch(fetchThunk(API_PATHS.location, 'get'));
            setLoading(false);

            if (json?.code === RESPONSE_STATUS_SUCCESS) {
                setLocations(json.data);
                return;
            }

        },[]
    );

    const getStates = React.useCallback(
        async (pid: string) => {
            setLoading(true);
            const json = await dispatch(fetchThunk(`${API_PATHS.location}?pid=${pid}`, 'get'));
            setLoading(false);

            if (json?.code === RESPONSE_STATUS_SUCCESS) {
                console.log(json.data);
                setStates(json.data);
                return;
            }

        },[]
    );

    useEffect(() => {
        getLocations();
    }, [getLocations])

    const onSignUp = React.useCallback(
        async (values: ISignUpParams) => {
            setErrorMessage('');
            setLoading(true);

            const json = await dispatch(
                fetchThunk(API_PATHS.signUp, 'post', values)
            );

            setLoading(false);

            if (json?.code === RESPONSE_STATUS_SUCCESS) {
                dispatch(setUserInfo(json.data));
                dispatch(replace(ROUTES.login));
                return;
            }

            setErrorMessage(getErrorMessageResponse(json));
            console.log(json);
            console.log(errorMessage);
        },
        [dispatch],
    );

    return (
        <div
            className="container"
            style={{
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column'
            }}
        >
            <img src={logo} alt="" style={{ maxWidth: '250px', margin: '32px' }} />

            <SignUpForm 
                onSignUp={onSignUp} 
                loading={loading}
                errorMessage={errorMessage}
                locations={locations}
                states={states}
                getStates={getStates}
            />
        </div>
    );
}

export default SignUpPage;