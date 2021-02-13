export class Processor {
  constructor(mapHeight = 0, mapWidth = 0) {
    this.currentNode = {
      type: '',
      figure: '',
      coordinates: [],
      connectedComplements: {
        left: '',
        right: '',
        up: '',
        down: ''
      },
      stripes: {
        left: false,
        right: false,
        up: false,
        down: false
      },
      command: '',
      orderData: '',
      previousNode: {} //Same prototype as the current node.
    };
    this.directory = new Map();
    this.openNodes = new Map();
    this.allNodesCreated = [];
    this.nodesVirtualMap = [];
    this.coun
    this.maxStripesPerNode = 2;
    this.mapHeight = 0;
    this.mapWidth = 0;
    this.createVirtualMap(mapHeight, mapWidth);
  }

  createVirtualMap(mapHeight = 0, mapWidth = 0) {
    this.nodesVirtualMap = Array.from({ length: mapWidth }, () =>
      Array.from({ length: mapHeight }, () => [])
    );
  };

  setInitialNode(){
    const command = this.createCommand(this.initialConfig);
    return {
      nodeData: this.currentNode,
      command
    };
  };

  getValidNeighbors(nodeData) {
    const validCoordinates = this.getValidCoordinates(nodeData.coordinates);

    return {
      canvasTitle,
      canvasProperties,
      value,
      buttonTitle,
    };
  };

  getValidCoordinates(coordinates){
    const x = coordinates[0];
    const y = coordinates[1];
    const setOfCoordinates = [];
    if(x + 1 < this.mapWidth){
      setOfCoordinates = [...setOfCoordinates, [x + 1, y]];
    };

    if(x - 1 >= 0){
      setOfCoordinates = [...setOfCoordinates, [x - 1, y]];
    };

    if(y + 1 < this.mapHeight){
      setOfCoordinates = [...setOfCoordinates, [x, y + 1]];
    };

    if(y - 1 >= 0){
      setOfCoordinates = [...setOfCoordinates, [x, y - 1]];
    };
    return setOfCoordinates;
  };

  createCommand(currentNode = undefined, previousNode = undefined){
    let order = {};
    let command = '';
    if(previousNode){
      order = this.compareNodes(currentNode, previousNode);
    } else {
      order = this.processNode(currentNode);
    };

    if(order.type === 'figure'){
      command = this.createFigureOrder(order);
    } else if (order.type === 'stripe'){
      command = this.createStripeOrder(order);
    }; 
    return command;
  };

  createFigureOrder(orderData) {
    let command = `figure ${orderData.figure}`
    const complements = orderData.connectedComplements;
    for (const complement in complements) {
      if(complements[complement] !== '' && complements[complement] !== undefined){
        command = `${command} ${complement} ${complements[complement]}`
      };
    };

    return command;
  };

  createStripeOrder(orderData) {
    let command = 'stripe';
    const sides = orderData.stripes;
    for(const side in sides){
      if(sides[side]){
        command = `${command} ${side}`
      };
    };
    return command;
  };

  compareNodes(currentNode, previousNode){
    const order = {};
    if(previousNode.type === 'figure'){
      order.validType = 'stripe';
    } else if(previousNode.type === 'stripe') {
      order.validType = 'Figure';
      order.figure = 'connector';
    };
    return {
      validType: 'figure'
    };
  };

  processNode(node){
    return {
      validType: 'figure',
      figure: 'terminator'
    }
  };
};
