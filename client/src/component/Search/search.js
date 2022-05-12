/* eslint-disable jsx-a11y/alt-text */
import './search.css'
import React,{ useEffect, useState} from 'react'
import Button from 'react-bootstrap/Button'
import UrlListings from '../SearchListing/searchListing'
import { fetchLink } from '../../config/api-calls';
import axios from 'axios'
import ErrorCards from '../ErrorCard/errorCards';

function Search() {
	const [query, setQuery] = useState('')
    const [type, setType] = useState('url')
    const [sortBy, setSortBy] = useState('created_at_desc')
    const [responseData, setResponseData] = useState('')

    useEffect(() => {
        return axios.get(fetchLink, {
            params:{
                type: type,
                query: query || null,
                sortBy: sortBy,
                limit:10,
                skip:0
            }
        })
            .then((response) => {
              console.log(response)
                setResponseData('')
                setResponseData(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
        
        },[])

    const submitHandler = (e) => {
        e.preventDefault()
        axios.get(fetchLink, {
            params:{
                type: type,
                query: query || "",
                sortBy: sortBy
            }
        })
            .then((response) => {
              console.log(response)
                setResponseData('')
                setResponseData(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }
    return(
        <div className="container search-container">
            <div className="row" id="filter">
                <form action="" onSubmit={e => submitHandler(e)}>
					<div class="search-section">
                        <div className="form-group select-title">
                            <select  name = "type" className="filter-type filter form-control" value={type} onChange={ e => setType(e.target.value)} required>
                                <option value="">Select Option Url/Title</option>
                                <option value="url">Url</option>
                                <option value="title">Title</option>
                            </select>
                        </div>
                        <div className="form-group input-title">
                            <input className="input-text-style" type="text" name='query' placeholder= "Enter Keyword or link" value={query} onChange={e => setQuery(e.target.value)} />
                        </div>
                        <div className="form-group select-sort">
                            <select  name = "sortBy" className="filter-type filter form-control" value={sortBy} onChange={e => setSortBy(e.target.value)} required>
                                <option value="">Sort By</option>
                                <option value="created_at_asc">Created At - Old to New</option>
                                <option value="created_at_desc">Created At - New to Old</option>
                                <option value="total_clicks_asc">Total Clicks - Low to High</option>
                                <option value="total_clicks_desc">Total Clicks - High to low</option>
                            </select>
                        </div>
                        <div className="form-group select-btn">
                            <Button type="submit" className="search-button" variant="info" >
                                <img src="assets/search.svg" height={20} width={20} />
                            </Button>
                        </div>
                    </div>
				    <div className="row" id="products">
                        {responseData && responseData.data.length === 0 && <ErrorCards ErrorMessage={"No Result"} />}
                        {responseData && <UrlListings ResponseData={responseData}/>}
                        {(!responseData || responseData.statusCode === 400) && !responseData.data && <ErrorCards ErrorMessage={responseData.error}/>}
           			</div>
                </form>
            </div>
		</div>
    )
}

export default React.memo(Search)