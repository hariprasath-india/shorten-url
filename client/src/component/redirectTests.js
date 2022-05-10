import {
    useParams
  } from 'react-router-dom';

import axios from 'axios';

const RedirectUrl = async () => {

    const api_url = process.env.REACT_APP_API_URL
    const site_url = process.env.REACT_APP_SITE_URL
    let { code } = useParams();
    
    let redirect_url = api_url+"/"+code
    console.log(redirect_url)
    const result =  async(redirect_url) => {

    return await axios.get(redirect_url)
        .then((response) => {
          console.log(response)

          if (response.data.url){
            //  window.location.href = response.data.url;
            window.open(response.data.url, "_blank")
             return response.data.url;
          }
          // window.location.href = site_url;
          return site_url;

        })
        .catch((error) => {
            console.log(error)
        })
    
    }
    
    
    return(
      window.location.href = await result(redirect_url)

      

      //  fetch(redirect_url)
      //   .then(res => res.json())
      //   .then( res => {
      //       if (res.url){
      //         console.log("res.url ",res.url)
      //         window.location.href = res.url;
              
      //       } else {
      //         console.log(site_url)
      //         window.location.href = site_url;
              
      //       }
      //     }
      //   )
      //   .catch((error) => {
      //     console.log(error)
      //   })        
    )
}

export default RedirectUrl