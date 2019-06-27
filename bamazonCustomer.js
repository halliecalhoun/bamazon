var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "bamazon_db"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    // connection.end();
    start();
  });

  function start() {
    inquirer.prompt([
      {
        name: "confirmInventory",
        type: "confirm",
        message: "Hello! Welcome to Bamazon! Would you like to view our inventory of products?",
        default: true
      }
    ]).then(function(user) {
      if (user.confirmInventory === true) {
        console.log("Great! Please see our inventory below.")
        productsInventory();
      } else {
        console.log("Thank you! If you change your mind, please come again!")
      }
    });
  }

  var productsInventory = function() {
    var query = "SELECT * FROM products";
    connection.query(query, function(err, res) {
      if (err) throw err;
      var table = new Table({
        //You can name these table heads chicken if you'd like. They are simply the headers for a table we're putting our data in
        head: ["ID", "Product Name", "Category", "Price", "Quantity"],
        //These are just the width of the columns. Only mess with these if you want to change the cosmetics of our response
        colWidths: [10, 20, 15, 10, 10]
    });

    // table is an Array, so you can `push`, `unshift`, `splice`
    for (var i = 0; i < res.length; i++) {
        table.push(
            [res[i].id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity],
        );
    }
    console.log(table.toString());
    selectProduct()
});
}
    
function selectProduct() {
  inquirer.prompt([
  {
    name: "inputId",
    type: "input",
    message: "Please enter the ID number of the product you would like to purchase followed by the enter button:"
  },
  {
    name: "inputQuantity",
    type: "input",
    message: "How many units of the selected item would you like to purchase?"
  }
  ]).then(function(answer) {
    connection.query("SELECT * FROM products WHERE id=?", answer.inputId, function(err, res) {
      for (var i = 0; i < res.length; i++) {
        if (answer.inputQuantity > res[i].stock_quantity) {
          console.log("Insufficient quantity in stock. Sorry! Please try again later.");
          start();
        } else {
          console.log("Great! You have selected to purchase: " + "Product: " + res[i].product_name + " Quantity: " + answer.inputQuantity);

          var newStockQuantity = (res[i].stock_quantity - answer.inputQuantity);
          var purchaseItemId = (answer.inputId);
          completePurchase(newStockQuantity, purchaseItemId);
        }
      }
    })
  })
}

function completePurchase(newStockQuantity, purchaseItemId) {
  inquirer.prompt([
    {
      name: "confirmPurchase",
      type: "confirm",
      message: "Are you sure you would like to purchase the selected item and quantity?",
      default: true
    }
]).then(function(userConfirm) {
  if (userConfirm.confirmPurchase === true) {
    connection.query("UPDATE products SET ? WHERE ?", 
    [
      {
      stock_quantity: newStockQuantity
      },
      {
        id: purchaseItemId
      }
  ], function(err, res) {});
  console.log("Transaction complete. Thank you for your purchase!")
  start();
  } else {
    console.log("If you change your mind, please come again!")
    start();
  }
});
}


