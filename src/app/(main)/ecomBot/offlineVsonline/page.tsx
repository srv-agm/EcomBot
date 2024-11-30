"use client";
import { useEffect, useState } from "react";
import Slider from "react-slick";

// Import slick carousel styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function DashboardPage() {
  const [products, setProducts] = useState<string[]>([]);
  const [comparisonData, setComparisonData] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string>("");

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
      setComparisonData(data); // Store API response in state
    } catch (error) {
      console.error("Error fetching comparison data:", error);
    }
  };

  // Updated Slider settings
  const settings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    dots: true,
    autoplay: true,
    autoplaySpeed: 2000,
    centerMode: true,
    centerPadding: '60px',
    className: "center-mode-slider",
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerMode: false
        }
      }
    ]
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">Product Comparison</h1>

      {/* Product Dropdown */}
      <div className="mb-6 flex gap-4">
        <select
          className="w-64 rounded-md border p-2"
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
        >
          <option value="">Select Product</option>
          {products.map((product) => (
            <option key={product} value={product}>
              {product}
            </option>
          ))}
        </select>
        <button
          className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          onClick={handleCompare}
        >
          Compare
        </button>
      </div>

      {/* Updated Carousel container */}
      {comparisonData.length > 0 ? (
        <div className="flex flex-col items-center gap-4">
          <div className="w-full">
            <style jsx global>{`
              .center-mode-slider {
                margin: 0 -60px;
              }
              .center-mode-slider .slick-slide {
                transform: scale(0.8);
                transition: all 0.3s ease;
                opacity: 0.5;
              }
              .center-mode-slider .slick-current {
                transform: scale(1);
                opacity: 1;
              }
              .center-mode-slider .slick-slide > div {
                padding: 0 10px;
              }
              .center-mode-slider .slick-track {
                display: flex;
                align-items: center;
              }
            `}</style>
            <Slider {...settings}>
              {comparisonData.map((item, index) => (
                <div
                  key={index}
                  className="!flex h-[350px] flex-row items-center rounded-lg bg-white p-4 shadow-lg"
                >
                  <img
                    src={item.hero_image_url || "/placeholder.png"}
                    alt={item.title}
                    className="h-40 w-40 rounded-lg object-cover"
                  />
                  <div className="ml-4 flex flex-col">
                    <h2 className="text-xl font-bold">{item.title}</h2>
                    <p className="text-gray-600">
                      <strong>Brand:</strong> {item.brand || "N/A"}
                    </p>
                    <p className="text-gray-600">
                      <strong>Price:</strong> ₹{item.asp}
                    </p>
                    <p className="text-gray-600">
                      <strong>MRP:</strong> ₹{item.mrp}
                    </p>
                    <p className="text-gray-600">
                      <strong>Discount:</strong> {item.discount}
                    </p>
                    <p className="text-gray-600">
                      <strong>Seller:</strong> {item.seller || "N/A"}
                    </p>
                    <p className="text-gray-600">
                      <strong>Stock Status:</strong> {item.stock_status || "N/A"}
                    </p>
                    <p className="text-gray-600">
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
            </Slider>
          </div>
        </div>
      ) : (
        <p className="text-gray-600">
          No comparison data available. Select a product to compare.
        </p>
      )}
    </div>
  );
}
