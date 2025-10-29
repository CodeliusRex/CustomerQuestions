const customers = [
  {
    name: "Customer A",

    id: 1,

    email: "customer_a@example.com",

    orders: [
      {
        orderId: 101,

        amount: 250.0,

        itemLines: [
          {
            itemId: 1001,

            quantity: 2,
          },

          {
            itemId: 1002,

            quantity: 1,
          },
        ],
      },

      {
        orderId: 102,

        amount: 150.0,

        itemLines: [
          {
            itemId: 1003,

            quantity: 1,
          },
        ],
      },
    ],
  },

  {
    name: "Customer B",

    id: 2,

    email: "customer_b@example.com",

    orders: [
      {
        orderId: 201,

        amount: 300.0,

        itemLines: [
          {
            itemId: 1003,

            quantity: 1,
          },

          {
            itemId: 2001,

            quantity: 2,
          },
        ],
      },
    ],
  },
];

/**
 * Gets most expensive purchase for specified customer id.
 * @param {number} customerId
 * @param {Customer[]} customers
 */
function getMostExpensivePurchase(customerId, customers) {
  // Get customer object we want
  const customer = customers.find((cust) => cust.id === customerId);

  // Handle empty customer or not an array or no orders for customer
  if (!customer || !Array.isArray(customer.orders) || !customer.orders.length)
    throw new Error("Input object is not a valid array.");

  // Return the maxOrder from customer orders by iterating each order object
  return customer.orders.reduce((maxOrder, currOrder) =>
    // Compare current order amount is greater than max order amount
    // assign new maxOrder if greater than, otherwise keep the current order amount
    currOrder.amount > maxOrder.amount ? currOrder : maxOrder
  );
}

/**
 * Gets average order amount for specified customer id.
 * @param {number} customerId
 * @param {Customer[]}} customers
 */
function getAverageAmount(customerId, customers) {
  //Get customer object we want
  const customer = customers.find((cust) => cust.id === customerId);

  // Handle empty customer or not an array or no orders for customer
  if (!customer || !Array.isArray(customer.orders) || !customer.orders.length)
    throw new Error("Input object is not a valid array.");

  // Get Total amount for customer to calculate average
  const totalAmount = customer.orders.reduce(
    (sum, order) => sum + order.amount,
    0
  );

  // Divide by length of orders to calculate average
  return totalAmount / customer.orders.length;
}

/**
 * Gets the average number of items purchased per order across all customers.
 * @param {Customer[]} customers
 */
function getAverageItemsForOrder(customers) {
  if (!Array.isArray(customers))
    throw new Error("Input object is not a valid array.");

  // Declare and assign counts
  let totalOrders = 0;
  let totalItemCount = 0;

  for (const customer of customers) {
    // Handle empty customer or not an array
    if (!customer || !Array.isArray(customer.orders)) continue;

    // Adds orders array length to totalOrders
    totalOrders += customer.orders.length;

    // Iterated through each customers orders
    for (const order of customer.orders) {
      // Retrieves the item count for this order by checking if there is an itemLines array
      // then reduces the lines to a sum, assigning the current line to 0 if null or undefined
      // Otherwise if there is no itemLines array, assign 0
      const itemCount = Array.isArray(order.itemLines)
        ? order.itemLines.reduce((sum, line) => sum + (line.quantity ?? 0), 0)
        : 0;

      // Adds the current order item count to the total item count.
      totalItemCount += itemCount;
    }
  }

  // If total orders is 0 return 0 otherwise return the average item count for all orders
  return totalOrders === 0 ? 0 : totalItemCount / totalOrders;
}

const mostExpensive = getMostExpensivePurchase(1, customers);
console.log("Most expensive order:", mostExpensive);

const averageAmount = getAverageAmount(1, customers);
console.log("Average amount for customer:", averageAmount);

const averageItemsForAllOrders = getAverageItemsForOrder(customers);
console.log("Average item count for all orders:", averageItemsForAllOrders);
