import { LitElement, html } from "lit-element";
import { Processor } from"./tasksistant-board-processor";
import "@tasksistant-components/tasksistant-board-component";
import styles from "./tasksistant-board-case-styles";

export class TasksistantBoardCase extends LitElement {
  /**
   * Instance of the element is created/upgraded. Useful for initializing
   * state, set up event listeners, create shadow dom.
   * @constructor
   */
  constructor() {
    super();
    this.board = {};
    this.previousNode = {};
    this.currentNode = {};
    this.buttonMessage = '';
    this.rowsNumber = 0;
    this.columnsNumber = 0;
    this.order = "figure terminator";
    this.processor = {};
    this.itemsButtons = [];
  }

  /**
   * Object describing property-related metadata used by Polymer features
   */
  static get properties() {
    return {
      board: { type: Object },
      bottonMessage: { type: String },
      rowsNumber: { type: Number },
      columnsNumber: { type: Number },
      order: { type: String },
      processor: { type: String },
      itemsButtons: { type: Array },
    };
  }

  static get styles() {
    return styles;
  }

  firstUpdated() {
    this.board = this.shadowRoot.querySelector("tasksistant-board-component");
    this.buttonMessage = 'Load';
  }

  loadReloadBoard() {
    this.processor = new Processor(this.rowsNumber, this.columnsNumber);
    this.board.linkBoardSpace();
  }

  setBoardSpace(e) {
    const dimension = e.target.name;
    if (dimension === 'rows') {
      this.rowsNumber = e.target.value;
    } else if (dimension === 'columns') {
      this.columnsNumber = e.target.value;
    };
  };

  _moveCurrentNodeToDirection(e) {
    const direction = e.target.getAttribute('value');
    this.board.navigateFromCurrentNodeTo(direction);
  };

  _validateNeighbors() {
    const board = this.board;
    const origin = board.currentNode.coordinates;
    [
      [origin[0] + 1, origin[1]],
      [origin[0], origin[1] + 1],
      [origin[0] - 1, origin[1]],
      [origin[0], origin[1] - 1],
    ].map((coordinates) => {
      const cellToEvaluate = board.getCellByCoordinates(
        coordinates[0],
        coordinates[1]
      );
      if(cellToEvaluate){
        this._analyze(cellToEvaluate.cell.getNodeContent());
      };
    });
  }

  _analyze(nodeData) {
    this.itemsButtons = this.processor.getValidNeighbors(nodeData);
  }

  _fillCell() {
    let nodeData = {};
    this._giveLifeToCurrentCell();
    this._giveLifeToNeighboringCells();
    if(this.setBodyNodes){
      nodeData = this.processor.setNextNode(nextNodeInfo);
    } else {
      nodeData = this.processor.setStartNode();
    };
    this.order = nodeData.command;
    this.board.executeOrderOnCurrentNode(this.order);
  };

  _giveLifeToCurrentCell(){
    this.board.currentNode.cell.cellIsDead = false;
    this.board.currentNode.cell.classList.add('alive');
  };

  _giveLifeToNeighboringCells(){
    const currentNodeCoordinates = this.board.currentNode.coordinates;
    [
      [currentNodeCoordinates[0] + 1, currentNodeCoordinates[1]],
      [currentNodeCoordinates[0] - 1, currentNodeCoordinates[1]],
      [currentNodeCoordinates[0], currentNodeCoordinates[1] + 1],
      [currentNodeCoordinates[0], currentNodeCoordinates[1] - 1]
    ].map(neighbourCoordinates => {
      const cellFromBoard = this.board.getCellByCoordinates(neighbourCoordinates[0], neighbourCoordinates[1]);
      if(cellFromBoard) {
        cellFromBoard.cell.classList.add('alive');
      };
    });
  };

  _getNeighboringCoordinates() {

  };

  render() {
    return html`
      <div id="main-container">
        <div id="screen-container">
          <tasksistant-board-component
            .numberOfRows="${this.rowsNumber}"
            .numberOfColumns="${this.columnsNumber}"
          ></tasksistant-board-component>
        </div>
        <div id="control-container">
          <label for="rows">Number of rows</label>
          <input
            id="rows"
            type="number"
            placeholder="Insert a number for rows"
            name="rows"
            value="0"
            @input="${this.setBoardSpace}"
          />
          <label for="columns">Number of columns</label>
          <input
            id="columns"
            type="number"
            placeholder="Insert a number for columns"
            name="columns"
            value="0"
            @input="${this.setBoardSpace}"
          />
          <button @click="${this.loadReloadBoard}">
            ${this.buttonMessage}
          </button>
          <div id="control-pad">
            <div id="up-section">
              <div
                id="arrow-up"
                value="top"
                @click="${this._moveCurrentNode}"
              ></div>
            </div>
            <div id="middle-section">
              <div
                id="arrow-left"
                value="left"
                @click="${this._moveCurrentNode}"
              ></div>
              <div id="circle-container">
                <div
                  id="circle"
                  @click="${this._fillCell}"
                ></div>
              </div>
              <div
                id="arrow-right"
                value="right"
                @click="${this._moveCurrentNode}"
              ></div>
            </div>
            <div id="bottom-section">
              <div
                id="arrow-down"
                value="bottom"
                @click="down${this._moveCurrentNode}"
              ></div>
            </div>
          </div>
        </div>
        <div id="buttons-container">
          ${this.itemsButtons.map(
            (itemProperties) => html`
              <div id="canvas-title">
                <h3>${itemProperties.canvasTitle}</h3>
              </div>
              <div id="canvas-container">
                <tasksistant-item-component
                  .figures="${this.board.figures}"
                  .canvasProperties="${itemProperties.canvasProperties}"
                >
                </tasksistant-item-component>
              </div>
              <div id="canvas-button-container">
                <button command="${itemProperties.value}">
                  ${itemProperties.buttonTitle}
                </button>
              </div>
            `
          )}
        </div>
      </div>
    `;
  }
}
customElements.define("tasksistant-board-case", TasksistantBoardCase);
