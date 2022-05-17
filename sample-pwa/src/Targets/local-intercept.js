module.exports = (targets) => {
    targets.of("@magento/venia-ui").routes.tap((routes) => {
      routes.push({
        name: "MyGreetingRoute",
        pattern: "/products",
        path: require.resolve("../Components/Products/products.js"),
      });
      return routes;
    });
  };