import React, { lazy, Suspense } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { ROUTES } from './configs/routes';
import ProtectedRoute from './modules/common/components/ProtectedRoute';
import { ACCESS_TOKEN_KEY } from './utils/constants';

const HomePage = lazy(() => import('./modules/home/pages/HomePage'));
const ContactPage = lazy(() => import('./modules/home/pages/ContactPage'));
const LoginPage = lazy(() => import('./modules/auth/pages/LoginPage'));
const SignUpPage = lazy(() => import('./modules/auth/pages/SignUpPage'));
const ListPage = lazy(() => import('./modules/list/pages/ListPage'));
const UserDetailPage = lazy(() => import('./modules/user/pages/UserDetailPage'));
const TablePage = lazy(() => import('./modules/table/pages/PayrollPage'));

interface Props {}

export const Routes = (props: Props) => {
  const location = useLocation();

  return (
    <Suspense fallback={<div>Loading.....</div>}>
      <Switch location={location}>
        <Route path={ROUTES.login} component={LoginPage} />
        <Route path={ROUTES.signUp} component={SignUpPage} />
        <ProtectedRoute path={ROUTES.home} component={HomePage} />
        <Route path={ROUTES.contact} component={ContactPage} />
        <Route path={ROUTES.list} component={ListPage} />
        <Route path={ROUTES.userDetail} component={UserDetailPage} />
        <Route path={ROUTES.table} component={TablePage} />

        {document.cookie.indexOf(ACCESS_TOKEN_KEY) ?
          <Route path="/" component={LoginPage} /> :
          <Route path="/" component={HomePage} />
        }
      </Switch>
    </Suspense>
  );
};
