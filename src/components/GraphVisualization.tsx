/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef } from "react";
import { Network } from "vis-network";

interface GraphVisualizationProps {
  graphData: any;
  inputType: string;
  graphOptions: any;
}

const GraphVisualization: React.FC<GraphVisualizationProps> = ({
  graphData,
  inputType,
  graphOptions,
}) => {
  const networkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!graphData) return;

    if (typeof graphData !== "object") {
      console.error("Invalid graph data format");
      return;
    }

    const nodes: any[] = [];
    const edges: any[] = [];

    const nodeSet = new Set<number>();

    if (inputType === "adjMatrix") {
      for (let i = 0; i < graphData.length; i++) {
        nodes.push({ id: i, label: `${i + 1}` });
        for (let j = 0; j < graphData[i].length; j++) {
          if (graphData[i][j] !== 0) {
            edges.push({ from: i, to: j, label: `${graphData[i][j]}` });
          }
        }
      }
    } else {
      console.log("graphData is in edge list format", graphData);
      graphData.forEach(({ u, v, weight }: any) => {
        nodeSet.add(u);
        nodeSet.add(v);

        edges.push({ from: u, to: v, label: `${weight}` });
      });

      nodeSet.forEach((node) => {
        nodes.push({ id: node, label: `${node}` });
      });
    }

    const container = networkRef.current;
    const data = {
      nodes: Array.from(new Set(nodes)),
      edges: Array.from(new Set(edges)),
    };

    const options = {
      edges: {
        arrows: { to: { enabled: false } },
        smooth: { enabled: false, type: "dynamic", roundness: 0 },
        width: 2.25,
        font: {
          size: 20,
          face: "Poppins",
          color: graphOptions === "dark" ? "#FFFFFF" : "#000000",
        },
      },
      nodes: {
        shape: "circle",
        size: 40,
        font: {
          size: 30,
          vadjust: 1,
          face: "Poppins",
          color: graphOptions === "dark" ? "#FFFFFF" : "#000000",
        },
        borderWidth: 2,
        labelHighlightBold: true,
        color: {
          background: graphOptions === "dark" ? "#000000" : "#FFFFFF",
          border: graphOptions === "dark" ? "#FFFFFF" : "#000000",
          highlight: {
            background: graphOptions === "dark" ? "#000000" : "#ffffff",
            border: graphOptions === "dark" ? "#ffffff" : "#000000",
          },
        },
      },
      layout: {
        randomSeed: 42,
        improvedLayout: true,
      },
      physics: {
        enabled: false,
      },
      interaction: {
        dragNodes: true,
        zoomView: false, // Disable zooming
        dragView: true, // Allow dragging the view
      },
      manipulation: {
        enabled: true,
      },
    };

    const network = new Network(container as HTMLElement, data, options);

    // Cleanup on component unmount
    return () => {
      network.destroy();
    };
  }, [graphData, inputType, graphOptions]);

  return (
    <div
      ref={networkRef}
      id="graph-container"
      style={{ height: "600px", width: "100%" }}
    ></div>
  );
};

export default GraphVisualization;
