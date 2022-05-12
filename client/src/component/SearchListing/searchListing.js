import React from 'react';
import ShortUrlCard from '../ShortUrlCard/shortUrlCard';
import './searchListing.css'

function UrlListings({ResponseData}) {
    const result = (ResponseData) =>{
        console.log("ResponseData.data ",ResponseData.data)
        if (ResponseData.data){
            return ResponseData.data.map(data => 
                <div className="url-list" id ={"url-list-"+data.id}>
                    <div className="url-content">
                        <div className="url-name" id ={"url-name-"+data.id}>
                            <div className="title" id ={"url-title-"+data.id}>{data.url_title || "Title Unavailable: "+data.original_url}</div>
                            <div className="url-copy" id ={"url-copy-"+data.id}>{data.short_url_code && <ShortUrlCard shrinkedUrl={data.short_url_code} />}</div>
                        </div>
                        <div className="url-clicks" id ={"url-clicks-"+data.id}>
                            <div className="num-clicks">{data.total_clicks}</div>
                            <div className="clicks">Clicks</div>
                        </div>
                    </div>
                </div>
            )
        } else {
            console.log(ResponseData.error)
            alert(`Error in Input Value. \nPlease Check This Error: ${ResponseData.error}`)
        }
    }
    
 return (result(ResponseData))
}

export default UrlListings