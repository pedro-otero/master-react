import React from 'react';
import LibraryBadge from "./LibraryBadge";

const WelcomeBanner = ({profile, tracks, albums}) => {

    return (
        <div>
            <div className="grid">
                <div className="row">
                    <div className="col-md-2">
                        <img src={profile.images[0].url} alt="avatar"/>
                    </div>
                    <div className="col-md-10">
                        <h1 className="text-right">Welcome, {profile.id}!</h1>
                    </div>
                </div>
            </div>
            <LibraryBadge pages={tracks} entityName="track"/>
            <LibraryBadge pages={albums} entityName="album"/>
        </div>
    )
}

export default WelcomeBanner;