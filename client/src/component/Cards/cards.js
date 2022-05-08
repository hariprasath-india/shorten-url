import React from 'react'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import './cards.css'

function Cards({ shrinkedUrl }) {

    const style = {
        paddingLeft: 2,
        paddingBottom: 2,
        width: 17,
        height: 16
    }

    const clickHandler = () => {
        navigator.clipboard.writeText(shrinkedUrl)
    }

    return (
        <InputGroup className='mt-4 d-flex justify-content-center new-link-box' >

            <InputGroup.Text className='nano-url-text-input-text'>Nano Url </InputGroup.Text>
            <InputGroup.Text className='nano-url-link-input-text'>{shrinkedUrl}</InputGroup.Text>
            <Button className='nano-url-copy-bt-input-text' onClick={clickHandler} >copy</Button>
            <a href= {shrinkedUrl} target='_blank'>
                <img src='https://img.icons8.com/fluency-systems-regular/50/000000/external-link.png' style={style} alt='icon-r' />
            </a>
            

        </InputGroup>
    )
}

export default React.memo(Cards)
