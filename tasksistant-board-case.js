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
  }

  /**
    * Object describing property-related metadata used by Polymer features
    */
  static get properties() {
    return {
    };
  }
  
  static get styles() {
    return styles
  }

  render() {
    return html``;
  }
}
customElements.define('tasksistant-board-case', TasksistantBoardCase);