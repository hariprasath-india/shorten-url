/* eslint-disable jsx-a11y/alt-text */
import './search.css'
import React,{ useState} from 'react'
import Button from 'react-bootstrap/Button'
import UrlListings from '../SearchListing/searchListing'
import { fetchLink } from '../../config/api-calls';
import axios from 'axios'

function Search() {
	const [query, setQuery] = useState('')
    const [type, setType] = useState('')
    const [sortBy, setSortBy] = useState('')
    const [responseData, setResponseData] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()
        axios.get(fetchLink, {
            params:{
                type: type,
                query: query,
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
                   	    {responseData && <UrlListings ResponseData={responseData}/>}
           			</div>
                </form>
            </div>
		</div>
    )
}

export default React.memo(Search)