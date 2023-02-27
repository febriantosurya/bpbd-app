import React from 'react'

const Button = ({ title, ...rest }) => {
    return (
        <div className='button-wrapper'>
            <button className="button" {...rest}>{title}</button>
        </div>
    )
}

export default Button