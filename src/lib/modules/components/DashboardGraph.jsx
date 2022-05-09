import React from "react";
import styled from "styled-components";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Label } from "recharts";

const StyledDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  height: 100%;
  width: 100%;
  margin-top: 20px;
`;

const StyledGraphDiv = styled.div`
  width: 100%;
  height: 500px;
`;

const StyledInfoDiv = styled.div`
  text-align: center;
  font-weight: 550;
  margin-top: 20px;
`;

const DashboardGraph = ({ data, graphOptions, hideXAxisKey = false }) => {
  const graphData = data;
  return (
    <>
      <StyledInfoDiv> Sales By Month for: </StyledInfoDiv>
      <StyledGraphDiv>
        <StyledDiv>
          <BarChart
            width={1150}
            height={350}
            data={graphData}
            barCategoryGap={20}
            margin={{
              top: 5,
              right: 5,
              left: 25,
              bottom: 5,
            }}
          >
            <CartesianGrid vertical={false} strokeDasharray="1 1" />
            <XAxis hide={hideXAxisKey} dataKey="monthYear" interval={0}>
              <Label value="Months" offset={-5} position="insideBottom" />
            </XAxis>
            <YAxis
              type="number"
              domain={[
                0,
                (dataMax) => Math.ceil(dataMax + (dataMax * 25) / 100),
              ]}
              tickCount={10}
              dataKey={""}
              label={{ value: "Sales", angle: -90, position: "insideLeft" }}
            />

            {graphOptions && graphOptions.map((bar) => <Bar {...bar} />)}
          </BarChart>
        </StyledDiv>
      </StyledGraphDiv>
    </>
  );
};

export default DashboardGraph;
