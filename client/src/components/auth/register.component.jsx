import React, { useState, useEffect } from 'react';
import { useHistory, Link } from "react-router-dom";
import { useDispatch, connect } from 'react-redux';
import classnames from "classnames";

import { authActions } from '../../redux/reducers/auth.redux';

const Register = ({ auth, errors }) => {
    const [info, setInfo] = useState({ name: '', email: '', password: '', password2: '', errors: {} });

    let dispatch = useDispatch();
    let history = useHistory();

    useEffect(() => {
        if (auth.isAuthenticated) {
            history.push('/dashboard');
        }
    }, []);

    useEffect(() => {
        if (auth.isAuthenticated) {
            history.push('/dashboard');
        }

        if (errors) {
            setInfo({ ...info, errors });;
        }
    }, [auth, errors]);

    const onChange = event => {
        const { id, value } = event.target;
        setInfo({ ...info, [id]: value });
    };

    const onSubmit = event => {
        event.preventDefault();
        const newUser = {
            name: info.name,
            email: info.email,
            password: info.password,
            password2: info.password2
        };

        authActions.register(newUser, history)(dispatch);
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col s8 offset-s2">
                    <Link to="/" className="btn-flat waves-effect">
                        <i className="material-icons left">keyboard_backspace</i> Back to
                home
              </Link>
                    <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                        <h4>
                            <b>Register</b> below
                </h4>
                        <p className="grey-text text-darken-1">
                            Already have an account? <Link to="/login">Log in</Link>
                        </p>
                    </div>
                    <form noValidate onSubmit={onSubmit}>
                        <div className="input-field col s12">
                            <input
                                onChange={onChange}
                                value={info.name}
                                error={info.errors.name}
                                id="name"
                                type="text"
                                className={classnames("", {
                                    invalid: info.errors.name
                                })}
                            />
                            <label htmlFor="name">Name</label>
                            <span className="red-text">{info.errors.name}</span>
                        </div>
                        <div className="input-field col s12">
                            <input
                                onChange={onChange}
                                value={info.email}
                                error={info.errors.email}
                                id="email"
                                type="email"
                                className={classnames("", {
                                    invalid: info.errors.email
                                })}
                            />
                            <label htmlFor="email">Email</label>
                            <span className="red-text">{info.errors.email}</span>
                        </div>
                        <div className="input-field col s12">
                            <input
                                onChange={onChange}
                                value={info.password}
                                error={info.errors.password}
                                id="password"
                                type="password"
                                className={classnames("", {
                                    invalid: info.errors.password
                                })}
                            />
                            <label htmlFor="password">Password</label>
                            <span className="red-text">{info.errors.password}</span>
                        </div>
                        <div className="input-field col s12">
                            <input
                                onChange={onChange}
                                value={info.password2}
                                error={info.errors.password2}
                                id="password2"
                                type="password"
                                className={classnames("", {
                                    invalid: info.errors.password2
                                })}
                            />
                            <label htmlFor="password2">Confirm Password</label>
                            <span className="red-text">{info.errors.password2}</span>
                        </div>
                        <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                            <button
                                style={{
                                    width: "150px",
                                    borderRadius: "3px",
                                    letterSpacing: "1.5px",
                                    marginTop: "1rem"
                                }}
                                type="submit"
                                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                            >
                                Sign up
                  </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps)(Register);
