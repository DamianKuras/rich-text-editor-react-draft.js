import React from "react";
import './StyleButton.css'
export default class StyleButton extends React.Component {
    constructor() {
      super();
      this.onToggle = (e) => {
        e.preventDefault();
        this.props.toggleStyle(this.props.style);
      };
    }
    
    render() {
      let className = 'editor-button';
      if (this.props.active) {
        className += ' editor-button-active';
      } 
      let hasIcon = this.props.icon!=null;
      let button;
      if(hasIcon){
        button=<p>{this.props.label}</p>
      }
      else{
          button=<p>{this.props.label}</p>
      }
      return (  
        <span className={className} onMouseDown={(this.onToggle)}>
            {button} 
        </span>
      );
    }
  }