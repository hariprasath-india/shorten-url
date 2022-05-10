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
  const [shortUrl, setShortUrl] = useState('')
  
  const submitHandler = (e) => {
      e.preventDefault()
      axios.post(createLink, {
          url: url
      })
          .then((response) => {
            console.log(response)
              setUrl('')
              setShortUrl(response.data.data.short_url_code)
          })
          .catch((error) => {
              console.log(error)
          })
  }
    return (
      <div className="home-wrapper">
        <div className="home">
        <img className="home-image" src={process.env.REACT_APP_SITE_URL + '/assets/Nano.svg'} />
          <Form onSubmit={submitHandler}>

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

          </Form>
          {shortUrl && <Cards shrinkedUrl={shortUrl} />}
          <Search/>
        </div>
        
        <ParticlesBackground/>
      </div>
    )
  }
  
  export default Home