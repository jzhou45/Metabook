import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchUser } from "../../actions/user_actions";
import Loading from "../loading/loading";

const AboutMe = props => {
    const {usersId, currentUserId, fetchUser} = props;

    const [state, setState] = useState({
        aboutMe: "",
        previousAboutMe: "",
        editing: false,
        id: 0
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUser(usersId).then(data => {
            setState({
                ...state,
                aboutMe: data.user.about_me,
                previousAboutMe: data.user.about_me,
                id: usersId
            });
        }).then(() => setLoading(false));
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
            }
        });
        setState({
            ...state,
            editing: false
        });
    };

    const content = () => (
        <div className="about-me">
            <div>
                <h1>Intro</h1>
                <div>
                    {(state.editing) ?
                        (<div className="biomodal">
                            <textarea
                                placeholder="Describe who you are"
                                onChange={handleUpdate('aboutMe')}
                                value={state.aboutMe}
                            >
                            </textarea>
                            <div>
                                <button onClick={handleCancelSubmit}>Cancel</button>
                                <button onClick={handleSaveSubmit}>Save</button>
                            </div>
                        </div>) :
                        (<h2>{state.aboutMe}</h2>)}
                    {(currentUserId === usersId && !state.editing) ? 
                    (<button 
                        className="about-me-button"
                        onClick={handleSubmit}
                    >
                        {(state.previousAboutMe.length === 0) ? "Add bio" : "Edit bio"}
                    </button>):
                    null}
                </div>
            </div>
        </div>
    );

    return loading ? <Loading/> : content();
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