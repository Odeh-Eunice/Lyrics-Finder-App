import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Results extends Component {
    constructor(props) {
        super(props);
        this.state = {
            results: []
        }
    }

    componentDidUpdate(oldProps) {
        if (oldProps.query != this.props.query) {
            this.getResults();
        }

    }

    componentDidMount() {
        this.getResults();
    }

    getResults() {
        fetch('/search/' + this.props.query)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.setState({ results: data });

            })
    }

    render() {
        return (
            <div className="results-display">
                {this.state.results ? <h3>"{this.props.query}"</h3> : null}
                <ul>
                    {this.state.results.map((hit, index) => (
                        <Link key={index} to={`/song/${hit.song_id}`}>
                            <li className="result">
                                <img src={hit.song_art} alt="song art" className="result-thumbnail" />
                                <p className="result-name">
                                    {hit.title} <br />
                                    <span>{hit.artist_name}</span>
                                </p>
                            </li>
                        </Link>
                    ))}
                </ul>
            </div>
        );
    }
}

export default Results;