import React, { useContext, useState, useEffect, useRef } from "react";
import { AppContext } from "../../store/ContextProvider";
import Tooltip from '../Tooltip';
import Filters from '../dashboard/Filters';

const sortFunctions = {
  competition: (a, b, dir) => ({"High": 3, "Medium": 2, "Low": 1}[a.competition] - {"High": 3, "Medium": 2, "Low": 1}[b.competition]) * (dir === 'asc' ? 1 : -1),
  numeric: (a, b, key, dir) => {
    const numA = parseInt(a[key]?.toString().replace(/,/g, '')) || 0;
    const numB = parseInt(b[key]?.toString().replace(/,/g, '')) || 0;
    return (numA - numB) * (dir === 'asc' ? 1 : -1);
  },
};

const KeywordTable = ({
  headColor,
  showTableInfo,
  keywordData,
  paginationEnabled,
  currentPage,
  entriesPerPage,
  entriesInput,
  onEntriesChange,
  onPageChange
}) => {
  const { keywordData: contextData, UID } = useContext(AppContext);
  const data = keywordData || contextData;
  const isContextDataLoaded = !!contextData && !keywordData;
  const [pageInput, setPageInput] = useState(currentPage);
  const [sortConfig, setSortConfig] = useState(null);
  const [sortedData, setSortedData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [keywordDetails, setKeywordDetails] = useState(null);
  const [selectedKeyword, setSelectedKeyword] = useState("");
  const [insightsData, setInsightsData] = useState(null);
  const [showSearchVolume, setShowSearchVolume] = useState(true);
  const [buttonLabel, setButtonLabel] = useState('AI Insights');
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [negativeSearchQuery, setNegativeSearchQuery] = useState('');
  const [minSearchVolume, setMinSearchVolume] = useState(0);  // State for minimum search volume
  const [maxSearchVolume, setMaxSearchVolume] = useState(Infinity);
  const modalContentRef = useRef(null);

  const [filterState, setFilterState] = useState({
    LowComp: true,
    MediumComp: true,
    HighComp: true,
    NegativeTrend: true,
    FlatTrend: true,
  });

  useEffect(() => {
    if (!data?.titles || !data?.data) return;

    const sortedArray = [...data.data].sort((a, b) => {
      if (!sortConfig) return 0;
      const { key, direction } = sortConfig;

      if (key === 'winning') return (b.winning ? 1 : 0) - (a.winning ? 1 : 0);
      if (key === 'competition') return sortFunctions.competition(a, b, direction);
      if (['competition_index', 'search_volume'].includes(key)) return sortFunctions.numeric(a, b, key, direction);

      return (a[key] < b[key] ? -1 : 1) * (direction === 'asc' ? 1 : -1);
    });

    setSortedData(sortedArray);
  }, [data, sortConfig]);

  if (!data?.titles || !data?.data) return null;

  const totalPages = Math.ceil(data.data.length / entriesPerPage);
  const displayedData = paginationEnabled ? sortedData.slice((currentPage - 1) * entriesPerPage, currentPage * entriesPerPage) : sortedData;

  const downloadData = () => {
    let searchQuery = localStorage.getItem('search_query') || 'keywords';
    searchQuery = searchQuery.replace(/\s+/g, '_');
    const formattedDate = new Date().toISOString().slice(2, 10).replace(/-/g, '');
    const filename = `kwmagic-${searchQuery}-${formattedDate}.csv`;
    const csvContent = [
      data.titles.join(","),
      ...sortedData.map(({ keyword, competition, competition_index, search_volume, trend }) => 
        [keyword, competition, competition_index, search_volume, `${trend}%`].join(",")
      )
    ].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };  

  useEffect(() => {
    setPageInput(currentPage);
  }, [currentPage]);

  useEffect(() => {
    const timer = setTimeout(() => onPageChange(pageInput), 1000);
    return () => clearTimeout(timer);
  }, [pageInput]);

  const handleSort = (key) => {
    let normalizedKey = key.toLowerCase().replace(/\s+/g, '');
    if (normalizedKey === 'difficulty') {
        normalizedKey = 'competition_index';
    } else if (normalizedKey === 'searchvolume') {
        normalizedKey = 'search_volume';
    }
    setSortConfig(prevConfig => ({
      key: normalizedKey,
      direction: prevConfig?.key === normalizedKey && prevConfig.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const getSortArrow = (key) => {
    const normalizedKey = key.toLowerCase().replace(/\s+/g, '') === 'difficulty' ? 'competition_index' : key.toLowerCase().replace(/\s+/g, '');
    return sortConfig?.key === normalizedKey ? (sortConfig.direction === 'asc' ? '↑' : '↓') : '';
  };

  const handleRowClick = async (keyword) => {
    if (isContextDataLoaded) return;
    const UID = JSON.parse(localStorage.getItem('user')).UID;
    const searchQuery = localStorage.getItem('search_query');
    if (!UID || !searchQuery) {
      console.error("UID or search_query not found");
      return;
    }
    setLoading(true);
    setSelectedKeyword(keyword);
    try {
      const response = await fetch(`https://api.keywordmagic.io/get_keyword_details?UID=${UID}&search_query=${searchQuery}&keyword=${keyword}`);
      const result = await response.json();
      setKeywordDetails(result);
      setModalVisible(true);
    } catch (error) {
      throw new Error("Sorry, couldn't find requested data");
    } finally {
      setLoading(false);
    }
  };

  const drawGraph = (monthlyData) => {
    const canvas = document.getElementById("searchVolumeChart");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const padding = 50;
    const graphWidth = canvas.width - padding * 2;
    const graphHeight = canvas.height - padding * 2;

    monthlyData.sort((a, b) => a.year === b.year ? a.month - b.month : a.year - b.year);
    const maxVolume = Math.max(...monthlyData.map(d => d.search_volume));
    const minVolume = Math.min(...monthlyData.map(d => d.search_volume));
    const pointSpacing = graphWidth / (monthlyData.length - 1);

    // Draw axes with thicker lines
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#000";
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, canvas.height - padding);
    ctx.lineTo(canvas.width - padding, canvas.height - padding);
    ctx.stroke();

    // Draw the line graph
    ctx.beginPath();
    monthlyData.forEach((data, index) => {
        const x = padding + index * pointSpacing;
        const y = canvas.height - padding - (data.search_volume / maxVolume) * graphHeight;

        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    ctx.strokeStyle = "#9000ff";
    ctx.stroke();

    // Draw the bubbles separately
    monthlyData.forEach((data, index) => {
        const x = padding + index * pointSpacing;
        const y = canvas.height - padding - (data.search_volume / maxVolume) * graphHeight;

        ctx.beginPath();
        ctx.arc(x, y, 5, 0, 2 * Math.PI); // Larger bubble size
        ctx.fillStyle = "#9000ff";
        ctx.fill();
    });

    // Add x-axis labels with rotation (skip alternate months)
    monthlyData.forEach((data, index) => {
        const isLastPoint = index === monthlyData.length - 1;
        if (index % 2 === 0 || isLastPoint) {
            ctx.save();
            ctx.translate(padding + index * pointSpacing, canvas.height - padding + 20);
            ctx.rotate(-Math.PI / 4);
            ctx.fillStyle = "#000";
            ctx.font = "10px Arial";
            ctx.textAlign = "right";
            ctx.fillText(isLastPoint ? 'Latest' : `${data.month}/${data.year}`, 0, 0);
            ctx.restore();
        }
    });

    // Add y-axis labels (only top and bottom)
    const yPositions = [
        { value: maxVolume, label: maxVolume },
        { value: minVolume, label: minVolume }
    ];

    yPositions.forEach(pos => {
        const y = canvas.height - padding - (pos.value / maxVolume) * graphHeight;
        ctx.save();
        ctx.translate(padding - 10, y);
        ctx.fillStyle = "#000";
        ctx.font = "10px Arial";
        ctx.textAlign = "right";
        ctx.fillText(pos.label, 0, 3);
        ctx.restore();
    });
};

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalContentRef.current && !modalContentRef.current.contains(event.target)) {
        setModalVisible(false);
      }
    };

    if (modalVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalVisible]);

  useEffect(() => {
    if (!loading && keywordDetails && keywordDetails.monthly_searches_full && showSearchVolume) {
      drawGraph(keywordDetails.monthly_searches_full);
    }
  }, [loading, keywordDetails, showSearchVolume]);
  
  useEffect(() => {
    if (!modalVisible) {
      setShowSearchVolume(true);
      setButtonLabel('AI Insights');
    }
  }, [modalVisible]);

  const fetchInsights = async (keyword) => {
    if (buttonLabel === 'View Graph') {
      setShowSearchVolume(true);
      setButtonLabel('AI Insights');
      setButtonDisabled(true);
      setTimeout(() => setButtonDisabled(false), 3000);
    } else {
      setShowSearchVolume(false);
      setLoading(true);
      try {
        const UID = JSON.parse(localStorage.getItem('user')).UID;
        if (!UID) {
          console.error("UID not found");
          return;
        }
        const response = await fetch(`https://api.keywordmagic.io/insights?UID=${UID}&keyword=${keyword}`);
        const insights = await response.json();
        setInsightsData(JSON.parse(insights));
        setButtonLabel('View Graph');
      } catch (error) {
        //console.error('Error fetching insights:', error);
        setInsightsData({ error: 'AI Insights Unavailable' });
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (modalVisible) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  
    return () => {
      document.body.classList.remove('modal-open'); // Cleanup in case the component unmounts
    };
  }, [modalVisible]);

  useEffect(() => {
    if (!data?.titles || !data?.data) return;
  
    let filteredData = [...data.data];
  
    // Apply filters based on search queries
    if (searchQuery) {
      const lowercasedQuery = searchQuery.toLowerCase();
      filteredData = filteredData.filter(item =>
        item.keyword.toLowerCase().includes(lowercasedQuery)
      );
    }
  
    if (negativeSearchQuery) {
      const lowercasedNegativeQuery = negativeSearchQuery.toLowerCase();
      filteredData = filteredData.filter(item =>
        !item.keyword.toLowerCase().includes(lowercasedNegativeQuery)
      );
    }
  
    // Apply search volume range filter
    filteredData = filteredData.filter(item =>
      item.search_volume >= minSearchVolume && item.search_volume <= maxSearchVolume
    );
  
    // Apply filters based on competition
    if (!filterState.LowComp) {
      filteredData = filteredData.filter(item => item.competition !== "Low");
    }
    if (!filterState.MediumComp) {
      filteredData = filteredData.filter(item => item.competition !== "Medium");
    }
    if (!filterState.HighComp) {
      filteredData = filteredData.filter(item => item.competition !== "High");
    }
  
    // Apply filters based on trend
    if (!filterState.NegativeTrend) {
      filteredData = filteredData.filter(item => item.trend >= 0);
    }
    if (!filterState.FlatTrend) {
      filteredData = filteredData.filter(item => item.trend !== 0);
    }
  
    // Apply sorting
    const sortedArray = filteredData.sort((a, b) => {
      if (!sortConfig) return 0;
      const { key, direction } = sortConfig;
  
      if (key === 'winning') return (b.winning ? 1 : 0) - (a.winning ? 1 : 0);
      if (key === 'competition') return sortFunctions.competition(a, b, direction);
      if (['competition_index', 'search_volume'].includes(key)) return sortFunctions.numeric(a, b, key, direction);
  
      return (a[key] < b[key] ? -1 : 1) * (direction === 'asc' ? 1 : -1);
    });
  
    setSortedData(sortedArray);
  }, [data, sortConfig, searchQuery, negativeSearchQuery, minSearchVolume, maxSearchVolume, filterState]);
  
  // Event handlers remain unchanged
  const handleSearch = (query) => {
    setSearchQuery(query);
  };
  
  const handleNegativeSearch = (query) => {
    setNegativeSearchQuery(query);
  };
  
  const handleVolumeChange = (min, max) => {
    setMinSearchVolume(min);
    setMaxSearchVolume(max);
  };
  
  const handleToggleFilters = (newFilterState) => {
    setFilterState(newFilterState);
  };
  
  return (
    <div><Filters onSort={handleSort} onSearch={handleSearch} onNegativeSearch={handleNegativeSearch} onVolumeChange={handleVolumeChange} onToggleFilters={handleToggleFilters} isVisible={!isContextDataLoaded} />
    <div className="kw-table-wrapper">
      <table>
        <thead>
          <tr>
            {data.titles.map((title, index) => (
              <th key={index} style={{ color: headColor, cursor: 'pointer' }} onClick={() => handleSort(title)}>
                {title} {getSortArrow(title)}
                {title === "Trend" && (
                  <Tooltip text="Most recent change in search volume">
                  <span className="question-mark">?</span>
                  </Tooltip>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {displayedData.map((e, index) => (
            <tr key={index} onClick={!isContextDataLoaded ? () => handleRowClick(e.keyword) : null}>
              <td className={`keyword-name ${e.winning ? "winning-keyword" : ""}`}>
                <p>
                  {!e.winning ? e.keyword : (
                    <>
                      {e.keyword}
                      <Tooltip text='Easy to rank!'>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="https://www.w3.org/2000/svg">
                          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#FFBF0F" stroke="#D69D00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </Tooltip>
                    </>
                  )}
                </p>
              </td>
              <td>
                <div className={`${e.competition} competition`}>{e.competition}</div>
              </td>
              <td className="keyword-difficulty">{e.competition_index}</td>
              <td className="keyword-volume">{e.search_volume}</td>
              <td>
                <Tooltip text={`Trend: ${e.trend}%`}>
                  <div className="trend-outer">
                    <div
                      className="trend-inner"
                      data-aos="fade-right"
                      data-aos-once="true"
                      style={{
                        width: `${Math.abs(e.trend)}%`,
                        backgroundColor: e.trend === 0 ? "#CDC0D8" : e.trend > 0 ? "#27BE69" : "#E51030",
                      }}
                    ></div>
                  </div>
                </Tooltip>
              </td>
            </tr>
          ))}
          {showTableInfo && paginationEnabled && (
            <tr className="table-info-tr">
              <td colSpan="5">
                <div className="table-info-container">
                  <div className="table-entry-container">
                    <p>Show</p>
                    <input type="number" value={entriesInput} onChange={onEntriesChange} min="10" max="100" style={{ padding: "5px", textAlign: "center", maxWidth: "30%" }} />
                    <p>entries</p>
                  </div>
                  <p className="table-page-number">Page {currentPage} of {totalPages}</p>
                  <div className="table-page-next-prev-btn-container">
                  <Tooltip text='Sort by keywords with best chance of first page ranking'>
                    <button onClick={() => { setSortConfig({ key: 'winning', direction: 'desc' }); onPageChange(1); }}>
                      <svg xmlns="https://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-star" width="16" height="16">
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                      </svg>
                    </button>
                  </Tooltip>
                  <Tooltip text='Download data as currently sorted'>
                    <button onClick={downloadData}>
                      <svg xmlns="https://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-download" width="16" height="16">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                      </svg>
                    </button>
                    </Tooltip>
                    <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                    <div className="table-entry-container">
                      <input type="number" value={pageInput} onChange={(e) => setPageInput(Math.max(1, Math.min(totalPages, Number(e.target.value))))} min="1" max={totalPages} style={{ padding: "8px", textAlign: "center", width: "50px" }} />
                    </div>
                    <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
                  </div>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {modalVisible && (
      <div className="kw-details">
        <div className="kw-details-content" ref={modalContentRef} style={{ position: 'relative' }}>
        <button 
            style={{ 
              position: 'absolute', 
              top: '5px', 
              right: '15px', 
              background: 'none', 
              border: 'none', 
              fontSize: '20px', 
              cursor: 'pointer',
              color: '9b9b9b'
            }} 
            onClick={() => setModalVisible(false)}
          >
            &times;
          </button>
          <h2>Deeper look at "{selectedKeyword}"</h2>
          {loading ? (
            <div class="loader2-center"><span class="loader2"></span></div>
          ) : (
            <div>
              {keywordDetails.error ? (
                <p>{keywordDetails.error}</p>
              ) : (
                <div>
                  {keywordDetails.low_top_of_page_bid !== 'null' &&
                  keywordDetails.high_top_of_page_bid !== 'null' ? (
                    <>
                      <div className="ad-price" style={{ marginTop: '20px', padding: '2%', textAlign: 'center' }}>
                        <b>⬅️ Page Bottom | Average AD price | Page Top ➡️</b>
                        <div style={{ display: 'flex', marginTop: '2%', justifyContent: 'center', alignItems: 'center' }}>
                          <span>${keywordDetails.low_top_of_page_bid}</span>
                          <span style={{ flexGrow: 1, borderBottom: '3px solid #9000ff', margin: '0 10px' }}></span>
                          <span>
                            ${((parseFloat(keywordDetails.low_top_of_page_bid) + parseFloat(keywordDetails.high_top_of_page_bid)) / 2).toFixed(2)}
                          </span>
                          <span style={{ flexGrow: 1, borderBottom: '3px solid #9000ff', margin: '0 10px' }}></span>
                          <span>${keywordDetails.high_top_of_page_bid}</span>
                        </div>
                      </div>
                      <div className="cpc-line" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px' }}>
                        <b>Average Cost Per Click: 
                          <span className="cpc-circle" style={{
                            display: 'inline-block',
                            marginLeft: '5px',
                            backgroundColor: keywordDetails.cpc < 2 ? '#41b560' : keywordDetails.cpc > 10 ? '#d92e47' : '#ff9717',
                            color: 'white',
                            borderRadius: '50%',
                            width: '45px',
                            height: '45px',
                            lineHeight: '45px',
                            textAlign: 'center',
                            fontWeight: 'bold',
                            fontSize: '12px',
                          }}>
                            ${keywordDetails.cpc !== 'null' ? keywordDetails.cpc : "N/A"}
                          </span>
                        </b>
                        <button 
                          className="ai-button" 
                          style={{
                            marginLeft: '30px',
                            padding: '10px 30px',
                            fontSize: '14px',
                            fontWeight: 'bold',
                            borderRadius: '8px',
                            borderColor: '#9000ff',
                            background: 'white',
                            backgroundClip: 'padding-box',
                            cursor: 'pointer',
                          }}
                          onMouseEnter={(e) => e.target.style.boxShadow = '0 0 10px 5px rgba(239, 214, 255, 0.8)'}
                          onMouseLeave={(e) => e.target.style.boxShadow = 'none'}
                          onClick={() => fetchInsights(selectedKeyword)} 
                          disabled={buttonDisabled}
                        >
                          {buttonLabel}
                        </button>
                      </div>
                    </>
                  ) : (
                    <p style={{ marginTop: '15px', padding: '2%', textAlign: 'center' }}>Additional data not available for this keyword</p>
                  )}
                  {showSearchVolume ? (
                    <div style={{
                      border: '1px solid #ccc',
                      borderRadius: '10px',
                      padding: '20px',
                      marginTop: '20px',
                      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                      textAlign: 'center',
                    }}>
                      Search volume history
                      <canvas id="searchVolumeChart" className="chart-canvas" width="440" height="200"></canvas>
                    </div>
                  ) : (
                    loading ? (
                      <div class="loader2-center"><span class="loader2"></span></div>
                    ) : (
                      <div style={{
                        border: '1px solid #ccc',
                        borderRadius: '10px',
                        padding: '20px',
                        marginTop: '20px',
                        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                        textAlign: 'center',
                      }}>
                        <div>
                          <b>Keyword Explanation:</b>
                          <p>{insightsData?.keywordExplanation?.content || 'No explanation available'}</p>

                          <b>Search Intent:</b>
                          <p>{insightsData?.searchIntent?.content || 'No search intent available'}</p>

                          <b>Search Focus:</b>
                          <p>{insightsData?.searchFocus?.content || 'No search focus available'}</p>

                          <b>Related Search Queries:</b>
                          <ul>
                            {insightsData?.relatedSearchQueries?.content
                              ? insightsData.relatedSearchQueries.content.split(',').map((query, index) => (
                                  <p key={index}>{query.trim()}</p>
                                ))
                              : <p>No related queries found.</p>}
                          </ul>

                          <b>Related Search Questions:</b>
                          <ul>
                            {insightsData?.relatedSearchQuestions?.content
                              ? insightsData.relatedSearchQuestions.content.split(',').map((question, index) => (
                                  <p key={index}>{question.trim()}</p>
                                ))
                              : <p>No related questions found.</p>}
                          </ul>
                        </div>
                      </div>
                    )
                  )}
                  {keywordDetails.keyword_annotations && keywordDetails.keyword_annotations.concepts && keywordDetails.keyword_annotations.concepts.length > 0 ? (
                    <div style={{ marginTop: '5px', marginBottom: '-10px', padding: '5px', fontSize: '14px' }}>
                      <p><b>Tags: </b>
                        {keywordDetails.keyword_annotations.concepts
                          .map(concept => `${concept.name.toLowerCase()}`)
                          .join(', ')}
                      </p>
                    </div>
                  ) : (
                    <p style={{ padding: '2%', textAlign: 'center' }}>No tags available</p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    )}
    </div>
    </div>
  );
};

export default KeywordTable;