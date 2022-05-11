import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';

export default function RedirectUrl() {
  const api_url = process.env.REACT_APP_API_URL
  const site_url = process.env.REACT_APP_SITE_URL
  let { code } = useParams();
  
  let redirect_url = api_url+"/"+code
  
  useEffect(() => {
    axios.get(redirect_url)
        .then((response) => {
          console.log(response)

          if (response.data.url){
            return window.location.href = response.data.url;
          }
          return window.location.href = site_url;
        })
        .catch((error) => {
            console.log(error)
        });
  }, [redirect_url, site_url])
  
  // eslint-disable-next-line jsx-a11y/heading-has-content
  return <h1></h1>;
}