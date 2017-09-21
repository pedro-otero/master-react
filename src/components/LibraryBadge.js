import React from 'react';

const LibraryBadge = ({pages, entityName}) => {

    const loadedSoFar = pages.length ? pages.reduce((total, page) => total + page.items.length, 0) : 0;
    const what = entityName + (loadedSoFar === 1 ? '' : 's');
    const progress = pages.length ? (loadedSoFar / pages[0].total) * 100 : 0;

    return (
        <div className="jumbotron">
            <h1>{loadedSoFar} {what}</h1>
            <div className="progress">
                <div
                    className="progress-bar"
                    role="progressbar"
                    style={{"width": progress + "%"}}
                    aria-valuenow={progress}
                    aria-valuemin="0"
                    aria-valuemax="100"></div>
            </div>
        </div>
    )
}

export default LibraryBadge;