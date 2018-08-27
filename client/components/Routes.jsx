import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Results from './routes/Results';
import SongPage from "./routes/SongPage";

class Routes extends Component {
    render() {
        return (
            <div>
                <Route exact path="/" render={() => (
                    <Redirect to="/search" />
                )} />
                <Route path="/search/:query" render={(props) => {
                    const { query } = props.match.params;
                    return <Results query={query} />;
                }} />
                <Route path="/song/:songId" render={(props) => {
                    const { songId } = props.match.params;
                    console.log(songId);
                    return <SongPage id={songId} />;
                }} />
            </div>
        );
    }
}

export default Routes;