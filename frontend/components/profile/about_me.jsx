import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchUser } from "../../actions/user_actions";

const AboutMe = props => {
    const {usersId, currentUserId, fetchUser} = props;

    const [state, setState] = useState({
        aboutMe: "",
        previousAboutMe: "",
        editing: false
    });

    useEffect(() => {
        fetchUser(usersId).then(data => {
            setState({
                ...state,
                aboutMe: data.user.about_me
            });
        });
    }, []);

    const handleUpdate = field => (
        e => setState({
            ...state,
            [field]: e.currentTarget.value
        })
    );
    
    const handleSubmit = () => {
        (state.editing) ? (setState({...state, editing: false})) : (setState({...state, editing: true}));
    };

    const handleCancelSubmit = () => {
        setState({
            ...state,
            aboutMe: state.previousAboutMe,
            editing: false
        });
    };

    const handleSaveSubmit = () => {
        $.ajax({
            url: `api/users/${currentUserId}`,
            method: "PATCH",
            data: {
                "user[about_me]" : state.aboutMe,
                editing: false
            }
        });
    };

    return(
        <div className="about-me">
            <div>
                <h1>Intro</h1>
                <div>
                    <h2>{state.aboutMe}</h2>
                    {(state.editing) ?
                        (<div className="biomodal">
                            <textarea
                                placeholder="Describe who you are"
                                onChange={handleUpdate('aboutMe')}
                                value={state.aboutMe}
                            >
                            </textarea>
                            <div>
                                <div onClick={handleCancelSubmit}>Cancel</div>
                                <div onClick={handleSaveSubmit}>Save</div>
                            </div>
                        </div>) :
                    null}
                    {(currentUserId === usersId) ? 
                    (<button 
                        className="about-me-button"
                        onClick={handleSubmit}
                    >
                    </button>):
                    null}
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state, ownProps) => {
    const usersId = parseInt(ownProps.location.pathname.split("/")[2]);
    return({
        usersId,
        currentUserId: state.session.id
    });
};

const mapDispatchToProps = dispatch => ({
    fetchUser: userId => dispatch(fetchUser(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(AboutMe);