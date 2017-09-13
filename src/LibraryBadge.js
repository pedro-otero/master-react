import React from 'react';
import {Well} from "react-bootstrap";

const LibraryBadge = (props) => {

    const pages = props.pages;
    const total = props.pages.length ? pages.reduce((total, page) => total + page.items.length, 0) : 0;

    return (
        <Well>
            <h1>{total}</h1>
        </Well>
    )
}

export default LibraryBadge;