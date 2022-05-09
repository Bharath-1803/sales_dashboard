export const processData = (apiData, params) => {
  const { category, product, brand } = params;
  const { graphData } = apiData;
  const categorySalesData = graphData[category];
  const productSalesData = categorySalesData[product];
  const brandSalesData = productSalesData[brand];
  if (Array.isArray(brandSalesData) && brandSalesData.length > 0) {
    return brandSalesData;
  }
  return [];
};
