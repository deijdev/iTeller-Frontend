import React from 'react';
import {Link} from 'react-router-dom'

const Home = () => {
    return (
        <div>
            Click <Link to="/dashboard">here</Link> to go to Dashboard
        </div>
    );
};

export default Home;