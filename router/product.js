const router = require("express").Router();
let products = require("../productData");

router.get("/product", (req, res) => {
  res.render("product", {
    title: "Product page",
  });
});

router.get("/api/products", (req, res) => {
  res.json(products);
});

router.post("/api/products", (req, res) => {
  const { name, price } = req.body;
  if (!name || !price) {
    return res.status(422).json({ error: "All fields are required" });
  }

  const prod = {
    name,
    price,
    id: new Date().getTime().toString(),
  };

  products.push(prod);

  res.json(prod);
});


router.delete(`/api/products/:productId`, (req, res) => {
  products = products.filter((product) => {
    return req.params.productId !== product.id.toString();
  });

  res.json({ status: "OK" });
});


module.exports = router;
