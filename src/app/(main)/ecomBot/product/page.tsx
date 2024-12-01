"use client";

import { useState, useEffect } from "react";
import ResizableTable from "@/components/mf/TableComponent";

export default function DashboardPage() {
  const columnsBrand: any[] = [
    { title: "Avg ASP", key: "avg_asp" },
    { title: "Avg Discount", key: "avg_discount" },
    { title: "Avg MRP", key: "avg_mrp" },
    { title: "Brand", key: "brand" },
    { title: "Brand Type", key: "brand_type" },
  ];

  const [options, setOptions] = useState<Array<{ key: string; value: string }>>(
    [],
  );
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [forecastImage, setForecastImage] = useState<string>("");
  const [avgProductsData, setAvgProductsData] = useState<any>(null);

  useEffect(() => {
    // Fetch data from your API
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://ecomm-realtime-api.mfilterit.net/get_products",
        );
        const data = await response.json();
        setOptions(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
  };

  const handleSubmit = async () => {
    if (!selectedValue) {
      alert("Please select a product first");
      return;
    }

    setLoading(true);
    try {
      // Call both APIs simultaneously
      const [forecastResponse, avgProductsResponse] = await Promise.all([
        fetch("https://ecomm-realtime-api.mfilterit.net/forecast", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            product_code: selectedValue,
          }),
        }),
        fetch("https://ecomm-realtime-api.mfilterit.net/get_avg_products", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            product_code: selectedValue,
          }),
        }),
      ]);

      const [forecastData, avgData] = await Promise.all([
        forecastResponse.json(),
        avgProductsResponse.json(),
      ]);

      setForecastImage(forecastData.s3_links);
      setAvgProductsData(avgData);
    } catch (error) {
      console.error("Error submitting data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col items-center justify-center space-y-4">
        <label htmlFor="productSelect" className="text-lg font-medium">
          Selected Product Code
        </label>
        <select
          id="productSelect"
          value={selectedValue}
          onChange={handleSelectChange}
          className="w-64 rounded-md border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select a product</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.key}
            </option>
          ))}
        </select>

        <button
          onClick={handleSubmit}
          disabled={!selectedValue || loading}
          className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:bg-gray-400"
        >
          {loading ? "Loading..." : "Submit"}
        </button>
        <hr />
        <hr />
        {forecastImage && (
          <div className="h-[300px]">
            <ResizableTable
              columns={columnsBrand}
              data={avgProductsData?.data ?? []}
              isLoading={false}
              headerColor="#DCDCDC"
              isSearchable
              isSelectable
              isPaginated={false}
            />
          </div>
        )}
        <hr />
        <hr />
        {forecastImage && (
          <div className="mt-8 max-w-full">
            <img
              src={forecastImage}
              alt="Forecast visualization"
              className="rounded-lg shadow-lg"
            />
          </div>
        )}
      </div>
    </div>
  );
}
