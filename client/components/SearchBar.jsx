import React, { Component } from 'react';
import { withRouter } from "react-router-dom";

class SearchBar extends Component {
    handleSubmit(e) {
        e.preventDefault();
        const query = e.target.query.value;
        this.props.history.push("/search/" + query);
        e.target.query.value = "";
    }
    render() {
        return (
            <div className="search-bar">
                <h1>Lyrics-2: Poor Man's Genius</h1>
                <form action="#" onSubmit={this.handleSubmit.bind(this)} className="form-inline">
                    <div className="form-group">
                        <label htmlFor="query"></label>
                        <input type="text" name="query" id="query" placeholder="Search Songs & Artists" />
                        <button className="btn"><i className="fa fa-search"></i></button>
                    </div>
                </form>
            </div>
        );
    }
}

export default withRouter(SearchBar);