import React, { useState } from 'react';
import ExistingUserResult from '../ExistingUserResult/ExistingUserResult';
import SearchResult from '../SearchResult/SearchResult';
import "./UserProfile.css";

const UserProfile = () => {
    const [existingUserInfo, setExistingUserInfo] = useState({});
    const [existingUserRepos, setExistingUserRepos] = useState({});
    const [data, setData] = useState({});
    const [username, setUsername] = useState("");
    const [repositories, setRepositories] = useState([]);
    const [userInfo, setUserInfo] = useState(false);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [userExists, setUserExists] = useState(false);
    const [users, setUsers] = useState([]);

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

        const repositories = await fetch(profileJson.repos_url);
        const repositoriesJson = await repositories.json();

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
                avatar_url: profileJson.avatar_url,
                name: profileJson.name,
                location: profileJson.location,
                followers: profileJson.followers,
                following: profileJson.following,
                login: profileJson.login,
                public_repos: profileJson.public_repos,
                public_gists: profileJson.public_gists,
                totalRepositories: repositoriesJson
            })
        };

        document.getElementById('search_input').value = '';
        
    };

    const userInfoHandler = e => {
        e.preventDefault();
        setUserInfo(true);
        for(let i=0; i<users.length; i++){
            const clicked_id = window.event.target.id;
            if(users[i].login === clicked_id){
                let clicked_user_info = {
                    avatar_url: users[i].avatar_url,
                    name: users[i].name,
                    location: users[i].location,
                    followers: users[i].followers,
                    following: users[i].following,
                    login: users[i].login,
                    public_repos: users[i].public_repos,
                    public_gists: users[i].public_gists,
                };
                let total_repos =users[i].totalRepositories;

                const topRepositories = total_repos.sort((a, b) => {
                    return b.stargazers_count - a.stargazers_count
                }).slice(0, 5).map(repository => (
                    <ul key={repository.id}>
                        <li>
                            <a href={repository.html_url} target="_blank">{repository.name}</a>
                            <h6>Star: {repository.stargazers_count}</h6>
                        </li>
                    </ul>
                ));
                setExistingUserInfo(clicked_user_info);
                setExistingUserRepos(topRepositories);
            }
        };
        
    };

    
    return (
        <div className="row search_container">
            {/* Existing Users Section */}
            <div className=" col-sm-3 users_section">
                <h4 className="text-info">Github Users</h4>
                {
                users.map((user, index)=> 
                    <h4 id={user.login} className="user_info" onClick={userInfoHandler} key={index}>{user.login}</h4>
                )}
            </div>
            
            {/* Search Form Section */}
            <div className="col-sm-9 ">
                <div className="section">
                    <h4 className="text-info">Search</h4>
                    <form className="form-inline">
                        <input id="search_input" className="form-control mr-sm-2 m-2" type="text" value={username} onChange={onChangeHandler} aria-label="Search" placeholder="Enter Github Username" />
                        <button className="btn btn-outline-info my-2 my-sm-0 btn_search" type="submit" onClick={submitHandler}>Search</button>
                    </form>
                </div>

            {/* Search Result Section */}
                {!userInfo && <div className="section">
                    <h4 className="text-info">Search Result</h4>
                    {dataLoaded && <SearchResult top_repositories={top_repositories} data={data}></SearchResult>}
                </div>}
            
            {/* Existing User Result Section */}
                {userInfo &&  <ExistingUserResult existingUserInfo={existingUserInfo} existingUserRepos={existingUserRepos}></ExistingUserResult>}
            </div>
        </div>
    );
};

export default UserProfile;