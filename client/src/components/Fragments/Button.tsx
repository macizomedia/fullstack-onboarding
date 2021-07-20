import React, { MouseEventHandler } from 'react'

const Button = (props: {
    class: string | undefined
    text: string | undefined
    action: MouseEventHandler<HTMLButtonElement>
}) => {
    return (
        <>
            <button onClick={props.action} className={props.class}>
                {props.text}
            </button>
        </>
    )
}

export default Button
