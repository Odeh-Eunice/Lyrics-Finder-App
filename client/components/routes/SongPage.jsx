import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Lyrics from '../Lyrics';
import SongInfo from '../SongInfo';

class SongPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lyrics: "",
            songData: {},
            doneLoading: false
        }
        this.getLyrics = this.getLyrics.bind(this);
    }

    componentDidMount() {
        this.getSongInfo(this.getLyrics);
    }

    getSongInfo(callback) {
        const id = this.props.id;
        fetch("/song/" + id)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.setState({ songData: data });
            })
            .then(() => callback())
    }
    getLyrics(callback) {
        const path = this.state.songData.path;
        fetch("/lyrics" + path)
            .then(res => res.json())
            .then(data => {
                this.setState({ lyrics: data, doneLoading: true });
            })
            .then(() => {
                if (callback) {
                    callback();
                }
            })
    }

    findYoutubeVideo() {
        const { media } = this.state.songData;
        for (const element of media) {
            if (element.provider === 'youtube') {
                let youtubeLink = element.url;
                youtubeLink = youtubeLink.replace("watch?v=", "embed/");
                return (
                    <div>
                        <iframe
                            src={youtubeLink}
                            frameBorder="0"
                            title="YouTube Video"
                            allow="encrypted-media"
                            allowFullScreen
                            height="200px"
                            width="300px">
                        </iframe>
                    </div>
                );
            }
        }
        return <h4>No Youtube video provide by <em>Genius</em></h4>
    }

    render() {

        return (
            <div >
                {!this.state.doneLoading ? <h1 className="text-center">Loading...</h1> : (
                    <div className="song-display">
                        <SongInfo
                            metaData = {this.state.songData}
                            video={this.findYoutubeVideo()} />
                        <Lyrics lyrics={this.state.lyrics} />
                    </div>
                )}
            </div>
        );
    }
}

export default SongPage;