import React, { useState } from 'react';
import './css/MediaDescription.css'; // Import your CSS file

const MediaDescription = ({ text }) => {
    const [expanded, setExpanded] = useState(false);

    const toggleExpand = () => {
        setExpanded(!expanded);
    };

    return (
        <p className={`movie_description media-description ${expanded ? 'expanded' : ''}`} dangerouslySetInnerHTML={{ __html: text === "" ? "-" : text.trim() }} onClick={toggleExpand}/>
    );
};

export default MediaDescription;