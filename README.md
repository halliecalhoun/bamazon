# Bamazon


# Description
 This application consists of a command line based storefront that will take in orders from customers and deplete stock from the store's inventory. This app uses the npm inquirer package and the MySQL database backend together with the npm mysql package. 

# Deployment

* Clone repository and change into that directory
* Within Terminal or Gitbash run the commannd 'npm install'
* Within Terminal or Gitbash run the command 'node bamazonCustomer.js'
* To exit, run 'ctrl + C'

# How it works

* Displays the store's inventory of products
* Prompts the customer to enter the unique ID of the product they would like to purchase
* Confirms the selection and quantity with the customer before proceeding
* If the customer confirms it will check if there is enough in stock of that specific product before continuing
* If there is enough in stock, it will complete the transaction and update the products database with the new stock quantity amount for that specific item purchased
* Whether the customer confirms to purchase or not, it will ask them if they would like to purchase another product
* If the customer would like to purchase another product, it will run the inventory function again with the updated inventory amount that was deducted from the prior item purchased
* If the customer would not like to purchase a product, it will thank them for coming and ask them to visit Bamazon again

# Demo:

![GIF1](assets\images\gif1.gif)

![GIF2](assets\images\gif2.gif)


# Technology Used
* JavaScript
* Node.js
* MySQL
* npm packages: 
    * mysql (https://www.npmjs.com/package/mysql)
    * inquirer (https://www.npmjs.com/package/inquirer)
    * cli-table (https://www.npmjs.com/package/cli-table)
    * chalk (https://www.npmjs.com/package/chalk)

# Author
Hallie Calhoun

