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
    productsInventory();
  });

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
    message: "Please enter the ID number of the product you would like to purchase."
  },
  {
    name: "inputQuantity",
    type: "input",
    message: "How many units of the selected item would you like to purchase?"
  }
  ]).then(function(answer) {
    connection.query("SELECT * FROM products WHERE id=?", answer.inputQuantity, function(err, res) {
      for (var i = 0; i < res.length; i++) {
        if (answer.inputQuantity > res[i].stock_quantity) {
          console.log("Insufficient quantity in stock. Sorry! Please try again later.");
          productsInventory();
        } else {
          console.log("Great! You have successfully purchased: " + "Quantity: " + answer.inputQuantity + "Item: " + res[i].product_name)
        }
      }
    })
  })
}


// function start() {
//   connection.query("SELECT * FROM products", function(err, results) {
//     if (err) throw err;
   
//     inquirer
//       .prompt([
//         {
//           name: "choice",
//           type: "rawlist",
//           choices: function() {
//             var choiceArray = [];
//             for (var i = 0; i < results.length; i++) {
//               choiceArray.push(results[i].product_name);
//               // choiceArray.push(results[i].id + " " + results[i].product_name);
//             }
//             return choiceArray;
//           },
//           // name: "itemId",
//           // type: "list",
//           message: "What is the ID of the product you would you like to buy?"
//         },
//         {
//           name: "quantity",
//           type: "number",
//           message: "How many would you like to buy?"

//         }
//       ])
//       .then(function(answer) {
//         // get the information of the chosen item
//         var chosenItem;
//         for (var i = 0; i < results.length; i++) {
//           if (results[i].product_name === answer.choice) {
//             chosenItem = results[i];
//           }
//         }
//         // determine if quantity requested is lower than stock quantity
//         if (chosenItem.stock_quantity > answer.quantity) {
//           chosenItem.stock_quantity -= answer.quantity;
//           // chosenItem.stock_quantity -= parseInt(answer.quantity);
//           // bid was high enough, so update db, let the user know, and start over
//           connection.query(
//             "UPDATE products SET ? WHERE ?",
//             [
//               {
//                 stock_quantity: answer.quantity
//               },
//               {
//                 product_name: chosenItem.product_name
//               }
//             ],
//             function(error) {
//               if (error) throw err;
//               console.log("Successfully purchasd " + answer.quantity + " " + product_name + "!");
//               // console.log("Successfully purchasd!");
//               readProducts();
//             }
//           );
//         }
//         else {
//           // bid wasn't high enough, so apologize and start over
//           console.log("Insufficient quantity! Sorry, please try again!");
//           // start();
//         }
      
//       })
//   });
// }

// function readProducts() {
//   console.log("Selecting all products...\n");
//   connection.query("SELECT * FROM products", function(err, res) {
//     if (err) throw err;
//     // Log all results of the SELECT statement
//     console.log(res);
//     connection.end();
//   });
// }





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