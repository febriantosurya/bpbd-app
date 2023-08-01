import React from 'react'

const Button = ({ title, ...rest }) => {
    return (
        <div className='button-wrapper'
            style={{ textAlign: "left" }}>
            <button className="button" {...rest}
                style={{
                    textAlign: "center",   
                    fontSize:"18px",
                    color:"white",
                }}
            >
                {title}
            </button>
        </div>
    )
}

export default Button