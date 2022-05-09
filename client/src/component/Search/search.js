import React from 'react'
import Button from 'react-bootstrap/Button'
import './search.css'

function Search() {

	return (
		<div className="container">
			<div className="row" id="filter">
				<form>
					<span className="form-group col-sm-3 col-xs-6">
						<select data-filter="make" className="filter-make filter form-control">
							<option value="">Select Option Url/Title</option>
							<option value="url">Url</option>
							<option value="title">Title</option>
						</select>
					</span>
					<span className="form-group col-sm-3 col-xs-6">
						<input type={Text} placeholder= "Enter Keyword or link"/>
					</span>
					<span className="form-group col-sm-3 col-xs-6">
						<select data-filter="type" className="filter-type filter form-control">
							<option value="">Sort By</option>
							<option value="created_at_asc">Created At - Low to High</option>
							<option value="created_at_desc">Created At - High to low</option>
							<option value="total_clicks_asc">Total Clicks - Low to High</option>
							<option value="total_clicks_desc">Total Clicks - High to low</option>
						</select>
					</span>
						<span className="form-group col-sm-3 col-xs-6">
							<Button type="submit" className="btn btn-block btn-primary">Search</Button>
						</span>
					</form>
				</div>
				<div className="row" id="products">
				
			</div>
		</div>
	  )
}

export default React.memo(Search)
