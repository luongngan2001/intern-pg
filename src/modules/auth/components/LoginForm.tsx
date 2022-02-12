import React from 'react';
import { FormattedMessage } from 'react-intl';
import { ILoginParams, ILoginValidation } from '../../../models/auth';
import { validateLogin, validLogin } from '../utils';

interface Props {
  onLogin(values: ILoginParams): void;
  loading: boolean;
  errorMessage: string;
}

const LoginForm = (props: Props) => {
  const { onLogin, loading, errorMessage } = props;
  const [formValues, setFormValues] = React.useState<ILoginParams>({ email: '', password: '', rememberMe: false });
  const [validate, setValidate] = React.useState<ILoginValidation>();

  const onSubmit = React.useCallback(() => {
    const validate = validateLogin(formValues);
    setValidate(validate);
    if (!validLogin(validate)) {
      return;
    }
    onLogin(formValues);
  }, [formValues, onLogin]);

  return (
    <form
      style={{ maxWidth: '560px', width: '100%' }}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="row"
    >
      {!!errorMessage && (
        <div className="alert alert-danger" role="alert" style={{ width: '100%' }}>
          {errorMessage}
        </div>
      )}

      <div className="col-md-12">
        <label className="form-label">
          <FormattedMessage id="email" />
        </label>
        <input
          type="text"
          className="form-control"
          value={formValues.email}
          onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
        />

        {!!validate?.email && (
          <small className="text-danger">
            <FormattedMessage id={validate?.email} />
          </small>
        )}
      </div>

      <div className="col-md-12">
        <label className="form-label">
          <FormattedMessage id="password" />
        </label>
        <input
          type="password"
          className="form-control"
          value={formValues.password}
          onChange={(e) => setFormValues({ ...formValues, password: e.target.value })}
        />

        {!!validate?.password && (
          <small className="text-danger">
            <FormattedMessage id={validate?.password} />
          </small>
        )}
      </div>

      <div className="col-12" style={{ marginTop: '16px' }}>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            checked={formValues.rememberMe}
            onChange={(e) => setFormValues({ ...formValues, rememberMe: !!e.target.checked })}
          />
          <label className="form-check-label">
            <FormattedMessage id="rememberMe" />
          </label>
        </div>
      </div>

      <div className="row" style={{ margin: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button
            className="btn btn-primary"
            type="submit"
            style={{ minWidth: '160px' }}
            disabled={loading}
          >
            {loading && <div className="spinner-border spinner-border-sm text-light mr-2" role="status" />}
            <FormattedMessage id="login" />
          </button>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
