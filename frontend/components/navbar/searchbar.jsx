import React, { useState, useEffect } from "react";
import { fetchUsers } from "../../actions/user_actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const SearchBar = props => {
    const {fetchUsers} = props;

    const [state, setState] = useState({
        users: []
    });

    useEffect(() => {
        fetchUsers().then(data => {
            setState({
                ...state,
                users: Object.values(data.users)
            });
        });
    }, []);

    const [query, setQuery] = useState("");

    return (
        <div>
            <input 
                type="text" 
                className="search-bar" 
                placeholder="Metabook"
                onChange={e => setQuery(e.target.value)}
            />

            <div className="search-result">
                {(query.length > 0) ?
                    (state.users.filter(user => {
                        const userNames = `${user.first_name} ${user.last_name}`
                        if (query === ""){
                            return userNames;
                        } else if (userNames.toLowerCase().includes(query.toLowerCase())){
                            return userNames;
                        };
                    }).map((user, i) => (
                        <Link key={i} className="searchbar-names" to={`users/${user.id}`}>
                            <p>{`${user.first_name} ${user.last_name}`}</p>
                        </Link>
                    ))) :
                null}

                {(query.length > 0) ? 
                    (<p>No more results</p>) :
                null}
            </div>
        </div>
    );
};

const mapDispatchToProps = dispatch => ({
    fetchUsers: () => dispatch(fetchUsers())
});

export default connect(null, mapDispatchToProps)(SearchBar);