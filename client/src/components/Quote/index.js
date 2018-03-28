import React from 'react'

export default props => {
    return (
        <div className={`quote quote-${props.className}`}>
            <span>&ldquo;</span>
        </div>
    );
};
