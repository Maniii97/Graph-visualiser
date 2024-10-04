/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { parseAdjMatrix, parseEdgeList } from "../utils/graphUtils";

interface GraphInputProps {
  setGraphData: (data: any) => void;
  setInpType: (data: string) => void;
  resetGraph: () => void;
}

const GraphInput: React.FC<GraphInputProps> = ({
  setGraphData,
  setInpType,
  resetGraph,
}) => {
  const [inputType, setInputType] = useState<string>("adjMatrix");
  const [inputData, setInputData] = useState<string>("");

  useEffect(() => {
    if (inputData.trim().length === 0) {
      resetGraph();
    }
  }, [inputData, inputType, resetGraph]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInputData(value);

    if (value.trim().length > 0) {
      handleGenerateGraph(value);
    }
  };

  const handleGenerateGraph = (data: string) => {
    let graphData = null;
    const inpType = inputType;

    if (data.trim().length === 0) {
      alert("Please enter graph data");
      return;
    }

    if (inputType === "adjMatrix") {
      graphData = parseAdjMatrix(data);
    } else if (inputType === "edgeList") {
      console.log("data : " + data);
      graphData = parseEdgeList(data);
    }

    setGraphData(graphData);
    setInpType(inpType);
  };

  return (
    <div>
      <div>
        <label>
          <input
            type="radio"
            value="adjMatrix"
            checked={inputType === "adjMatrix"}
            onChange={() => {
              setInputType("adjMatrix");
              setInputData("");
            }}
          />
          Adjacency Matrix
        </label>
        <label>
          <input
            type="radio"
            value="edgeList"
            checked={inputType === "edgeList"}
            onChange={() => {
              setInputType("edgeList");
              setInputData("");
            }}
          />
          Edge List (u-v-wt)
        </label>
      </div>

      <textarea
        rows={10}
        cols={50}
        value={inputData}
        onChange={handleInputChange}
        placeholder={
          inputType === "adjMatrix"
            ? "Enter adjacency matrix"
            : "Enter edges (u-v-wt)"
        }
      />
      <button
        className="generate"
        onClick={() => handleGenerateGraph(inputData)}
      >
        Generate Graph
      </button>
    </div>
  );
};

export default GraphInput;
