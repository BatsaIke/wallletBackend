const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const Shopify = require("shopify-api-node");

const app = express();
const port = 3000;

//e-biz
const apiUrl = "http://192.168.1.6:9090/ords/wsts/api/get_stock/01";
const username = "neoapi";
const password = "kimo12345!@#$%";

const locationID = 81287643434;
//shopify
const shopifyConfig = {
  shopName: "kimo-group",
  apiKey: "0383bec96d98400dbe214129ec2da5cc",
  password: "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",
  apiSecretKey: "bf31bb015257734710bcc79f77fc0f73",
};
const shopify = new Shopify(shopifyConfig);


const fetchEbizData = async (offset = 0, limit = 50) => {
    try {
      const response = await axios.get(`${apiUrl}?offset=${offset}&limit=${limit}`, {
        auth: { username, password },
      });
  
      const responseData = response.data;
  
      if (responseData.items && responseData.items.length > 0) {
        return responseData.items;
      } else {
        console.log("No more items or an issue with the response data.");
        return [];
      }
    } catch (error) {
      console.error("Error fetching Ebiz data:", error);
      throw error;
    }
  };
  
  // Function to fetch and cache Ebiz data
  let cachedEbizProducts = null;
  const fetchAndCacheEbizData = async () => {
    if (!cachedEbizProducts) {
      cachedEbizProducts = await fetchEbizData();
    }
    return cachedEbizProducts;
  };
  
  // Function to find an Ebiz product by SKU with pagination support
  const findEbizProductByCode = async (variantSKU, pageSize = 50) => {
    let offset = 0;
    let totalItems = 0;  // Track the total number of items fetched
    let hasMore = true;
    let ebizProduct = null;
  
    while (hasMore) {
      const ebizProductsBatch = await fetchEbizData(offset, pageSize);
  
      // Log the length of the batch
      // console.log('Number of Ebiz Products in Batch:', ebizProductsBatch.length);
  
      totalItems += ebizProductsBatch.length;  // Update the total count
  
      for (const item of ebizProductsBatch) {
        if (item.vc_item_code === variantSKU) {
          ebizProduct = item;
          break;
        }
      }
  
      if (ebizProduct || ebizProductsBatch.length < pageSize) {
        // Stop if the SKU is found or if the batch is smaller than the page size (last batch)
        break;
      }
  
      offset += pageSize;
    }
  
    // Log the total number of items fetched
    console.log('Total Number of Ebiz Products Fetched:', totalItems);
  
    return ebizProduct;
  };
  
  
  const getAllProducts = async (sinceId = 0, limit = 10) => {
    let allProducts = [];
    try {
      while (true) {
        const products = await shopify.product.list({
          limit: 250,
          since_id: sinceId,
          include: ['variants'],
        });
  
        if (products.length === 0) {
          break;
        }
  
        allProducts = allProducts.concat(products);
  
        // Break the loop if the total number of products exceeds the limit
        if (allProducts.length >= limit) {
          break;
        }
  
        sinceId = products[products.length - 1].id;
      }
  
      return allProducts.slice(0, limit);
    } catch (err) {
      console.error("Error fetching Shopify products:", err.message);
      throw err;
    }
  };
  
  async function main() {
    try {
      const products = await getAllProducts();
  
      // Log information about the first 10 products with their variants
      for (const product of products) {
       
  
        for (const variant of product.variants) {
          console.log("Variant SKU:", variant.sku);
          console.log("----------------------------------");
  
          // Use the variant SKU to find a corresponding product in Ebiz data
          const ebizProduct = await findEbizProductByCode("08757");
          if (ebizProduct) {
            console.log("Corresponding Ebiz Product:", ebizProduct);
          } else {
            console.log(`No corresponding Ebiz product found for SKU ${variant.sku}`);
          }
        }
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  }
  
  // Call the main function
  main();
  