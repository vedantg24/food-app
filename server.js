const express = require("express");
const connectDB = require("./config/db");

const app = express();

//Connect Database
connectDB();

//Init Middleware
app.use(express.json({ extended: false }));

//Define routes
app.use("/api/users", require("./routes/users"));
app.use("/api/restaurants", require("./routes/restaurants"));
app.use("/api/menu", require("./routes/menu"));
app.use("/api/cart", require("./routes/cart"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
