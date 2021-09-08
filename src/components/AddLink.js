import React from 'react';
import { CompositeDecorator,RichUtils,EditorState,Modifier } from 'draft-js';

export default class AddLink extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showURLInput: false,
            urlValue: '',
        }
        this.promptForLink = this.promptForLink.bind(this);
        this.confirmLink = this.confirmLink.bind(this);
        this.removeLink = this.removeLink .bind(this);
        this.onURLChange = (e) => this.setState({urlValue: e.target.value});
        this.onLinkInputKeyDown = this.onLinkInputKeyDown.bind(this);
    }
    render() {
        let urlInput;
        if (this.state.showURLInput){
            urlInput =
              <div>
                <input
                  onChange={this.onURLChange} 
                  type="text"
                  ref="url"
                  value={this.state.urlValue}
                  onKeyDown={this.onLinkInputKeyDown}
                />
                <button onMouseDown={this.confirmLink}>
                  Confirm
                </button>
              </div>;
        }
        return(
            <div>
                <button
                    onMouseDown={this.promptForLink}
                    style={{marginRight: 10}}>
                    Add Link
                </button>
                <button onMouseDown={this.removeLink}>
                  Remove Link
                </button>
                {urlInput}
            </div>
           
        )
    }

    promptForLink(e){
        e.preventDefault();
        const {editorState} = this.props;
        const selection = editorState.getSelection();
        if (!selection.isCollapsed()) {
          const contentState = editorState.getCurrentContent();
          const startKey = editorState.getSelection().getStartKey();
          const startOffset = editorState.getSelection().getStartOffset();
          const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
          const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset);

          let url = '';
          if (linkKey) {
            const linkInstance = contentState.getEntity(linkKey);
            url = linkInstance.getData().url;
          }

          this.setState({
            showURLInput: true,
            urlValue: url,
          }, () => {
            setTimeout(() => this.refs.url.focus(), 0);
          });

        }
        
    }
    removeLink(e) {
        e.preventDefault();
        const {editorState,updateDocument} = this.props;
        const selection = editorState.getSelection();
        if (!selection.isCollapsed()) {
            let newState= RichUtils.toggleLink(editorState, selection, null);
            if(newState){
                updateDocument(newState);
            }
        }
    }
    onLinkInputKeyDown(e) {
        if (e.which === 13) {
          this.confirmLink(e);
        }
      }
    confirmLink(e){
        e.preventDefault();
        const{editorState,updateDocument} = this.props;
        const{urlValue} = this.state;
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity(
        'LINK',
        'IMMUTABLE',
        {url: urlValue}
        );
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
        let newState = RichUtils.toggleLink(
            newEditorState,
            newEditorState.getSelection(),  
            entityKey
        );
        let selection = newState.getSelection();

        let collapsed = selection.merge({
            anchorOffset: selection.getEndOffset(), 
            focusOffset: selection.getEndOffset()
          });

        let newEditorState2 = EditorState.forceSelection(newState, collapsed);

        let selection2 = newEditorState2.getSelection();

        let cs = Modifier.insertText(
          newEditorState2.getCurrentContent(),
          selection2,
          ' '
        );

        const newEditorState3 = EditorState.push(
          editorState,
          cs,
          'insert-text'
        );

        this.setState({
            showURLInput: false,
            urlValue: '',
        })
        if(newEditorState3){
            updateDocument(newEditorState3);
        }
        
    }
}