import React from "react";
import { FormattedMessage } from 'react-intl';
import { ISignUpParams, IGenderParams, ILocationParams } from '../../../models/auth';
import { validateSignUp, validSignUp } from '../utils';

interface Props {
    onSignUp(values: ISignUpParams): void;
    loading: boolean;
    errorMessage: string;
    locations: Array<ILocationParams>;
    states: Array<ILocationParams>;
    getStates(pid: string): void;
}

const SignUpForm = (props: Props) => {
    const { onSignUp, loading, errorMessage, locations, states, getStates } = props;
    const [formValues, setFormValues] = React.useState<ISignUpParams>({
        email: '',
        password: '',
        repeatPassword: '',
        name: '',
        gender: '',
        region: '',
        state: ''
    });
    const GENDER = [
        {
            label: 'Nam',
            value: 'male',
        },
        {
            label: 'Nữ',
            value: 'female'
        }
    ];
    const [validate, setValidate] = React.useState<ISignUpParams>();

    const onSubmit = React.useCallback(() => {
        console.log(formValues);
        const validate = validateSignUp(formValues);
        setValidate(validate);
        if (!validSignUp(validate)) {
            return;
        }

        onSignUp(formValues);
    }, [formValues, onSignUp]);

    const renderGender = () => {
        const arrGender: JSX.Element[] = [
            <option disabled selected value='' key=''>
                -- select an option --
            </option>,
        ];
        GENDER.map((g: IGenderParams, index: number) => {
            arrGender.push(
                <option value={g.value} key={index}>
                    {g.label}
                </option>
            );
        });
        return arrGender;
    };

    const renderRegion = () => {
        const arrRegion: JSX.Element[] = [
            <option disabled selected value='' key=''>
                -- select an option --
            </option>
        ]
        locations.map((location: ILocationParams, index: number) => {
            arrRegion.push(
                <option value={location.id} key={index}>
                    {location.name}
                </option>
            );
        });
        return arrRegion;
    };

    const renderState = () => {
        const arrState: JSX.Element[] = [
            <option disabled selected value='' key=''>
                -- select an option --
            </option>
        ]
        states.map((location: ILocationParams, index: number) => {
            arrState.push(
                <option value={location.id} key={index}>
                    {location.name}
                </option>
            );
        });
        return arrState;
    };

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

            <div className="col-md-12">
                <label className="form-label">
                    <FormattedMessage id="repeatPassword" />
                </label>
                <input
                    type="password"
                    className="form-control"
                    value={formValues.repeatPassword}
                    onChange={(e) => setFormValues({ ...formValues, repeatPassword: e.target.value })}
                />

                {!!validate?.repeatPassword && (
                    <small className="text-danger">
                        <FormattedMessage id={validate?.repeatPassword} />
                    </small>
                )}
            </div>

            <div className="col-md-12">
                <label className="form-label">
                    <FormattedMessage id="name" />
                </label>
                <input
                    type="text"
                    className="form-control"
                    value={formValues.name}
                    onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
                />

                {!!validate?.name && (
                    <small className="text-danger">
                        <FormattedMessage id={validate?.name} />
                    </small>
                )}
            </div>


            <div className="col-md-12">
                <label className="form-label">
                    <FormattedMessage id="gender" />
                </label>
                <select
                    className="form-select"
                    value={formValues.gender}
                    onChange={(e) => setFormValues({ ...formValues, gender: e.target.value })}
                >
                    {renderGender()}
                </select>

                {!!validate?.gender && (
                    <small className="text-danger">
                        <FormattedMessage id={validate?.gender} />
                    </small>
                )}
            </div>

            <div className="col-md-12">
                <label className="form-label">
                    <FormattedMessage id="region" />
                </label>
                <select
                    className="form-select"
                    value={formValues.region}
                    onChange={(e) => {
                        setFormValues({ ...formValues, region: e.target.value })
                        getStates(e.target.value)
                    }}
                >
                    {renderRegion()}
                </select>

                {!!validate?.region && (
                    <small className="text-danger">
                        <FormattedMessage id={validate?.region} />
                    </small>
                )}
            </div>

            {formValues.region ? (
                <div className="col-md-12">
                    <label className="form-label">
                        <FormattedMessage id="state" />
                    </label>
                    <select
                        className="form-select"
                        value={formValues.state}
                        onChange={(e) => setFormValues({ ...formValues, state: e.target.value })}
                    >
                        {renderState()}
                    </select>

                    {!!validate?.state && (
                        <small className="text-danger">
                            <FormattedMessage id={validate?.state} />
                        </small>
                    )}
                </div>
            ) : null}


            <div className="row" style={{ margin: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button
                        className="btn btn-primary"
                        type="submit"
                        style={{ minWidth: '160px' }}
                        disabled={loading}
                    >
                        {loading && <div className="spinner-border spinner-border-sm text-light mr-2" role="status" />}
                        <FormattedMessage id="register" />
                    </button>
                </div>
            </div>
        </form>
    );
}

export default SignUpForm;