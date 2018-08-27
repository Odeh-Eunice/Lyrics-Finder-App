import React from 'react';
import SearchBar from './SearchBar';
import Routes from './Routes';

const App = () => {
    return (
        <div>
            <div className="row">
                <div className="col-lg-12 header">
                    <SearchBar />
                </div>
            </div>
            <Routes />
        </div>
    );
};

export default App;
