import React from 'react';
import "./SearchResult.css";

const SearchResult = (props) => {
    const {data, top_repositories} = props;

    return (
        <div >
            <div className="userinfo_container">
                <div className="grid-area grid-area-1 avatar">
                    <img src={data.avatar_url} alt="" />
                </div>
                <div className="grid-area grid-area-2">
                    <p>Name: <span>{data.name}</span></p>
                </div>
                <div className="grid-area grid-area-3">
                    <p>Location: <span>{data.location}</span></p>
                </div>
                <div className="grid-area grid-area-4">
                    <p>Followers: <span>{data.followers}</span></p>
                </div>
                <div className="grid-area grid-area-5">
                    <p>Following: <span>{data.following}</span></p>
                </div>
                <div className="grid-area grid-area-6">
                    <p>Username: <span>{data.login}</span></p>
                </div>
                <div className="grid-area grid-area-7">
                    <p>Public Repos: <span>{data.public_repos}</span></p>
                </div>
                <div className="grid-area grid-area-8">
                    <p>Public Gists: <span>{data.public_gists}</span></p>
                </div>
                <div className="grid-area grid-area-9">
                    <p>Most Starred Repositories (Top 5):</p>
                    <h6><span>{top_repositories}</span></h6>
                </div>
            </div>
        </div>
    );
};

export default SearchResult;