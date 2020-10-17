import React, { useState } from 'react';
import "./UserProfile.css";

const UserProfile = () => {
    const [data, setData] = useState({});
    const [username, setUsername] = useState("");
    const [repositories, setRepositories] = useState([]);

    const onChangeHandler = e => {
        setUsername(e.target.value);
    }

    const submitHandler = async e => {
        e.preventDefault();

        const profile = await fetch(`https://api.github.com/users/${username}`);
        const profileJson = await profile.json();
        // console.log(profileJson);

        const repositories = await fetch(profileJson.repos_url);
        const repositoriesJson = await repositories.json();
        // console.log(repositoriesJson);

        if (profileJson) {
            setData(profileJson);
            setRepositories(repositoriesJson);
        };

        document.getElementById('search_input').value='';

    };

    return (
        <div className="container search_container">
            {/* Search Section */}
            <div className="section">
                <h4 className="text-info">Search</h4>
                <form className="form-inline">
                    <input id="search_input" className="form-control mr-sm-2 m-2" type="text" value={username} onChange={onChangeHandler} aria-label="Search" placeholder="Enter Username" />
                    <button className="btn btn-outline-info my-2 my-sm-0" type="submit" onClick={submitHandler}>Search</button>
                </form>
            </div>

            {/* Search Result Section */}
            <div className="section">
                <h4 className="text-info">Search Results</h4>
                <div>
                    <table className="table table-bordered m-4">
                        <thead className="thead-light">
                          <tr>
                            <th scope="col">User Name</th>
                            <th scope="col">Location</th>
                            <th scope="col">Avatar</th>
                            <th scope="col">Top 5 Starred Repositories</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>{data.name}</td>
                            <td>{data.location}</td>
                            <td className="avatar"><img src={data.avatar_url} alt=""/></td>
                            <td>   
                                {repositories.sort((a, b) => {
                                    return b.stargazers_count - a.stargazers_count
                                }).slice(0,5).map(repository => (
                                    <ul key={repository.id}>
                                        <li>
                                            <a href={repository.html_url} target="_blank">{repository.name}</a>
                                            <h6>Star: {repository.stargazers_count}</h6>
                                        </li>
                                    </ul>
                                ))}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                </div>
            </div>
            </div>
    );
};

export default UserProfile;