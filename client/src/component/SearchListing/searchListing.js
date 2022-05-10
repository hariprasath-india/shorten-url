import React from 'react'
import './searchListing.css'

function UrlListings({ResponseData}) {

    const result = (ResponseData) =>{
        console.log(ResponseData.data)
        if (ResponseData & ResponseData.data){
            ResponseData.data.map(data => (
                
                <div className="url-list">
                    <div className="month">May</div>
                    <div className="url-content">
                        <div className="url-name">
                            {data.url_title},{console.log("Data",data)}
                        </div>
                        <div className="url-clicks">
                            <div className="num-clicks">{data.total_clicks}</div>
                            <div className="clicks">Clicks</div>
                        </div>
                    </div>
                    <div className="url-copy">Copy</div>
                </div>
            ))

            
        }
    }

 return (result(ResponseData))
}

export default UrlListings