import React from 'react';
import AddLink from './AddLink';
import InlineStyles from './InlineStyles';
import './EditorToolbar.css';
import BlockStyles from './BlockStyles';
import UndoRedo from './UndoRedo';
import AddImage from './AddImage';
export default class EditorToolbar extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div className="toolbar">
                <InlineStyles editorState={this.props.editorState} updateDocument={this.props.updateDocument}/>
                <BlockStyles editorState={this.props.editorState} updateDocument={this.props.updateDocument}/>
                <UndoRedo editorState={this.props.editorState} updateDocument={this.props.updateDocument}/>
                <AddLink editorState={this.props.editorState} updateDocument={this.props.updateDocument} focusEditor={this.props.focusEditor}/>
                <AddImage editorState={this.props.editorState} updateDocument={this.props.updateDocument} focusEditor={this.props.focusEditor}/>
            </div>
        )
        
    }
}