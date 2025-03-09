import React, { useState, useRef } from "react";

const Filters = ({
  onSort,
  onSearch,
  onNegativeSearch,
  onVolumeChange,
  onToggleFilters,
  isVisible,
}) => {
  const [state, setState] = useState({
    activeFilter: null,
    sortDirection: "asc",
    searchQuery: "",
    negativeSearchQuery: "",
    minSearchVolume: 0,
    maxSearchVolume: 1000000,
    filterState: {
      lowComp: true,
      mediumComp: true,
      highComp: true,
      negativeTrend: true,
      zeroTrend: true,
    },
  });

  const sliderTrackRef = useRef(null);

  const handleThumbMove = (e, thumb) => {
    const clientX = e.clientX || e.touches[0].clientX;
    const trackRect = sliderTrackRef.current.getBoundingClientRect();
    const newPosition = Math.min(
      Math.max(clientX - trackRect.left, 0),
      trackRect.width
    );
    const newValue = Math.round((newPosition / trackRect.width) * 1000000);
    const updatedState =
      thumb === "min"
        ? {
            minSearchVolume: Math.min(newValue, state.maxSearchVolume - 1),
          }
        : {
            maxSearchVolume: Math.max(newValue, state.minSearchVolume + 1),
          };
  
    setState((prevState) => ({
      ...prevState,
      ...updatedState,
    }));
  
    onVolumeChange(
      updatedState.minSearchVolume || state.minSearchVolume,
      updatedState.maxSearchVolume || state.maxSearchVolume
    );
  };  

  const handleSort = (key) => {
    const newDirection =
      state.activeFilter === key && state.sortDirection === "asc"
        ? "desc"
        : "asc";
    setState((prevState) => ({
      ...prevState,
      activeFilter: key,
      sortDirection: newDirection,
    }));
    onSort(key, newDirection);
  };

  const handleInputChange = (e, type) => {
    const value = e.target.value;
    setState((prevState) => ({
      ...prevState,
      [type]: value,
    }));
    type === "searchQuery" ? onSearch(value) : onNegativeSearch(value);
  };

  const handleToggle = (filter) => {
    const newFilterState = {
      ...state.filterState,
      [filter]: !state.filterState[filter],
    };
    setState((prevState) => ({
      ...prevState,
      filterState: newFilterState,
    }));
    onToggleFilters(newFilterState);
  };

  if (!isVisible) return null;

  return (
    <div className="filters-container">
      <div className="filters-header"> 
        <p>Keyword Filters</p></div>
      <div className="filters-wrap">
      <div className="filter-buttons">
      <p>Sort by ascending or descending:</p>
        {["keyword", "Comp", "difficulty", "search_volume", "trend"].map(
          (key) => (
            <button
              key={key}
              className={`filter-btn ${
                state.activeFilter === key ? "active" : ""
              }`}
              onClick={() => handleSort(key)}
            >
              {key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ')}{" "}
              {state.activeFilter === key
                ? state.sortDirection === "asc"
                  ? "↑"
                  : "↓"
                : ""}
            </button>
          )
        )}
      </div>
      <div className="toggle-filters">
      <p>Show keywords with:</p>
        {[
          "LowComp",
          "MediumComp",
          "HighComp",
          "NegativeTrend",
          "FlatTrend",
        ].map((filter) => (
          <label key={filter}>
            <input
              type="checkbox"
              checked={state.filterState[filter]}
              onChange={() => handleToggle(filter)}
            />
            {filter.replace(/([A-Z])/g, " $1").trim()}
          </label>
        ))}
      </div>
      <div className="search-box">
      <p>Sort by exact keyword:</p>
        <input
          type="text"
          placeholder="Require keyword"
          value={state.searchQuery}
          onChange={(e) => handleInputChange(e, "searchQuery")}
          className="search-input"
        />
        <input
          type="text"
          placeholder="Exclude keyword"
          value={state.negativeSearchQuery}
          onChange={(e) => handleInputChange(e, "negativeSearchQuery")}
          className="search-input"
        />
      </div>
      <div className="volume-slider">
        <p>Sort by search volume:</p>
        <div className="slider-track" ref={sliderTrackRef}>
        {["min", "max"].map((thumb) => (
            <div
              key={thumb}
              className={`slider-thumb slider-thumb-${thumb}`}
              style={{
                left: `${(state[`${thumb}SearchVolume`] / 1000000) * 100}%`,
              }}
              onMouseDown={(e) => {
                document.onmousemove = (event) => handleThumbMove(event, thumb);
                document.onmouseup = () => {
                  document.onmousemove = null;
                  document.onmouseup = null;
                };
              }}
              onTouchStart={(e) => {
                document.ontouchmove = (event) => handleThumbMove(event.touches[0], thumb);
                document.ontouchend = () => {
                  document.ontouchmove = null;
                  document.ontouchend = null;
                };
              }}
            />
          ))}
          <div
            className="slider-range"
            style={{
              left: `${(state.minSearchVolume / 1000000) * 100}%`,
              right: `${100 - (state.maxSearchVolume / 1000000) * 100}%`,
            }}
          />
        </div>
        <div className="slider-values">
          <span>Min: {state.minSearchVolume}</span>
          <span>Max: {state.maxSearchVolume}</span>
        </div>
      </div>
        </div>
    </div>
  );
};

export default Filters;