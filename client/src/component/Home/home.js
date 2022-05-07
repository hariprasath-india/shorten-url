import React, { useState } from 'react'
import ParticlesBackground from "../ParticleBackground/ParticlesBackground";
import './home.css';


import axios from 'axios'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Cards from '../Cards/cards';
import { createLink } from '../../config/api-calls';

const siteUrl = process.env.SITE_URL

const Home = () => {
  const [url, setUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('')
  
  const submitHandler = (e) => {
      e.preventDefault()
      console.log("createLink:",createLink)
      axios.post(createLink, {
          url: url
      })
          .then((response) => {
              setUrl('')
              setShortUrl(siteUrl+'/'+response.data.short_url_code)
          })
          .catch((error) => {
              console.log(error)
          })
  }
    return (
      <div className="home-wrapper">
        <div className="home">
          <Form onSubmit={submitHandler}>

            <Form.Control
                className='mt-3 text-center'
                value={url}
                onChange={e => setUrl(e.target.value)}
                type='text'
                placeholder='your url with http(s)://'
                required
            />

            <div className='d-flex justify-content-center'>
                <Button className='mt-3' variant='primary' type='submit'>
                    Shrink
                </Button>
            </div>
          </Form>
          {shortUrl && <Cards shrinkedUrl={shortUrl} />}
        </div>
        <ParticlesBackground/>
      </div>
    )
  }
  
  export default Home