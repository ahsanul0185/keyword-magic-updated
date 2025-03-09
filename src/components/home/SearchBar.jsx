import React, { useState } from 'react'
import "./style.css"
import icon_search from "../../assets/icon-search.svg"

const SearchBar = () => {

    const [keyword, setKeyword] = useState("");

    const handleFormSubmit = (e) => {
        e.preventDefault();
    }

  return (
      <div className='search-bar' data-aos="fade-left" data-aos-once="true">
          <form onClick={handleFormSubmit} className='search-bar-form'>
              <label htmlFor="search">
                  <img src={ icon_search } alt="" />
              </label>
              <input onChange={(e) => setKeyword(e.target.value)} value={keyword} id='search' type="text" className='search-bar-input' placeholder='Search keywords...' />
              <button type='submit' className='card-btn-basic'>
              🔍 Search
              </button>
          </form>
    </div>
  )
}

export default SearchBar