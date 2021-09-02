import "./styles.css";
import { MultiDirectedGraph } from "graphology";
import types from "./conversionTypes";
const adj = [];
var neighborsOfNode = [];
var orders = [];

function neighborNodes(node, graph) {
  neighborsOfNode = []; //clear neigborsOfNode
  orders = [{ root: node, order: 0 }];
  neighborsOfNode.push(node); //push the root node
  graph.forEachOutNeighbor(node, function (neighbor1, attributes) {
    //loop around closest neigbors
    if (neighborsOfNode.includes(neighbor1) || neighbor1 === node) {
      //check if niehbor node registed or not
    } else {
      neighborsOfNode.push(neighbor1);
      orders.push({ root: node, order: 1 });

      graph.forEachOutNeighbor(neighbor1, function (neighbor2, attributes) {
        if (neighborsOfNode.includes(neighbor2) || neighbor2 === neighbor1) {
        } else {
          orders.push({ root: neighbor1, order: 2 });
          neighborsOfNode.push(neighbor2);

          graph.forEachOutNeighbor(neighbor2, function (neighbor3, attributes) {
            if (
              neighborsOfNode.includes(neighbor3) ||
              neighbor3 === neighbor2
            ) {
            } else {
              orders.push({ root: neighbor2, order: 3 });
              neighborsOfNode.push(neighbor3);
            }
          });
        }
      });

      //getnodecloseNieghbors(neighbor, graph);
    }
  });

  orders.shift(); //remove root node order
  neighborsOfNode.shift(); //remove root node
  let neighbors = [];
  for (let index = 0; index < neighborsOfNode.length; index++) {
    neighbors.push({
      Node: neighborsOfNode[index],
      order: orders[index].order,
      root: orders[index].root
    });
  }
  return neighbors;
}

function conversionPath(fromNode, toNode, listOfNeighbors) {
  // listOfNeighbors.Node listOfNeighbors.order listOfNeighbors.root
  let pathOfNode = [];
  let targetNode = listOfNeighbors.filter((node) => node === toNode.Node);

  for (let index = 0; index < listOfNeighbors.length; index++) {
    if (listOfNeighbors[index].Node === toNode) {
      console.log(listOfNeighbors[index].root);
      targetNode = listOfNeighbors[index];
      break;
    }
  }
  //console.log("targetNode |" + targetNode.Node);
  //pathOfNode.push(targetNode.Node);
  let tempNode = listOfNeighbors.filter(
    (node) => node.Node === targetNode.Node
  );
  console.log("targetNode.order=" + targetNode.order);
  console.log("init tempNode =" + tempNode[0].Node);
  for (let index = 0; index < targetNode.order; index++) {
    tempNode = listOfNeighbors.filter((node) => node.Node === tempNode[0].Node);
    console.log("index = " + index);
    console.log(tempNode[0].Node + " | targetNode");
    //tempNode = tempNode[0].root
    pathOfNode.push(tempNode[0].Node);
    tempNode = listOfNeighbors.filter((node) => node.Node === tempNode[0].root);
  }

  pathOfNode.push(fromNode);
  //pathOfNode.push(listOfNeighbors.find((node) => node === toNode));
  return pathOfNode;
}

export default function App() {
  const djd = { name: "kdkdkd", validator: "validator" };
  const myCustomGraph = new MultiDirectedGraph();
  const jsonNode = myCustomGraph.addNode("json", {
    validator: djd,
    eyes: "blue"
  });
  const yamlNode = myCustomGraph.addNode("yaml", {
    age: 24,
    eyes: "blue"
  });
  const cvsNode = myCustomGraph.addNode("cvs", {
    age: 24,
    eyes: "blue"
  });
  const xmlNode = myCustomGraph.addNode("xml", {
    age: 24,
    eyes: "blue"
  });
  const wordNode = myCustomGraph.addNode("word", {
    age: 24,
    eyes: "blue"
  });
  const sqlNode = myCustomGraph.addNode("sql", {
    age: 24,
    eyes: "blue"
  });
  const pdfNode = myCustomGraph.addNode("pdf", {
    age: 24,
    eyes: "blue"
  });
  const htmlNode = myCustomGraph.addNode("html", {
    age: 24,
    eyes: "blue"
  });

  myCustomGraph.addDirectedEdge(jsonNode, cvsNode);
  myCustomGraph.addDirectedEdge(jsonNode, yamlNode);
  myCustomGraph.addDirectedEdge(jsonNode, xmlNode);
  myCustomGraph.addDirectedEdge(jsonNode, sqlNode);
  myCustomGraph.addDirectedEdge(yamlNode, jsonNode);
  myCustomGraph.addDirectedEdge(yamlNode, cvsNode);
  myCustomGraph.addDirectedEdge(cvsNode, jsonNode);
  myCustomGraph.addDirectedEdge(cvsNode, wordNode);
  myCustomGraph.addDirectedEdge(cvsNode, pdfNode);
  myCustomGraph.addDirectedEdge(sqlNode, jsonNode);
  myCustomGraph.addDirectedEdge(xmlNode, htmlNode);
  myCustomGraph.addDirectedEdge(htmlNode, xmlNode);
  myCustomGraph.addDirectedEdge(htmlNode, pdfNode);
  myCustomGraph.addDirectedEdge(wordNode, htmlNode);

  myCustomGraph.forEach(
    (
      source,
      target,
      sourceAttributes,
      targetAttributes,
      edge,
      edgeAttributes,
      undirected
    ) => {
      adj.push([undirected, source, target]);
    }
  );

  //console.log(jsonNode.inNeighbors);
  //console.log(myCustomGraph.neighbors(jsonNode, yamlNode));
  let printpath = conversionPath(
    jsonNode,
    htmlNode,
    neighborNodes(jsonNode, myCustomGraph)
  );
  let allneighbors = neighborNodes(jsonNode, myCustomGraph);
  // allneighbors.map((node) => console.log(node.Node + " | " + node.order));
  console.log(printpath);
  return (
    <div className="App">
      {allneighbors.map((node) => (
        <h2>
          {node.Node} order: {node.order} from:{node.root}
        </h2>
      ))}

      <div>
        {printpath.map((item) => (
          <h2>{item}</h2>
        ))}
      </div>
      <div>
        <h2>{types[2].name}</h2>
      </div>
    </div>
  );
}
