"use client";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [products, setProducts] = useState<string[]>([]);
  const [comparisonData, setComparisonData] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Fetch product list
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://ecomm-realtime-api.mfilterit.net/distinct_title"
        );
        const data = await response.json();
        setProducts(data.titles || []); // Populate dropdown
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleCompare = async () => {
    if (!selectedProduct) {
      alert("Please select a product to compare.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        "https://ecomm-realtime-api.mfilterit.net/real_time_skus",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title: selectedProduct }),
        }
      );
      const { data } = await response.json();
      setComparisonData(data);
    } catch (error) {
      console.error("Error fetching comparison data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 text-center">
      <h1 className="mb-4 text-2xl font-bold">Product Comparison</h1>

      {/* Center Align Dropdown and Button */}
      <div className="flex flex-col items-center">
        <div className="mb-6 flex gap-4">
          <select
            className="w-64 rounded-md border p-2"
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            disabled={isLoading}
          >
            <option value="">Select Product</option>
            {products.map((product) => (
              <option key={product} value={product}>
                {product}
              </option>
            ))}
          </select>
          <button
            className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:opacity-50"
            onClick={handleCompare}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Compare"}
          </button>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
        </div>
      )}

      {/* Grid Layout for Cards */}
      {comparisonData.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {comparisonData.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-between rounded-lg p-4 shadow-lg"
              style={{ backgroundColor: item.color || "#f0f0f0" }}
            >
              <img
                src={item.hero_image_url || "/placeholder.png"}
                alt={item.title}
                className="h-40 w-40 rounded-lg object-cover"
              />
              <div className="mt-4 w-full text-center">
                <h2 className="text-xl font-bold text-black">{item.title}</h2>
                <p className="text-black">
                  <strong>Brand:</strong> {item.brand || "N/A"}
                </p>
                <p className="text-black">
                  <strong>Price:</strong> ₹{item.asp}
                </p>
                <p className="text-black">
                  <strong>MRP:</strong> ₹{item.mrp}
                </p>
                <p className="text-black">
                  <strong>Discount:</strong> {item.discount}
                </p>
                <p className="text-black">
                  <strong>Seller:</strong> {item.seller || "N/A"}
                </p>
                <p className="text-black">
                  <strong>Stock Status:</strong> {item.stock_status || "N/A"}
                </p>
                <p className="text-black">
                  <strong>Rating:</strong> {item.rating || "N/A"}
                </p>
                <a
                  href={item.product_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 text-blue-500 underline"
                >
                  View Product
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
