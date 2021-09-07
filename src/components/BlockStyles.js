import React from "react";
import {RichUtils} from 'draft-js';
import StyleButton from './StyleButton';
export default class BlockStyles extends React.Component{
    constructor(props) {
        super(props);
        this.toggleBlockStyle = this.toggleBlockStyle.bind(this);
    }
    toggleBlockStyle(blockStyle){
        const {editorState,updateDocument} = this.props;
        let newState = RichUtils.toggleBlockType(editorState,blockStyle);
        if(newState){
            updateDocument(newState);
        }
    }
    render(){
        const {editorState} = this.props;
        const selection = editorState.getSelection();
        const blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();
        return(
            <div>
            {BLOCK_TYPES.map((type) =>
              <StyleButton
                key={type.label}
                active={type.style === blockType}
                label={type.label}
                toggleStyle={this.toggleBlockStyle}
                style={type.style}
              />
            )}
          </div>
        )
    }
}


const BLOCK_TYPES = [
    {label: 'H2', style: 'header-two',icon: "heading"},
    {label: 'Blockquote', style: 'blockquote'},
    {label: 'UL', style: 'unordered-list-item'},
    {label: 'OL', style: 'ordered-list-item'},
    {label: 'Code Block', style: 'code-block'},
  ];