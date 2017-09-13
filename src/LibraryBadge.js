import React from 'react';
import {ProgressBar, Well} from "react-bootstrap";

const LibraryBadge = (props) => {

    const pages = props.pages;
    const loadedSoFar = props.pages.length ? pages.reduce((total, page) => total + page.items.length, 0) : 0;
    const what = props.entityName + (loadedSoFar === 1 ? '' : 's');
    const progress = props.pages.length ? (loadedSoFar / props.pages[0].total) * 100 : 0;

    return (
        <Well>
            <h1>{loadedSoFar} {what}</h1>
            <ProgressBar now={progress}/>
        </Well>
    )
}

export default LibraryBadge;