import { ResponsivePie } from "@nivo/pie";

// Define the type for a single pie slice
interface PieData {
  id: string;
  label: string;
  value: number;
  color: string;
}

// Define the component's props type
interface AnimatedPieChartProps {
  data: PieData[];
}

const AnimatedPieChart: React.FC<AnimatedPieChartProps> = ({ data }) => (
  <ResponsivePie
    data={data}
    margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
    innerRadius={0.5}
    padAngle={1.5}
    cornerRadius={3}
    activeOuterRadiusOffset={8}
    colors={{ datum: "data.color" }}
    borderWidth={1}
    borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
    arcLinkLabelsSkipAngle={10}
    arcLinkLabelsTextColor="#333333"
    arcLinkLabelsThickness={2}
    arcLinkLabelsColor={{ from: "color" }}
    arcLabelsSkipAngle={10}
    arcLabelsTextColor={{
      from: "color",
      modifiers: [["darker", 2]],
    }}
    animate={true}
    motionConfig="gentle"
  />
);

// Sample data for the pie chart
const data: PieData[] = [
  { id: "Gaming", label: "Gaming", value: 55, color: "#FF5733" },
  { id: "Music", label: "Music", value: 20, color: "#33FF57" },
  { id: "Education", label: "Education", value: 15, color: "#3357FF" },
  { id: "Sports", label: "Sports", value: 10, color: "#FF33A6" },
];

export default AnimatedPieChart;
