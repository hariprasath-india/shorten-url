import React from 'react'
import {Row, Col} from 'react-bootstrap'
import './urllisting.css'

function UrlListings() {
 return (
  <div className="url-list">
   <div className="month">May</div>
   <div className="url-content">
    <div className="url-name">
     Employee Management
    </div>
    <div className="url-clicks">
     <div className="num-clicks">43</div>
     <div className="clicks">Clicks</div>
    </div>
   </div>
   <div class="url-copy">
    Copy
   </div>
  </div>
 )
}

export default UrlListings