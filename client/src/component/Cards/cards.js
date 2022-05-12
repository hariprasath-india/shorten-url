import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import ShortUrlCard from '../ShortUrlCard/shortUrlCard';
import './cards.css'

function Cards({ ResponseData }) {

    return (
        
        <InputGroup className='mt-4 d-flex justify-content-center new-link-box' >
            <div className='card-url'>
                <InputGroup.Text className='nano-url-text-input-text'>{ResponseData.data.url_title}</InputGroup.Text>
            </div>
            <ShortUrlCard shrinkedUrl={ResponseData.data.short_url_code}/>

        </InputGroup>
    )
}

export default React.memo(Cards)
