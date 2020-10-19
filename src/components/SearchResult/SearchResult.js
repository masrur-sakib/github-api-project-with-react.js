import React from 'react';
import "./SearchResult.css";

const SearchResult = (props) => {
    const {data, top_repositories} = props;

    return (
        <div >
            <div className="userinfo_container">
                <div class="grid-area grid-area-1 avatar"><img src={data.avatar_url} alt="" /></div>
                <div class="grid-area grid-area-2">
                    Name: <span>{data.name}</span>
                </div>
                <div class="grid-area grid-area-3">
                    Location: <span>{data.location}</span>
                </div>
                <div class="grid-area grid-area-4">
                    Followers: <span>{data.followers}</span>
                </div>
                <div class="grid-area grid-area-5">
                    Following: <span>{data.following}</span>
                </div>
                <div class="grid-area grid-area-6">
                    Username: <span>{data.login}</span>
                </div>
                <div class="grid-area grid-area-7">
                    Public Repos: <span>{data.public_repos}</span>
                </div>
                <div class="grid-area grid-area-8">
                    Public Gists: <span>{data.public_gists}</span>
                </div>
                <div class="grid-area grid-area-9">
                    <p>Most Starred Repositories:</p>
                    <p><span>{top_repositories}</span></p>
                </div>
            </div>
        </div>
    );
};

export default SearchResult;