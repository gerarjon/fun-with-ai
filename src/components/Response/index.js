import React from 'react';
import './style.css';

const Response = ({prompt, response}) => {
    return (
        <li className='response-item'>
            <div className='response-prompt'>
                <div className='response-header'>
                    Prompt:
                </div>
                <div className='response-text'>
                    {prompt}
                </div>
            </div>
            <div className='response-response'>
                <div className='response-header'>
                    Response:
                </div>
                <div className='response-text'>
                    {response}
                </div>
            </div>
        </li>
    )
}

export default Response;