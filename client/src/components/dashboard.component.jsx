import React from 'react';
import { useDispatch, connect } from "react-redux";

import { logoutUser } from '../redux/reducers/auth.redux';

const Dashboard = ({ currentUser }) => {
    let dispatch = useDispatch();

    const onLogout = event => {
        event.preventDefault();

        logoutUser()(dispatch);
    }

    return (
        <div style={{ height: "75vh" }} className="container valign-wrapper">
            <div className="row">
                <div className="col s12 center-align">
                    <h4>
                        <b>Hey there,</b> {currentUser.name.split(" ")[0]}
                        <p className="flow-text grey-text text-darken-1">
                            You are logged into a full-stack{" "}
                            <span style={{ fontFamily: "monospace" }}>MERN</span> app 👏
                </p>
                    </h4>
                    <button
                        style={{
                            width: "150px",
                            borderRadius: "3px",
                            letterSpacing: "1.5px",
                            marginTop: "1rem"
                        }}
                        onClick={onLogout}
                        className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                    >
                        Logout
              </button>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    currentUser: state.auth.user
});

export default connect(mapStateToProps)(Dashboard);
