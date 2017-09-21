import React from 'react';
import {Link} from 'react-router-dom';

const SideBar = () => {
    return (
        <ul className="list-group">
            <li className="list-group-item"><Link to="/">Home</Link></li>
            <li className="list-group-item"><Link to="/tracks">Tracks</Link></li>
            <li className="list-group-item"><Link to="/albums">Albums</Link></li>
        </ul>
    )
};

export default SideBar;