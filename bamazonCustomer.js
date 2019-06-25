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
    purchaseProduct();
  });

function purchaseProduct() {
  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
   
    inquirer
      .prompt([
        {
          name: "choice",
          type: "rawlist",
          choices: function() {
            var choiceArray = [];
            for (var i = 0; i < results.length; i++) {
              choiceArray.push(results[i].product_name);
              // choiceArray.push(results[i].id + " " + results[i].product_name);
            }
            return choiceArray;
          },
          // name: "itemId",
          // type: "list",
          message: "What is the ID of the product you would you like to buy?"
        },
        {
          name: "quantity",
          type: "input",
          message: "How many would you like to buy?"
          // validate: function(value) {
          //   if (isNaN(value) === false) {
          //     return true;
          //   }
          //   return false;
          // }
        }
      ])
      .then(function(answer) {
        // get the information of the chosen item
        var chosenItem;
        for (var i = 0; i < results.length; i++) {
          if (results[i].product_name === answer.choice) {
            chosenItem = results[i];
            // stock_quantity = chosenItem.stock_quantity;
          //   if (results[i].item_name === answer.choice) {
          //     chosenItem = results[i];
          }
          
          
        }
        // determine if quantity requested is lower than stock quantity
        if (chosenItem.stock_quantity < parseInt(answer.quantity)) {
          // bid was high enough, so update db, let the user know, and start over
          connection.query(
            "UPDATE products SET ? WHERE ?",
            [
              {
                stock_quantity: answer.quantity
              },
              {
                product_name: chosenItem.product_name
              }
            ],
            function(error) {
              if (error) throw err;
              // console.log("Successfully purchasd " + stock_quantity + " " + product_name + "!");
              console.log("Successfully purchasd!");
              // readProducts();
            }
          );
        }
        else {
          // bid wasn't high enough, so apologize and start over
          console.log("Insufficient quantity! Sorry, please try again!");
          // start();
        }
      
      })
  });
}

function readProducts() {
  console.log("Selecting all products...\n");
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.log(res);
    connection.end();
  });
}





//   inquirer.prompt([
  
//         if (isNaN(value) === false) {
//           return true;
//         }
//         return false;
//       }
//     }
//   ])
//   .then(function(answer) {
//     // when finished prompting, insert a new item into the db with that info
//     connection.query(
//       "INSERT INTO products SET ?",
//       {
//         id: answer.itemId,
//         // product_name: answer.item,
//         quantity: answer.itemQuantity,
//         // category: answer.category,
//         // starting_bid: answer.startingBid,
//         // highest_bid: answer.startingBid
//       },
//       function(err) {
//         if (err) throw err;
//         console.log("Your auction was created successfully!");
//         // re-prompt the user for if they want to bid or post
//         start();
//       }
//     );
//   });
// }




//   function afterConnection() {
//   connection.query("SELECT * FROM products", function(err, res) {
//     if (err) throw err;
//     console.log(res);
//     connection.end();
//   });
// }