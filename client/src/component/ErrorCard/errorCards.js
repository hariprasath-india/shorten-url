import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import './errorCards.css'

function ErrorCards({ ErrorMessage }) {
    return (
        <InputGroup className='mt-4 d-flex justify-content-center error-new-link-box' >
            <div className='error-card-url'>
                <InputGroup.Text className='error-nano-url-text-input-text'>{ErrorMessage || "Unavailable to fetch data"}</InputGroup.Text>
            </div>
        </InputGroup>
    )
}

export default React.memo(ErrorCards)
