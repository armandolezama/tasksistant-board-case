import { css } from 'lit-element';

export default css`
  :host {
    margin: 0;
  }

  #main-container {
    display: inline-flex;
    flex-direction: row;
  }

  #screen-container {
    width: 500px;
    height: 500px;
    border: solid;
    overflow: scroll;
  }

  tasksistant-board-component {
    
  }

  #control-container {
    border: solid;
    border-left: none;
    height: 500px;
  }
  
  #control-container{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  
  #up-section ,
  #middle-section,
  #bottom-section,
  #circle-container,
  #screen-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  
  #circle-container {
    width: 120px;
    height: 120px;
    align-items: center;
  }

  #arrow-up {
    width: 0; 
    height: 0; 
    border-left: 60px solid transparent;
    border-right: 60px solid transparent;
    border-bottom: 60px solid #bbb;
  }

  #arrow-down {
    width: 0; 
    height: 0; 
    border-left: 60px solid transparent;
    border-right: 60px solid transparent;
    
    border-top: 60px solid #bbb;
  }

  #arrow-right {
    width: 0; 
    height: 0; 
    border-top: 60px solid transparent;
    border-bottom: 60px solid transparent;
    
    border-left: 60px solid #bbb;
  }

  #arrow-left {
    width: 0; 
    height: 0; 
    border-top: 60px solid transparent;
    border-bottom: 60px solid transparent; 
    
    border-right:60px solid #bbb; 
  }

  #circle {
    height: 100px;
    width: 100px;
    background-color: #bbb;
    border-radius: 50%;
    display: inline-block;
  }

  input, button, label {
    display: inline-flex;
  }
`;