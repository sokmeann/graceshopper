import React from 'react'

const SearchBar = (props) => {

  const handleChange = props.handleChange
  const search = props.search

  return (
    <div>
      <div id="searchbar" className="input-group">
        <span className="input-group-addon"><i className="fa fa-search" /></span>
        <input
          onChange={handleChange}
          value={search}
          className="form-control search-area"
          placeholder="Search"
          aria-describedby="sizing-addon1"
          />
      </div>
      <button type="submit" className="btn btn-default">Submit</button>
    </div>
  )
}

export default SearchBar
