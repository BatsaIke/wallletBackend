// const Shopify = require('shopify-api-node');

// // Initialize the Shopify instance with your store's credentials
// const shopify = new Shopify({
//   shopName: "kimo-group",
//   apiKey: "0383bec96d98400dbe214129ec2da5cc",
//   password: "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",
//   apiSecretKey:"bf31bb015257734710bcc79f77fc0f73"
// });
// async function listLocations() {
//   try {
//     const locations = await shopify.location.list();

//     console.log('List of Locations:');
//     console.log('-------------------');

//     locations.forEach((location) => {
//       console.log(`Location ID: ${location.id}`);
//       console.log(`Name: ${location.name}`);
//       console.log('-------------------');
//     });
//   } catch (error) {
//     console.error('Error:', error.response ? error.response.body : error.message);
//   }
// }

// // Call the function to list locations
// // listLocations();

// // Function to list products
// async function listProducts() {
//   try {
//     // Fetch all products from the store
//     const products = await shopify.product.list({ limit: 5 });

//     // Display all properties of each product
//     products.forEach((product) => {
//       console.log('Product Information:');
//       console.log('----------------------');
//       console.log(`ID: ${product.id}`);
//       console.log(`Title: ${product.title}`);
//       console.log(`Handle: ${product.handle}`);
//       console.log(`Product Type: ${product.product_type}`);
//       console.log(`Vendor: ${product.vendor}`);
//       console.log(`Published: ${product.published_at ? 'Yes' : 'No'}`);
//       console.log(`Tags: ${product.tags}`);
      
//       console.log('Variants:');
//       product.variants.forEach((variant, index) => {
//         console.log(variant)
//       });
      
      
      
//       console.log('----------------------');
//     });
//   } catch (error) {
//     console.error('Error:', error.response ? error.response.body : error.message);
//   }
// }

// // Call the function to list products
// listProducts();



const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
const port = 3000;

const Shopify = require("shopify-api-node");

const shopify = new Shopify({
  // apiTOken:"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",
  shopName: "kimo-group",
  apiKey: "0383bec96d98400dbe214129ec2da5cc",
  password: "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",
  apiSecretKey: "bf31bb015257734710bcc79f77fc0f73",
});

const adjustment = 7;
const locationID = 81287643434;

const getAllProducts = async (sinceId = 0) => {
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

      allProducts.push(...products);
      sinceId = products[products.length - 1].id;
    }
  } catch (error) {
    console.error("Error fetching products:", error);
  }

  return allProducts;
};

const logProductsWithVariants = async () => {
  try {
    const products = await getAllProducts();
    let totalProducts = 0;
    let totalVariants = 0;

    for (const product of products) {
      console.log(`Product: ${product.title}`);
      console.log(`Product ID: ${product.id}`);
      
      if (product.variants && product.variants.length > 0) {
        console.log("Variants:");
        for (const variant of product.variants) {
          console.log(`  SKU: ${variant.sku}`);
          console.log(`  Price: ${variant.price}`);
          console.log(`  Inventory Quantity: ${variant.inventory_quantity}`);
          console.log(); // Add an empty line for better readability
          totalVariants++;
        }
      } else {
        console.log("No variants found for this product.");
      }

      console.log(); // Add an empty line between products for better readability
      totalProducts++;
    }

    console.log(`Total Products: ${totalProducts}`);
    console.log(`Total Variants: ${totalVariants}`);
  } catch (error) {
    console.error("Error:", error.message);
  }
};

logProductsWithVariants();


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});




