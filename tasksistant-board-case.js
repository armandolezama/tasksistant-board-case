import { LitElement, html } from 'lit-element';
import '@tasksistant-components/tasksistant-board-component';
import styles from './tasksistant-board-case-styles';

export class TasksistantBoardCase extends LitElement {

  /**
    * Instance of the element is created/upgraded. Useful for initializing
    * state, set up event listeners, create shadow dom.
    * @constructor
    */
  constructor() {
    super();
    this.board = {};
    this.buttonMessage = '';
    this.rowsNumber = 0;
    this.columnsNumber = 0;
    this.order = 'figure terminator left arrow right path';
  }

  /**
    * Object describing property-related metadata used by Polymer features
    */
  static get properties() {
    return {
      board: {type:Object},
      bottonMessage: {type: String},
      rowsNumber: {type: Number},
      columnsNumber: {type: Number},
      order: {type: String}
    };
  }
  
  static get styles() {
    return styles
  }

  firstUpdated() {
    this.board = this.shadowRoot.querySelector('tasksistant-board-component');
    this.buttonMessage = 'Load';
  }

  loadReloadBoard() {
    this.board.linkBoardSpace();
  }

  setBoardSpace(e) {
    const dimension = e.target.name;
    if(dimension === 'rows'){
      this.rowsNumber = e.target.value;
    } else if (dimension === 'columns'){
      this.columnsNumber = e.target.value;
    }
  }
  
  _moveCurrentNode(e){
    const direction = e.target.getAttribute('value');
    this.board.navigateFromCurrentNodeTo(direction);
  }

  _fillCell(e) {
    const value = e.target.getAttribute('value');
    this.board.executeOrderOnCurrentNode(value);
  };

  render() {
    return html`
    <div id="main-container">
      <div id="screen-container">
        <tasksistant-board-component .numberOfRows="${this.rowsNumber}" .numberOfColumns="${this.columnsNumber}"></tasksistant-board-component>
      </div>
      <div id="control-container">
      <label for="rows">Number of rows</label>
        <input id="rows" type="number" placeholder="Insert a number for rows" name="rows" value="0" @input="${this.setBoardSpace}">
        <label for="columns">Number of columns</label>
        <input id="columns" type="number" placeholder="Insert a number for columns" name="columns" value="0" @input="${this.setBoardSpace}">
        <button @click="${this.loadReloadBoard}">${this.buttonMessage}</button>
        <div id="control-pad">
          <div id="up-section">
            <div id="arrow-up" value="top" @click="${this._moveCurrentNode}"></div>
          </div>
          <div id="middle-section">
            <div id="arrow-left" value="left" @click="${this._moveCurrentNode}"></div>
            <div id="circle-container">
              <div id="circle" value="${this.order}" @click="${this._fillCell}"></div>
            </div>
            <div id="arrow-right" value="right" @click="${this._moveCurrentNode}"></div>
          </div>
          <div id="bottom-section">
          <div id="arrow-down" value="bottom" @click="down${this._moveCurrentNode}"></div>
          </div>
        </div>
      </div>
      
    </div>
    `;
  }
}
customElements.define('tasksistant-board-case', TasksistantBoardCase);