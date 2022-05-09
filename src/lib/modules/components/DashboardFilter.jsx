import React, { useState, useMemo, useEffect } from "react";
import { Grid } from "@material-ui/core";

import { SelectDropdown } from "../commonComponents/SelectDropdown";
import { graphStyles } from "./styles";
import {
  categoryOptions,
  productOptions,
  brandOptions,
} from "../utils/constants";
import getSalesDashboardGraphData from "../services/getSalesDashboardGraphData";
import { processData } from "../utils/dashboardUtils";
import DashboardGraph from "./DashboardGraph";

const DashboardFilter = () => {
  const classes = graphStyles();
  const [category, setCategory] = useState();
  const [product, setProduct] = useState();
  const [brand, setBrand] = useState();
  const [categoryDropdown, setCategoryDropdown] = useState();
  const [productDropdown, setProductDropdown] = useState();
  const [brandDropdown, setBrandDropdown] = useState();
  const [apiParams, setApiParams] = useState({
    category: "food",
    product: "fruits",
    brand: "fruit1",
  });
  const [graphData, setGraphData] = useState();
  const brandArray = ["fruits", "cereals", "shirts", "pants"];

  useEffect(() => {
    if (Array.isArray(categoryOptions) && categoryOptions.length >= 2) {
      setCategory(categoryOptions[0].value);
    }
    if (Array.isArray(productOptions) && productOptions.length >= 2) {
      let initialValue = productOptions.find(
        (x) => Object.keys(x)[0] === "food"
      );
      let initialProduct = initialValue["food"][0].value;
      setProduct(initialProduct);
    }
    if (Array.isArray(brandOptions) && brandOptions.length >= 2) {
      let initialValue = brandOptions.find(
        (x) => Object.keys(x)[0] === "fruits"
      );
      let initialBrand = initialValue["fruits"][0].value;
      setBrand(initialBrand);
    }
    setApiParams({ ...apiParams });
  }, []);

  useEffect(() => {
    let categoryDropdownOptions = [];
    let productDropdownOptions = [];
    let brandDropdownOptions = [];
    if (Array.isArray(categoryOptions) && categoryOptions.length >= 2) {
      categoryOptions.forEach((category) => {
        categoryDropdownOptions.push({
          label: category.label,
          value: category.value,
        });
      });
      setCategoryDropdown(categoryDropdownOptions);
    }
    if (
      Array.isArray(productOptions) &&
      productOptions.length >= 2 &&
      category
    ) {
      let requiredOptions = productOptions.find(
        (x) => Object.keys(x)[0] === category
      );
      let requiredProductOptions = requiredOptions[category];
      requiredProductOptions.forEach((product) => {
        productDropdownOptions.push({
          label: product.label,
          value: product.value,
        });
      });
      setProductDropdown(productDropdownOptions);
    }
    if (Array.isArray(brandOptions) && brandOptions.length >= 2 && product) {
      let requiredOptions = brandOptions.find(
        (x) => Object.keys(x)[0] === product
      );
      let requiredBrandOptions = requiredOptions[product];
      requiredBrandOptions.forEach((brand) => {
        brandDropdownOptions.push({
          label: brand.label,
          value: brand.value,
        });
      });
      setBrandDropdown(brandDropdownOptions);
    }
  }, [category, product, brand]);

  const getSalesReportGraphData = (params) => {
    const { category, product, brand } = params;
    getSalesDashboardGraphData(category, product, brand).then((response) => {
      const requiredGraphData = processData(response, params);
      setGraphData(requiredGraphData);
    });
  };
  useEffect(() => {
    if (apiParams) {
      getSalesReportGraphData(apiParams);
    }
  }, [apiParams]);

  const handleCategoryChange = (value) => {
    setCategory(value);
    if (value === "food") {
      setProduct("fruits");
      setBrand("fruit1");
      setApiParams({
        ...apiParams,
        category: value,
        product: "fruits",
        brand: "fruit1",
      });
    } else {
      setProduct("shirts");
      setBrand("shirt1");
      setApiParams({
        ...apiParams,
        category: value,
        product: "shirts",
        brand: "shirt1",
      });
    }
  };

  const handleProductChange = (value) => {
    setProduct(value);
    if (value === "fruits") {
      setBrand("fruit1");
      setApiParams({
        ...apiParams,
        product: value,
        brand: "fruit1",
      });
    } else if (value === "cereals") {
      setBrand("cereal1");
      setApiParams({
        ...apiParams,
        product: value,
        brand: "cereal1",
      });
    } else if (value === "shirts") {
      setBrand("shirt1");
      setApiParams({
        ...apiParams,
        product: value,
        brand: "shirt1",
      });
    } else {
      setBrand("pant1");
      setApiParams({
        ...apiParams,
        product: value,
        brand: "pant1",
      });
    }
  };

  const handleBrandChange = (value) => {
    setBrand(value);
    setApiParams({
      ...apiParams,
      brand: value,
    });
  };

  const selectBarDataKey = (type) => {
    const result = {
      fruits: "fruitCount",
      cereals: "cerealCount",
      shirts: "shirtCount",
      pants: "pantCount",
    };
    return result[type];
  };

  const getBarId = (type) => {
    const result = {
      fruits: "a",
      cereals: "b",
      shirts: "c",
      pants: "d",
    };
    return result[type];
  };
  const graphOptions =
    Array.isArray(brandArray) &&
    brandArray.length &&
    brandArray.map((type) => {
      const barDataKey = type && selectBarDataKey(type);
      const color = "#56a6e8";
      const id = type && getBarId(type);
      return {
        dataKey: barDataKey,
        fill: color,
        stackId: "salesReport",
        id,
        minPointSize: 2,
      };
    });

  return (
    <>
      <div className={classes.searchContainer}>
        <Grid container spacing={2}>
          <Grid item xs={6} md={4}>
            Category:
            <SelectDropdown
              label="Category"
              variant="outlined"
              width="30%"
              height="35px"
              options={categoryDropdown}
              onChange={handleCategoryChange}
              value={category}
            ></SelectDropdown>
          </Grid>
          <Grid item xs={6} md={4}>
            Product:
            <SelectDropdown
              label="Product"
              variant="outlined"
              width="30%"
              height="35px"
              options={productDropdown}
              onChange={handleProductChange}
              value={product}
            ></SelectDropdown>
          </Grid>
          <Grid item xs={12} md={4}>
            Brand:
            <SelectDropdown
              label="Brand"
              variant="outlined"
              width="30%"
              height="35px"
              options={brandDropdown}
              onChange={handleBrandChange}
              value={brand}
            ></SelectDropdown>
          </Grid>
        </Grid>
      </div>
      {Array.isArray(graphData) && graphData.length && (
        <DashboardGraph data={graphData} graphOptions={graphOptions} />
      )}
    </>
  );
};

export default DashboardFilter;
