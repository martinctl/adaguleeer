import React, { useRef } from "react";
import * as echarts from "echarts/core";
import { PieChart } from "echarts/charts";
import {
  TooltipComponent,
  LegendComponent,
  TitleComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import dynamic from "next/dynamic";
import { Box, Flex } from '@radix-ui/themes';

const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false });

// Register ECharts components
echarts.use([
  PieChart,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
  CanvasRenderer,
]);

interface PieChartData {
  id: string;
  label: string;
  value: number;
  color: string;
}

interface AnimatedPieChartProps {
  data: PieChartData[];
}

const AnimatedPieChart: React.FC<AnimatedPieChartProps> = ({ data }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const getOption = () => ({
    title: {
      text: "Category Percentage",
      left: "center",
      top: 20,
      textStyle: {
        color: "#ffffff",
        fontSize: 24,
      },
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "vertical",
      left: "left",
      textStyle: {
        color: "#ffffff",
      },
    },
    series: [
      {
        name: "Categories",
        type: "pie",
        radius: "50%",
        data: data.map((item) => ({
          value: item.value,
          name: item.label,
          itemStyle: {
            color: item.color,
          },
        })),
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
        label: {
          color: "#ffffff",
        },
      },
    ],
    backgroundColor: "transparent",
  });

  return (
    <Flex 
      ref={triggerRef}
      width="100%" 
      height="100%" 
      justify="center" 
      align="center"
    >
      <Box ref={chartRef} className="w-full max-w-md">
        <ReactECharts
          option={getOption()}
          style={{ height: "300px", width: "100%" }}
        />
      </Box>
    </Flex>
  );
};

export default AnimatedPieChart;
