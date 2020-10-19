import React, { useState } from 'react';
import SearchResult from '../SearchResult/SearchResult';
import Users from '../Users/Users';
import "./UserProfile.css";

const UserProfile = () => {
    const [data, setData] = useState({});
    const [username, setUsername] = useState("");
    const [repositories, setRepositories] = useState([]);
    const [users, setUsers] = useState([]);
    const [userInfo, setUserInfo] = useState(false);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [userExists, setUserExists] = useState(false);


    const top_repositories = repositories.sort((a, b) => {
        return b.stargazers_count - a.stargazers_count
    }).slice(0, 5).map(repository => (
        <ul key={repository.id}>
            <li>
                <a href={repository.html_url} target="_blank">{repository.name}</a>
                <h6>Star: {repository.stargazers_count}</h6>
            </li>
        </ul>
    ));


    const onChangeHandler = e => {
        setUsername(e.target.value);
    };

    const submitHandler = async e => {
        e.preventDefault();
    
        setUserInfo(false);
        const profile = await fetch(`https://api.github.com/users/${username}`);
        const profileJson = await profile.json();
        console.log(profileJson);

        const repositories = await fetch(profileJson.repos_url);
        const repositoriesJson = await repositories.json();
        // console.log(repositoriesJson);

        if (profileJson) {
            setData(profileJson);
            setRepositories(repositoriesJson);
            setDataLoaded(true);
            
            for(let i = 0; i < users.length; i++) {
                if (users[i].name === profileJson.name) {
                    setUserExists(true);
                }
            }

            !userExists && users.push({
                name: profileJson.name,
                login: profileJson.login,
                location: profileJson.location,
                avatar: profileJson.avatar_url
            })
        };

        document.getElementById('search_input').value = '';
        
    };

    const userInfoHandler = e => {
        e.preventDefault();
        setUserInfo(true);
    };

    return (
        <div className="row search_container">
            {/* Search Section */}
            <div className=" col-sm-3 users_section">
                <h4 className="text-info">Github Users</h4>
                {
                users.map((user, index)=> 
                    <h4 id={user.login} className="user_info" onClick={userInfoHandler} key={index}>{user.name}</h4>
                )}
            </div>
            
            {/* Search Result Section */}
            <div className="col-sm-9 ">
                <div className="section">
                    <h4 className="text-info">Search</h4>
                    <form className="form-inline">
                        <input id="search_input" className="form-control mr-sm-2 m-2" type="text" value={username} onChange={onChangeHandler} aria-label="Search" placeholder="Enter Github Username" />
                        <button className="btn btn-outline-info my-2 my-sm-0 btn_search" type="submit" onClick={submitHandler}>Search</button>
                    </form>
                </div>

                {!userInfo && <div className="section">
                    <h4 className="text-info">Search Results</h4>
                    {dataLoaded && <SearchResult top_repositories={top_repositories} data={data}></SearchResult>}
                </div>}

                {userInfo &&  <div>
                    <h4 className="text-info">User Info</h4>
                    <h6>Work in Progress...</h6>
                </div>}
                

            </div>
        </div>
    );
};

export default UserProfile;