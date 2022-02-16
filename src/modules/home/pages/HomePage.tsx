import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch} from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../redux/reducer';
import { Action } from 'redux';
import { logout } from '../../auth/redux/authReducer';
import { replace } from 'connected-react-router';
import Cookies from 'js-cookie';
import { ACCESS_TOKEN_KEY } from '../../../utils/constants';
import { ROUTES } from '../../../configs/routes';

interface Props { }

const HomePage = (props: Props) => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

  const handleLogout = () => {
    Cookies.remove(ACCESS_TOKEN_KEY);
    dispatch(logout());
    dispatch(replace(ROUTES.login));
  }
  return (
    <div className='container mt-5'>
      <div style={{display: 'flex', justifyContent: "right"}}>
        <button className='btn btn-primary' onClick={handleLogout}> 
          <FormattedMessage id='logout' />
        </button>
      </div>
      <div>HomePage</div>
      <ul>
        <li><a href='/list'>List</a></li>
        <li><a href='/user-detail'>UserDetail</a></li>
      </ul>
    </div>
  );
};

export default HomePage;
