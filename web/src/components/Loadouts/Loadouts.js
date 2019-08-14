import React from 'react';
import {Link} from "react-router-dom";

function Loadouts({match}) {
    return (
        <div>
            <h4>Loadouts</h4>
            <Link to={`/l/123`}>123</Link><br/>
            <Link to={`/l/234`}>234</Link><br/>
            <Link to={`/l/234`}>234</Link><br/>
            <Link to={`/l/234`}>234</Link><br/>
            <Link to={`/l/234`}>234</Link><br/>
            <Link to={`/l/234`}>234</Link><br/>
        </div>
    );
}

export default Loadouts;


