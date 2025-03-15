# Advance Data Model

- We can even define small schema that are being used internally.
  ```
  const orderItemsSchema = new mongoose.Schema({
    productID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product"
    },
    quantity: {
      type: Number,
      required: true
    }
  })

  const orderSchema = new mongoose.Schema({
    orderPrice: {
      type: Number,
      required: true
    },
    costumer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    orderItems: {
      type: [orderItemsSchema]
    },
    address: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ["PENDING", "CANCELLED", "DELIVERED"],
      default: "PENDING"
    }
  }, { timestamps: true })
  ```


- When you want to restrict choice that can passed by user in DB.
  - We use "enum" in this case.
  ```
  status: {
    type: String,
    enum: ["PENDING", "CANCELLED", "DELIVERED"],
    default: "PENDING"
  }
  ```