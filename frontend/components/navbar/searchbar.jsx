import React, { useState, useEffect } from "react";
import { fetchUsers } from "../../actions/user_actions";
import { connect } from "react-redux";

const SearchBar = props => {
    const {fetchUsers} = props;

    const [state, setState] = useState({
        users: []
    });

    useEffect(() => {
        fetchUsers().then(data => {
            let userNames = [];

            for (let user of Object.values(data.users)){
                userNames.push(`${user.first_name} ${user.last_name}`);
            };

            setState({
                ...state,
                users: userNames
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

            {state.users.filter(user => {
                if (query === ""){
                    return user;
                } else if (user.toLowerCase().includes(query.toLowerCase())){
                    return user;
                };
            }).map((user, i) => (
                <div key={i} className={"searchbar-names"}>
                    <p>{user}</p>
                </div>
            ))}

            <button onClick={() => console.log(state)}></button>

        </div>
    );
};

const mapDispatchToProps = dispatch => ({
    fetchUsers: () => dispatch(fetchUsers())
});

export default connect(null, mapDispatchToProps)(SearchBar);