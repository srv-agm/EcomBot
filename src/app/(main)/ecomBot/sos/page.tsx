"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import ResizableTable from "@/components/mf/TableComponent";

interface ResponseData {
  data: any[];
}

const columns: any[] = [
  { title: "Rank", key: "search_rank" },
  { title: "Listing Type", key: "organic_sponsored_brand_sponsored" },
  {
    title: "Product Image",
    key: "image_url",
    render: (data: any) => (
      <img
        src={data.image_url}
        alt="Product"
        className="h-16 w-16 rounded-md"
      />
    ),
  },
  {
    title: "Product URL",
    key: "product_url",
    render: (data: any) => (
      <a
        href={data.product_url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 underline"
      >
        🔗
      </a>
    ),
  },
  { title: "Title", key: "title_local" },
  { title: "Platform", key: "platform" },
  { title: "ASP", key: "asp" },
  { title: "MRP", key: "mrp" },
];

export default function DashboardPage() {
  const [keyword, setKeyword] = useState("");
  const [platform, setPlatform] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState<ResponseData | null>(null);

  const handleSubmit = async () => {
    // console.log(responseData , "asdasdasdadasdad");

    if (!keyword || !platform) {
      toast.error("Please select both keyword and platform");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        "https://ecomm-realtime-api.mfilterit.net/sos_keywords",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: [
              {
                keyword: keyword,
                platform: platform,
              },
            ],
          }),
        },
      );

      if (response.ok) {
        const data = await response.json();
        setResponseData(data);
        toast.success("Submitted successfully!");
        setKeyword("");
        setPlatform("");
        setLocation("");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  console.log(responseData, "asdasdasd");

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-2xl font-bold">SOS</h1>

      {/* Dropdown container */}
      <div className="mb-6 flex gap-4">
        {/* Keyword Input */}
        <input
          type="text"
          placeholder="Enter Keyword"
          className="w-1/3 rounded-md border p-2"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <select
          className="w-1/3 rounded-md border p-2"
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
        >
          <option value="">Select Platform</option>
          <option value="amazon_app">Amazon</option>
          <option value="flipkart_app">Flipkart</option>
          <option value="bigbasket_app">Big Basket</option>
          <option value="zepto_app">Zepto</option>
        </select>
        <select className="w-1/3 rounded-md border p-2">
          <option value="mumbai">Mumbai</option>
          <option value="delhi">Delhi</option>
          <option value="bengaluru">Bengaluru</option>
          <option value="hyderabad">Hyderabad</option>
          <option value="ahmedabad">Ahmedabad</option>
          <option value="chennai">Chennai</option>
          <option value="kolkata">Kolkata</option>
          <option value="pune">Pune</option>
          <option value="jaipur">Jaipur</option>
          <option value="lucknow">Lucknow</option>
          <option value="kanpur">Kanpur</option>
          <option value="nagpur">Nagpur</option>
          <option value="indore">Indore</option>
          <option value="thane">Thane</option>
          <option value="bhopal">Bhopal</option>
          <option value="visakhapatnam">Visakhapatnam</option>
          <option value="pimpri-chinchwad">Pimpri-Chinchwad</option>
          <option value="patna">Patna</option>
          <option value="vadodara">Vadodara</option>
          <option value="ghaziabad">Ghaziabad</option>
          <option value="ludhiana">Ludhiana</option>
          <option value="agra">Agra</option>
          <option value="nashik">Nashik</option>
          <option value="faridabad">Faridabad</option>
          <option value="meerut">Meerut</option>
          <option value="rajkot">Rajkot</option>
          <option value="kalyan-dombivli">Kalyan-Dombivli</option>
          <option value="vasai-virar">Vasai-Virar</option>
          <option value="varanasi">Varanasi</option>
          <option value="srinagar">Srinagar</option>
          <option value="aurangabad">Aurangabad</option>
          <option value="dhanbad">Dhanbad</option>
          <option value="amritsar">Amritsar</option>
          <option value="navi-mumbai">Navi Mumbai</option>
          <option value="allahabad">Allahabad</option>
          <option value="ranchi">Ranchi</option>
          <option value="howrah">Howrah</option>
          <option value="coimbatore">Coimbatore</option>
          <option value="jabalpur">Jabalpur</option>
          <option value="gwalior">Gwalior</option>
          <option value="vijayawada">Vijayawada</option>
          <option value="jodhpur">Jodhpur</option>
          <option value="madurai">Madurai</option>
          <option value="raipur">Raipur</option>
          <option value="kota">Kota</option>
          <option value="guwahati">Guwahati</option>
          <option value="chandigarh">Chandigarh</option>
          <option value="solapur">Solapur</option>
          <option value="hubballi-dharwad">Hubballi-Dharwad</option>
        </select>
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 ${
            loading ? "cursor-not-allowed opacity-50" : ""
          }`}
        >
          {loading ? "Processing..." : "Process"}
        </button>
      </div>

      {responseData && !loading && (
        <div className="mt-4 rounded border bg-gray-100 p-4">
          <ResizableTable
            columns={columns}
            data={responseData?.data ?? []}
            isLoading={false}
            headerColor="#DCDCDC"
            isSearchable
            isSelectable
          />
        </div>
      )}
    </div>
  );
}
