"use client";

import { motion } from "framer-motion";
import AnimatedPieChart from "./animated-pie-chart"; // Your animated pie chart
import { AnimatedSection } from "./animated-section"; // If you're using it for animations

export function StartingInsightsSection() {
  // Example data for the Pie Chart
  const pieChartData = [
    { id: "Gaming", label: "Gaming", value: 55, color: "hsl(49, 70%, 50%)" },
    { id: "Music", label: "Music", value: 20, color: "hsl(210, 70%, 50%)" },
    { id: "Education", label: "Education", value: 15, color: "hsl(90, 70%, 50%)" },
    { id: "Sports", label: "Sports", value: 10, color: "hsl(10, 70%, 50%)" },
  ];

  return (
    <section id="starting-insights" className="section-container relative scroll-mt-30">
      <AnimatedSection>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
          {/* Text/Introduction Area */}
          <div className="sm:w-1/2 text-gray-200">
            <h2 className="text-3xl font-bold tracking-tight text-white mb-6">
              Discover Insights for Your Next Adventure!
            </h2>
            <p className="text-lg mb-6 text-muted-foreground">
              We provide you with dynamic, insightful visualizations that help you explore your
              content preferences and community interests.
            </p>
            <p className="text-lg mb-6 text-muted-foreground">
              Dive into the world of interactive charts to help guide your content journey.
            </p>
          </div>

          {/* Charts Area */}
          <div className="sm:w-1/2 lg:w-3/5 flex flex-col gap-8">
            {/* Pie Chart */}
            <div className="flex justify-center items-center h-64">
              <AnimatedPieChart data={pieChartData} />
            </div>
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}
