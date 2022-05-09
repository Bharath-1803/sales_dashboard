import axios from "axios";

import mockAdapterInstance from "./mockAdapter";
import { graphData } from "../utils/graphMockData";

const getSalesDashboardGraphData = (category, product, brand) => {
  mockAdapterInstance
    .onGet("/getSalesReportData", {
      params: {
        category: category,
        product: product,
        brand: brand,
      },
    })
    .reply(200, {
      graphData,
    });
  return new Promise((resolve, reject) => {
    axios
      .get("/getSalesReportData", {
        params: {
          category: category,
          product: product,
          brand: brand,
        },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export default getSalesDashboardGraphData;
