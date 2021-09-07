import React from 'react';
import {RichUtils} from 'draft-js';
import StyleButton from './StyleButton';
export default class InlineStyles extends React.Component{
  constructor(props) {
    super(props);
    this.toggleInlineStyle = this.toggleInlineStyle.bind(this);
  }
  toggleInlineStyle (inlineStyle) {
    const {editorState,updateDocument} = this.props;
    let newState=RichUtils.toggleInlineStyle(editorState,inlineStyle);
    if(newState){
      updateDocument(newState);
    }
  }

  onClickHandler(e,inlineStyle) {
      console.log('did');
      e.preventDefault();
      this.toggleInlineStyle(inlineStyle);
  }


  render(){
    const currentStyle = this.props.editorState.getCurrentInlineStyle();
    return (
      <div>
        <div>
        {INLINE_STYLES.map((type) =>
              <StyleButton
                key={type.label}
                active={currentStyle.has(type.style)}
                label={type.label}
                toggleStyle={this.toggleInlineStyle}
                style={type.style}
                icon={type.icon}
              />
            )}
        </div>
      </div>
    );
  }
}
const INLINE_STYLES = [
  {label: 'Bold', style: 'BOLD',icon: 'bold'},
  {label: 'Italic', style: 'ITALIC',icon: "italic"},
  {label: 'Underline', style: 'UNDERLINE', icon: 'underline'},
  {label: 'Strikethrough', style: 'STRIKETHROUGH', icon:'strikethrough'},
];