import React from 'react';
import { CompositeDecorator,RichUtils,EditorState } from 'draft-js';

export default class AddImage extends React.Component {
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
          });
        }
    }
    removeLink(e) {
        e.preventDefault();
        const {editorState} = this.props;
        const selection = editorState.getSelection();
        if (!selection.isCollapsed()) {
            this.setState({
            editorState: RichUtils.toggleLink(editorState, selection, null),
            });
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
        'MUTABLE',
        {url: urlValue}
        );
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
        let newState = RichUtils.toggleLink(
            newEditorState,
            newEditorState.getSelection(),  
            entityKey
        );
        this.setState({
            showURLInput: false,
            urlValue: '',
        })
        if(newState){
            updateDocument(newState);
        }

        console.log(newState)
    }
}