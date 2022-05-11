/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import './shortUrlCard.css'
function ShortUrlCard({ shrinkedUrl }) {

 const site_url = process.env.REACT_APP_SITE_URL;
//  const style = {
//   paddingLeft: 2,
//   paddingBottom: 2,
//   width: 17,
//   height: 16
// }

  const style = {
    width: 20,
    height: 20,
    left: 640,
    bottom: 629,
    padding:{
      top: 5
    }
  }

  const clickHandler = () => {
      navigator.clipboard.writeText(site_url+"/"+shrinkedUrl);
  }

 return (
  <div className='card-link'>
     <InputGroup.Text className='nano-url-link-input-text'>{site_url+"/"+shrinkedUrl}</InputGroup.Text>
     <img className='card-icons' src="assets/copy-icon.svg" onClick={clickHandler}/>
     {/* <Button className='nano-url-copy-bt-input-text' onClick={clickHandler} >copy</Button> */}
     <a href= {site_url+"/"+shrinkedUrl} target='_blank' rel="noreferrer">
         <img src='assets/open-in-new-tab.svg' className='card-icons' alt='icon-r' />
     </a>
  </div>
 )
}

export default ShortUrlCard;