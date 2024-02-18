import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

function Catalog() {
  const [catalogItems, setCatalogItems] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    const currentDate = moment().utc().format("DDMMYYYYHHmmss");
    console.log(currentDate);
    // Function to fetch catalog items
    const fetchCatalogItems = async () => {
      try {
        // Retrieve token from localStorage
        const token = localStorage.getItem("token");

        // Generate current UTC date in the required format: ddMMyyyyHHmmss using Moment.js
        const currentDate = moment().utc().format("DDMMYYYYHHmmss");

        // Make request to fetch items in the catalog using the token
        const response = await axios.get("http://localhost:4000/api/catalog/", {
          headers: {
            "X-GIFTLOV-DATE": currentDate,
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        });

        // Set catalog items state with the fetched data
        setCatalogItems(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch catalog items:", error);
        setLoading(false);
      }
    };

    // Call the fetchCatalogItems function
    fetchCatalogItems();
  }, []);

  return (
    <div>
      <h1>Catalog</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {catalogItems.length > 0 ? (
        <ul>
          {catalogItems.map((item, index) => (
            <li key={index}>{/* Render each catalog item here */}</li>
          ))}
        </ul>
      ) : (
        <p>No items found in the catalog.</p>
      )}
    </div>
  );
}

export default Catalog;
