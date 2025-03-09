import React, { createContext } from "react";

// Create the context
const AppContext = createContext();

// Create a provider component
const AppProvider = ({ children }) => {
  //   const [state, setState] = useState("default value");
  5;
  const keywordData = {
    titles: ["Keyword", "Competition", "Difficulty", "Search volume", "Trend"],
    data: [
      {
        keyword: "Meal Food",
        competition: "High",
        competition_index: 95,
        search_volume: 843000,
        trend: 800,
      },
      {
        keyword: "Food delivery near me",
        competition: "Medium",
        competition_index: 42,
        search_volume: 400000,
        trend: 90,
      },
      {
        keyword: "Meal delivery services",
        competition: "Medium",
        competition_index: 31,
        search_volume: 534930,
        trend: 45,
      },
      {
        keyword: "Best meal delivery service",
        competition: "Medium",
        competition_index: 53,
        search_volume: 24500,
        trend: 20,
      },
      {
        keyword: "Healthy meal delivery",
        competition: "Low",
        competition_index: 1,
        search_volume: 94400,
        trend: 300,
        winning: true,
      },
      {
        keyword: "Meal kit delivery",
        competition: "Low",
        competition_index: 10,
        search_volume: 7550,
        trend: -25,
      },
      {
        keyword: "Pre made meal service",
        competition: "Medium",
        competition_index: 34,
        search_volume: 29500,
        trend: -30,
      },
      {
        keyword: "Best meal kit nearby",
        competition: "Low",
        competition_index: 25,
        search_volume: 400,
        trend: 20,
      },
      {
        keyword: "Cheaper meal delivery near me",
        competition: "Low",
        competition_index: 12,
        search_volume: 24900,
        trend: 250,
      },
      {
        keyword: "Weight loss meal delivery",
        competition: "High",
        competition_index: 93,
        search_volume: 2040,
        trend: -42.86,
      }
    ],
  };

  const value = {
    keywordData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export { AppContext };

export default AppProvider;
