import React from 'react';
import "./ExistingUserResult.css";

const ExistingUserResult = (props) => {
    const {existingUserInfo, existingUserRepos} = props;

    return (
        <div>
            <div className="userinfo_container">
                <div className="grid-area grid-area-1 avatar">
                    <img src={existingUserInfo.avatar_url} alt="" />
                </div>
                <div className="grid-area grid-area-2">
                    <p>Name: <span>{existingUserInfo.name}</span></p>
                </div>
                <div className="grid-area grid-area-3">
                    <p>Location: <span>{existingUserInfo.location}</span></p>
                </div>
                <div className="grid-area grid-area-4">
                    <p>Followers: <span>{existingUserInfo.followers}</span></p>
                </div>
                <div className="grid-area grid-area-5">
                    <p>Following: <span>{existingUserInfo.following}</span></p>
                </div>
                <div className="grid-area grid-area-6">
                    <p>Username: <span>{existingUserInfo.login}</span></p>
                </div>
                <div className="grid-area grid-area-7">
                    <p>Public Repos: <span>{existingUserInfo.public_repos}</span></p>
                </div>
                <div className="grid-area grid-area-8">
                    <p>Public Gists: <span>{existingUserInfo.public_gists}</span></p>
                </div>
                <div className="grid-area grid-area-9">
                    <p>Most Starred Repositories (Top 5):</p>
                    <h6><span>{existingUserRepos}</span></h6>
                </div>
            </div>
        </div>
    );
};

export default ExistingUserResult;