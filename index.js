const express = require("express");
const bodyParser = require("body-parser");
const axios = require('axios');
// const Paystack = require('paystack');

const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



const apiUrl = 'http://192.168.1.6:9090/ords/wsts/api/get_stock/01';
const username = 'neoapi';
const password = 'kimo12345!@#$%';

const requestData = {}; // You can pass any data you need in the request body

axios.get(apiUrl, {
  auth: {
    username: username,
    password: password
  }
})
  .then(response => {
    console.log('Response:', response.data);
  })
  .catch(error => {
    console.error('Error:', error.message);
  });




const Shopify = require('shopify-api-node');

const shopify = new  Shopify({
  shopName: 'kimo-group',
  apiKey: '0383bec96d98400dbe214129ec2da5cc',
  password: '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'
});

// async function getInventory() {
//   const shopify = new Shopify({
//     shopName: 'kimo-group',
//     apiKey: '0383bec96d98400dbe214129ec2da5cc',
//     password: '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'
//   });

//   try {
//     let items = await shopify.product.list({ limit: 2 });
//     console.log(items);
//   } catch (err) {
//     console.error('Error:', err.message);
//   }
// }
// getInventory()
async function getProductBySKU(sku) {
  try {
    // Use the `get` method to retrieve a product by SKU
    const product = await shopify.product.get({ query: { sku: sku } });

    console.log('Product:', product);
  } catch (err) {
    console.error('Error:', err.message);
  }
}

// Replace '03349' with the actual SKU of the product you want to fetch
getProductBySKU('03349');

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
