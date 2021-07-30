import React from 'react'

export default function Header() {
    return (
        <div>
            <h1>
                <span className="try">
                    web dev
                </span>
                <style jsx>
                    {`
                        .try{
                            color:red;
                        }
                    `}
                </style>
                <p> hello this is next.js</p>
            </h1>
        </div>
    )
}
