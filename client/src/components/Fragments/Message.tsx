/**
 * 
 * @param param0
 * @returns 
 */

/* Ultimate Challenge:
    This component must be flexible to adapt to all the diferents screens

        1. turn all classes into styled component
*/

import React from 'react'
const Message = ({
    title,
    span,
    name,
    content,
    text,
    foot,
}: {
    title: string
    span: string
    name: string
    content: string
    text: string
    foot: string
}) => {
    return (
        <div>
            <h1 className="hero">
                {`${title}, `}
                <strong>{name}</strong>
            </h1>
            <span className="hero-2">{span}</span>
            <p className="figma_text">{content}</p>
            <p className="figma_text_line">{text}</p>
            <p className="figma_text_small">
                <small>{foot}</small>
            </p>
        </div>
    )
}

export default Message
