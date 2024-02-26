// const express = require("express");
// const bodyParser = require("body-parser");
// const axios = require("axios");
// const Shopify = require("shopify-api-node");

// const app = express();
// const port = 3000;

// //e-biz
// const apiUrl = "http://192.168.1.6:9090/ords/wsts/api/get_stock/01";
// const username = "neoapi";
// const password = "kimo12345!@#$%";

// const locationID = 81287643434;
// //shopify
// const shopifyConfig = {
//   shopName: "kimo-group",
//   apiKey: "0383bec96d98400dbe214129ec2da5cc",
//   password: "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",
//   apiSecretKey: "bf31bb015257734710bcc79f77fc0f73",
// };
// const shopify = new Shopify(shopifyConfig);

// async function getAllProducts(sinceId = 0) {
//   let allProducts = [];
//   try {
//     while (true) {
//       const products = await shopify.product.list({
//         limit: 250,
//         since_id: sinceId,
//       });

//       if (products.length === 0) {
//         break;
//       }

//       allProducts = allProducts.concat(products);
//       sinceId = products[products.length - 1].id;
//     }

//     return allProducts;
//   } catch (err) {
//     console.error("Error:", err.message);
//   }
// }

// async function fetchData() {
//   try {
//     // Assuming apiUrl, username, and password are defined
//     const response = await axios.get(apiUrl, {
//       auth: { username: username, password: password },
//     });
//     const responseData = response.data;

//     if (responseData.items && responseData.items.length >= 10) {
//       const itemNumber3 = responseData.items[7];
//       console.log("Item Number 3:", itemNumber3);

//       const allProducts = await getAllProducts(itemNumber3.id);

//       await updateProductPrice(
//         itemNumber3.vc_item_code,
//         itemNumber3.nu_selling_price,
//         itemNumber3.available_qty,
//         allProducts
//       );
//     } else {
//       console.log("Not enough items in the response data.");
//     }
//   } catch (error) {
//     console.error("Error:", error.message);
//   }
// }

// async function updateProductPrice(
//   itemCode,
//   newPrice,
//   newQuantity,
//   allProducts
// ) {
//   try {
//     for (const product of allProducts) {
//       if (product.variants && product.variants.length > 0) {
//         for (const variant of product.variants) {
//           if (variant.sku === itemCode) {
//             variant.price = newPrice;

//             try {
//               await shopify.inventoryLevel.set({
//                 inventory_item_id: variant.inventory_item_id,
//                 available: newQuantity,
//                 location_id: locationID,
               
//                 // available_adjustment: newQuantity,
//               });
//               console.log("Inventory level successfully adjusted!");
//             } catch (error) {
//               console.error("Response status code:", error.response.statusCode);
//               console.error("Response body:", error.response.body);
//             }

//             // Save the updated product to Shopify
//             await shopify.product.update(product.id, {
//               variants: [variant],
//             });

//             console.log(
//               `Price and quantity updated for product ${product.title}, variant ${variant.title} (SKU: ${itemCode}) to ${newPrice} and ${newQuantity}`
//             );
//             return; // If you only want to update the first matching variant, you can remove this line to continue searching for other matches.
//           }
//         }
//       }
//     }

//     console.log(`No product with SKU ${itemCode} found.`);
//   } catch (err) {
//     console.error("Error:", err.message);
//   }
// }

// // Call the fetchData function
// fetchData();

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });




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

      for (const product of products) {
        if (product.variants) {
          
          for (const variant of product.variants) {
           
          }
        }
      }

      allProducts = allProducts.concat(products);
      sinceId = products[products.length - 1].id;
    }

    return allProducts;
  } catch (err) {
    console.error("Error fetching Shopify products:", err.message);
  }
};


async function fetchData() {
  try {
    let offset = 0;
    let hasMore = true;
    let allEbizItems = [];

    const response = await axios.get(apiUrl, {
      auth: { username: username, password: password },
    });

    while (hasMore) {
      const response = await axios.get(`${apiUrl}?offset=${offset}`, {
        auth: { username: username, password: password },
      });
      const responseData = response.data;

      if (responseData.items && responseData.items.length > 0) {
        allEbizItems = allEbizItems.concat(responseData.items);
        offset += responseData.items.length;
        hasMore = responseData.hasMore;
      } else {
        console.log("No more items or an issue with the response data.");
        hasMore = false;
      }
    }


     // Display only the first five items
     const firstFiveItems = allEbizItems.slice(0, 5);
     console.log("First five items:", firstFiveItems);
 
     for (const ebizItem of firstFiveItems) {
      const allProducts = await getAllProducts(ebizItem.vc_item_code);
      console.log(`Shopify product for vc_item_code ${ebizItem.vc_item_code}:`);

      await updateProductPrice(
        ebizItem.vc_item_code,
        ebizItem.nu_selling_price,
        ebizItem.available_qty,
        allProducts
      );
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
}

async function updateProductPrice(
  itemCode,
  newPrice,
  newQuantity,
  allProducts
) {
  try {
    for (const product of allProducts) {
      if (product.variants && product.variants.length > 0) {
        for (const variant of product.variants) {
          if (variant.sku === itemCode) {
            variant.price = newPrice;

            try {
              await shopify.inventoryLevel.set({
                inventory_item_id: variant.inventory_item_id,
                available: newQuantity,
                location_id: locationID,
               
                // available_adjustment: newQuantity,
              });
              console.log("Inventory level successfully adjusted!");
            } catch (error) {
              console.error("Response status code:", error.response.statusCode);
              console.error("Response body:", error.response.body);
            }

            // Save the updated product to Shopify
            await shopify.product.update(product.id, {
              variants: [variant],
            });

            console.log(
              `Price and quantity updated for product ${product.title}, variant ${variant.title} (SKU: ${itemCode}) to ${newPrice} and ${newQuantity}`
            );
            return; // If you only want to update the first matching variant, you can remove this line to continue searching for other matches.
          }
        }
      }
    }

    console.log(`No product with SKU ${itemCode} found.`);
  } catch (err) {
    console.error("Error:", err.message);
  }
}
async function updateProductPrice(itemCode, newPrice, newQuantity, allProducts) {
  try {
    for (const product of allProducts) {
      if (product.variants && product.variants.length > 0) {
        for (const variant of product.variants) {
          if (variant.sku === itemCode) {
            variant.price = newPrice;

            try {
              await shopify.inventoryLevel.set({
                inventory_item_id: variant.inventory_item_id,
                available: newQuantity,
                location_id: locationID,
                // available_adjustment: newQuantity, // Uncomment if you want to adjust by a specific amount
              });

              console.log("Inventory level successfully adjusted!");
            } catch (error) {
              console.error("Response status code:", error.response.statusCode);
              console.error("Response body:", error.response.body);
            }

            // Save the updated product to Shopify
            await shopify.product.update(product.id, {
              variants: [variant],
            });

            console.log(`Price and quantity updated for product ${product.title}, variant ${variant.title} (SKU: ${itemCode}) to ${newPrice} and ${newQuantity}`);
            console.log("Updated Variant:", variant); // Log information about the updated variant
            // return; // If you want to update all matching variants, you can remove this line
          }
        }
      }
    }

    console.log(`No product with SKU ${itemCode} found.`);
  } catch (err) {
    console.error("Error:", err.message);
  }
}


// Call the fetchData function
fetchData();

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
