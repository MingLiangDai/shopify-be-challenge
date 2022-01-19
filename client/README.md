# Shopify Backend Challenge Summer 2022

This project was created for the Shopify Backend Intern Challenge Summer 2022

## Demo

Currently Unavailable

## Tech stack

MERN: MongoDB, Express, Node.js, React

## Functions

1. Basic CRUD (Creact, Read, Update, Delete) operations on Inventory Items
2. Inventory Items can be packaged into a shipment package to be shipped out, reducing the inventory count of the items shipped out
3. New shipments could come in as well, increasing the inventory count of the items shipped in

## How to clone and run

1. `git clone` the repository
2. run `yarn` to install all dependencies
3. connect to your own MongoDB cluster by assigning your own connection string to the uri variable at config/db.js -> uri
4. run `yarn start` to start the backend server
5. open up another terminal and run `cd client && yarn start` to start up the React frontend
