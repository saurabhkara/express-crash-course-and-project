const router = require("express").Router();


const apiKey = require('../middlewares/apikeys');



//single route middleware
//router level middleware

// router.use(apiKey);

router.get("/", (req, res) => {
  res.render("index", {
    title: "Home page",
  });
});

router.get("/about", (req, res) => {
  res.render("about", {
    title: "About page",
  });
});

// router.get("/api/products",apiKey, (req, res) => {
//   res.json([
//     {
//       id: "123",
//       name: "Chrome",
//     },
//     {
//       id: 124,
//       name: "Firefox",
//     },
//   ]);
// });

module.exports = router;
