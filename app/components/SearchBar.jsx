import React from 'react'

const SearchBar = (props) => {

  const handleChange = props.handleChange
  const search = props.search

  return (
    <form className="search col-lg-4">
      <input
        onChange={handleChange}
        value={search}
        className="search-area"
        placeholder="Search Products"
      />
    </form>
  )
}

export default SearchBar
