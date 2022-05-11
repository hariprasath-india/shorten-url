/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react'
import ParticlesBackground from "../ParticleBackground/ParticlesBackground";
import './home.css';


import axios from 'axios'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Cards from '../Cards/cards';
import { createLink } from '../../config/api-calls';
import Search from '../Search/search';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const Home = () => {
  const [url, setUrl] = useState('')
  const [createLinkResponse, setCreateLinkResponse] = useState('')
  
  const submitHandler = (e) => {
      e.preventDefault()
      axios.post(createLink, {
          url: url
      })
          .then((response) => {
            console.log(response)
              setUrl('')
              setCreateLinkResponse(response.data)
          })
          .catch((error) => {
              console.log(error)
          })
  }

    return (
      <div className="home-wrapper">
        <div className="home">
        
        <div className="nano-urls"><img className="home-image" src={process.env.REACT_APP_SITE_URL + '/assets/Nano.svg'} /></div>
        <div class="form-url-container">
          <Form className="form-url" onSubmit={submitHandler}>

            <Form.Control
                className='mt-3 text-center input-style'
                value={url}
                onChange={e => setUrl(e.target.value)}
                type='text'
                placeholder='your url with http(s)://'
                required
            />  
            <span className='d-flex justify-content-center'>
                <Button className='mt-3 button-style' variant='primary' type='submit'>
                    Nano It
                </Button>
            </span>
            {createLinkResponse.statusCode === 200 && <Cards ResponseData={createLinkResponse} />}
          </Form>
          </div>
          <Search/>
        </div>
        
        <ParticlesBackground/>
      </div>
    )
  }
  
  export default Home