import React from "react";
import StyleButton from './StyleButton';
import {Editor, EditorState} from 'draft-js';
export default class UndoRedo extends React.Component{
    constructor(props) {
        super(props);
        this.onRedo = this.onRedo.bind(this);
        this.onUndo = this.onUndo.bind(this);
    }
    onUndo() {
        const {editorState,updateDocument} = this.props;
        let newState=EditorState.undo(editorState);
        if(newState){
            updateDocument(newState);
        }
    }
    onRedo() {
        const {editorState,updateDocument} = this.props;
        let newState=EditorState.redo(editorState);
        if(newState){
            updateDocument(newState);
        }
    }
    render(){
        return(
            <div>
                <StyleButton
                    active={false}
                    label={'undo'}
                    toggleStyle={this.onUndo}

                />
                <StyleButton
                    active={false}
                    label={'redo'}
                    toggleStyle={this.onRedo}

                />
            </div>
        )
    }
}