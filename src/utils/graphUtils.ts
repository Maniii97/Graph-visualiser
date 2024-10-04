export const parseAdjMatrix = (matrixString: string) => {
    const matrix = matrixString.trim().split('\n').map(row => row.split(' ').map(Number));
    return matrix;
};

export const parseEdgeList = (edgesString: string) => {
    const edges = edgesString.trim().split('\n').map(edge => {
      const [u, v, wt] = edge.split(' ').map(Number);
      return { u, v, weight: wt };
    });
    return edges;
  };
  
