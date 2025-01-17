import React, { useState, useEffect } from "react";
import { useDashboard } from "../contexts/DashboardContext";
import "./StatsChart.css";

const StatsChart = () => {
  const { dashboardData } = useDashboard();
  const [yearOFPlacement, setYearOFPlacement] = useState([]);
  const [barHeightMultiplier, setBarHeightMultiplier] = useState(19);
  console.log(dashboardData)
  useEffect(() => {
    if (dashboardData.yearOFPlacement && typeof dashboardData.yearOFPlacement === "object") {
      const formattedData = Object.entries(dashboardData.yearOFPlacement).map(([year, value]) => ({
        year: parseInt(year, 10),
        value,
      }));

      formattedData.sort((a, b) => a.year - b.year);
      setYearOFPlacement(formattedData);
    }

    const updateBarHeightMultiplier = () => {
      if (window.innerWidth < 576) {
        setBarHeightMultiplier(7);
      } else if (window.innerWidth >= 576 && window.innerWidth < 796) {
        setBarHeightMultiplier(7);
      } else if (window.innerWidth >= 796 && window.innerWidth < 1024) {
        setBarHeightMultiplier(7);
      } else if (window.innerWidth >= 1024 && window.innerWidth < 1500) {
        setBarHeightMultiplier(7);
      } else {
        setBarHeightMultiplier(7);
      }
    };

    updateBarHeightMultiplier();
    window.addEventListener("resize", updateBarHeightMultiplier);

    return () => window.removeEventListener("resize", updateBarHeightMultiplier);
  }, [dashboardData]);



 

  return (
    <div className="stats-chart-container">
      {yearOFPlacement.length === 0 ? (
        <p>No data available</p>
      ) : (
        <div className="chart-container">
          <div className="chart">
            {yearOFPlacement.map((item, index) => (
              <div className="bar-container" key={index}>
                <span className="bar-value">{item.year}</span>
                <div
                  className="bar"
                  style={{
                    "--bar-height": `${item.value / barHeightMultiplier}px`,
                    animationDelay: `${index * 0.2}s`,
                  }}
                  title={`${item.value}`}
                ></div>
                <span className="year-label">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      <p className="span-text">
        In The Span Of <span className="span-six-years">{yearOFPlacement.length} Years</span>
      </p>
    </div>
  );
};

export default StatsChart;
