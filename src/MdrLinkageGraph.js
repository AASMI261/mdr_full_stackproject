import React, { useState, useRef, useEffect } from "react";
import { Network } from "vis-network";
import "vis-network/styles/vis-network.css";
import "./MdrLinkageGraph.css";
import Sidebar from "./Sidebar";


const MdrGraph = () => {
  const graphRef = useRef(null);
  const networkRef = useRef(null);

   const [tableData, setTableData] = useState([]);
const [nodes, setNodes] = useState([]);
const [edges, setEdges] = useState([]);

  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
    const handleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

   useEffect(() => {
  fetch("http://localhost:5000/api/mdr-linkage")
    .then((res) => res.json())
    .then((data) => {
      setTableData(data);

      let nodeMap = {};
      let nodeId = 1;
      let newNodes = [];
      let newEdges = [];

      data.forEach((row) => {
        if (!nodeMap[row.p1]) {
          nodeMap[row.p1] = nodeId++;
          newNodes.push({
            id: nodeMap[row.p1],
            pid: row.p1,
            label: `${row.p1name}\n${row.p1}`,
          });
        }

        if (!nodeMap[row.p2]) {
          nodeMap[row.p2] = nodeId++;
          newNodes.push({
            id: nodeMap[row.p2],
            pid: row.p2,
            label: `${row.p2name}\n${row.p2}`,
          });
        }

        newEdges.push({
          from: nodeMap[row.p1],
          to: nodeMap[row.p2],
        });
      });

      setNodes(newNodes);
      setEdges(newEdges);
    })
    .catch((err) => console.error(err));
}, []);

  // Create graph
 useEffect(() => {
  if (!nodes.length) return;

  const network = new Network(
    graphRef.current,
    { nodes, edges },
    {
      physics: true,
      nodes: {
        shape: "circle",
        size: 35,
      },
    }
  );

  networkRef.current = network;

  return () => network.destroy();
}, [nodes, edges]);

  // Path-finding: BFS from index patient
  const getReachablePatients = () => {
    const indexPID = "P-1023";
    const indexNode = nodes.find(n => n.pid === indexPID);

    if (!indexNode) return [];

    let queue = [indexNode.id];
    let visited = new Set([indexNode.id]);

    while (queue.length > 0) {
      const current = queue.shift();

      edges.forEach(edge => {
        if (edge.from === current && !visited.has(edge.to)) {
          visited.add(edge.to);
          queue.push(edge.to);
        }
        if (edge.to === current && !visited.has(edge.from)) {
          visited.add(edge.from);
          queue.push(edge.from);
        }
      });
    }

    return [...visited].map(id => nodes.find(n => n.id === id).pid);
  };

const reachablePatients = nodes.length
  ? getReachablePatients()
  : [];

  // Decide if pair is connected to index
  const isPairConnected = (p1, p2) => {
    return reachablePatients.includes(p1) || reachablePatients.includes(p2)
      ? "Yes"
      : "No";
  };

  // Search
  useEffect(() => {
    if (!networkRef.current || search.trim() === "") return;

    const matchNode = nodes.find((n) =>
      n.label.toLowerCase().includes(search.toLowerCase())
    );

    if (matchNode) {
      networkRef.current.selectNodes([matchNode.id]);
    }
  }, [search]);
   
  const filtered = tableData.filter(
  (row) =>
    row.p1?.toLowerCase().includes(search.toLowerCase()) ||
    row.p2?.toLowerCase().includes(search.toLowerCase()) ||
    row.p1name?.toLowerCase().includes(search.toLowerCase()) ||
    row.p2name?.toLowerCase().includes(search.toLowerCase())
);

  return (
     <div
      style={{
        marginLeft: isSidebarOpen ? "280px" : "0",
        transition: "margin-left 0.3s",
      }}
    >
      <div className="app-root" style={{ marginLeft: isSidebarOpen ? "20px" : "0" }}>
        <Sidebar isOpen={isSidebarOpen} />

        <div className="header-content">
          <button className="hamburger-btn" onClick={handleSidebar}>☰</button>

    <div className="mdr-page">
      <h2 className="page-title">MDR Patient Source Linkage Graph</h2>

      <div className="search-box-row">
        <input
          className="search-input"
          placeholder="Search patient by ID / name"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />

        <button className="search-btn" onClick={() => setSearch(searchInput)}>
          Search
        </button>
      </div>

      <div className="graph-wrapper">
        <div className="graph-area" ref={graphRef}></div>
      </div>

      <div className="table-wrapper">
        <table className="custom-table">
          <thead>
            <tr>
              <th>SR.</th>
              <th>MDR ID</th>
              <th>FIRST PATIENT ID</th>
              <th>FIRST PATIENT NAME</th>
              <th>SECOND PATIENT ID</th>
              <th>SECOND PATIENT NAME</th>
              <th>LOCATION</th>
              <th>TIMESTAMP</th>
              <th>CONNECTED TO INDEX</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((row, i) => {
              const connected = isPairConnected(row.p1, row.p2);
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{row.id}</td>
                  <td>{row.p1}</td>
                  <td>{row.p1name}</td>
                  <td>{row.p2}</td>
                  <td>{row.p2name}</td>
                  <td>{row.location}</td>
                <td>
  {row.timestamp
    ? new Date(row.timestamp).toLocaleString()
    : ""}
</td>
                  <td className={connected === "Yes" ? "yes" : "no"}>
                    {connected}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
    </div>
    </div>
    </div>
  );
};

export default MdrGraph;
