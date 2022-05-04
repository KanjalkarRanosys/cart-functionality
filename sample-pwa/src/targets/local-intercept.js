module.exports = (targets) => {
    targets.of("@magento/venia-ui").routes.tap((routes) => {
      routes.push({
        name: "MyGreetingRoute",
        pattern: "/products",
        path: require.resolve("../components/Products/products.js"),
        // path: require.resolve("../../node_modules/@magento/venia-ui/lib/components/ProductOptions"),
      });
      return routes;
    });
  };