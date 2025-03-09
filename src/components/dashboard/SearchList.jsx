import React, { useEffect, useState, useContext } from "react";
import "./SearchList.css";
import { AuthContext } from '../../contexts/AuthContext';
import emptyPanel from '../../assets/empty-panel.png';

const SearchList = ({ onSearchClick, refresh }) => {
  const { UID } = useContext(AuthContext);
  const [searches, setSearches] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSearches = async () => {
      if (!UID) {
        setError("Unknown user");
        return;
      }

      try {
        const response = await fetch(`https://api.keywordmagic.io/get_searches?UID=${UID}`);
        if (!response.ok) {
          if (response.status === 402) {
            throw new Error('Account limit reached');
          } else if (response.status === 404) {
            throw new Error("Sorry, couldn't find requested data");
          } else if (response.status === 500) {
            throw new Error('Server busy, please try again later');
          } else {
            throw new Error('Issue occurred, please try again later');
            //throw new Error(`HTTP error! status: ${response.status}`);
          }
        }
        const data = await response.json();
        setSearches(data.queries);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchSearches();
  }, [UID, refresh]); // Re-fetch when UID or refresh prop changes

  const handleSearchClick = (item) => {
    localStorage.setItem('search_query', item);
    onSearchClick(item);
  };

  if (searches.length === 0) {
    return (
      <div className="empty-panel-container fade-in">
        <img src={emptyPanel} alt="No previous searches" style={{ maxWidth: '300px', width: '100%' }} />
      </div>
    );
  }

  return (
    <div className="search-list-container fade-in">
      <div className="search-list-header"> 
        <p>Previous searches</p>
        <span className="arrow">
        <svg height="30px" version="1.1" viewBox="0 0 20 21" width="20px" xmlns="https://www.w3.org/2000/svg" xmlns:sketch="https://www.bohemiancoding.com/sketch/ns" xmlns:xlink="https://www.w3.org/1999/xlink"><title></title><desc></desc><defs></defs><g fill="none" fill-rule="evenodd" id="Page-1" stroke="none" stroke-width="1"><g fill="#fff" id="Core" opacity="0.9" transform="translate(-464.000000, -254.000000)"><g id="history" transform="translate(464.000000, 254.500000)"><path d="M10.5,0 C7,0 3.9,1.9 2.3,4.8 L0,2.5 L0,9 L6.5,9 L3.7,6.2 C5,3.7 7.5,2 10.5,2 C14.6,2 18,5.4 18,9.5 C18,13.6 14.6,17 10.5,17 C7.2,17 4.5,14.9 3.4,12 L1.3,12 C2.4,16 6.1,19 10.5,19 C15.8,19 20,14.7 20,9.5 C20,4.3 15.7,0 10.5,0 L10.5,0 Z M9,5 L9,10.1 L13.7,12.9 L14.5,11.6 L10.5,9.2 L10.5,5 L9,5 L9,5 Z" id="Shape"></path></g></g></g></svg>
        </span>
      </div>
      <div className="search-list">
        {error && <div className="error-message">{error}</div>}
        {searches.map((item, index) => (
          <div className="search-item" key={index} onClick={() => handleSearchClick(item)}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchList;
