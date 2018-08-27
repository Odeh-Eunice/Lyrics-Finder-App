import React from 'react';

const Lyrics = (props) => {
    return (
        <div className="lyrics">
            {props.lyrics.split("\n").map((chunk, index) => (
                <div key={index} className="lyric-chunk">
                    {chunk} <br />
                </div>
            ))}
        </div>
    );
};

export default Lyrics;