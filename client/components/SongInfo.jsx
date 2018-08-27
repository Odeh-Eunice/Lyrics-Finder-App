import React from 'react';
import { Link } from 'react-router-dom';

const SongInfo = (props) => {
    const { metaData } = props;
    const {
        primary_artist,
        featured_artists,
        producer_artists,
        album,
        title,
        song_art_image_url
    } = metaData;
    const album_art = !album ? song_art_image_url : album.cover_art_url;
    const images = [album_art, song_art_image_url];
    return (
        <div className="songInfo-container" style={{ backgroundImage: `url(${images[0]})` }}>
            <div className="content">
                <div className="row">
                    <div className="col-md-4">
                        <div style={{
                            backgroundImage: `url(${images[1]})`,
                            width: "200px",
                            height: "200px",
                            margin: "10px auto",
                            border: "1px solid gray",
                            backgroundSize: "cover",
                            backgroundPosition: "center"
                        }}>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <h3>{title}</h3>
                        <Link to={`/search/${primary_artist.name}`}>
                            <h4>{primary_artist.name}</h4>
                        </Link>
                        {featured_artists.length > 0 ? (
                            <h6>Featuring {featured_artists.map((artist, idx) => {
                                if (idx + 2 === featured_artists.length) {
                                    return <span key={idx} ><Link to={`/search/${artist.name}`} >{artist.name}</Link> & </span>
                                }
                                else if (idx + 1 === featured_artists.length) {
                                    return <span key={idx} ><Link to={`/search/${artist.name}`} >{artist.name}</Link></span>
                                }
                                else {
                                    return <span key={idx} ><Link to={`/search/${artist.name}`} >{artist.name}</Link>, </span>

                                }
                            })}</h6>
                        ) : null}
                        {producer_artists.length > 0 ? (
                            <h6>Produced by {producer_artists.map((artist, idx) => {
                                if (idx + 2 === producer_artists.length) {
                                    return <span key={idx} ><a href="#">{artist.name}</a> & </span>
                                }
                                else if (idx + 1 === producer_artists.length) {
                                    return <span key={idx} ><a href="#">{artist.name}</a></span>
                                }
                                else {
                                    return <span key={idx} ><a href="#">{artist.name}</a>, </span>
                                }
                            })}</h6>
                        ) : null}
                        {album ? <h6>Album <a href="#">{album.name}</a></h6> : null}
                    </div>
                    <div className="col-md-4">
                        {props.video}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SongInfo;