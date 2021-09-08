import React from 'react';
import { AtomicBlockUtils,CompositeDecorator,RichUtils,EditorState } from 'draft-js';

export default class AddImage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      showURLInput: false,
      url: '',
      urlType: '',
    }
    this.addImage = this.addImage.bind(this);
    this.confirmMedia = this.confirmMedia.bind(this);
    this.onURLInputKeyDown = this.onURLInputKeyDown.bind(this);
    this.onURLChange = (e) => this.setState({urlValue: e.target.value});
  }


  confirmMedia(e) {
    e.preventDefault();
    const{editorState} = this.props;
    const {urlValue, urlType} = this.state;
    console.log({urlValue});
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      urlType,
      'IMMUTABLE',
      {src: urlValue}
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(
      editorState,
      {currentContent: contentStateWithEntity}
    );
    let newState=AtomicBlockUtils.insertAtomicBlock(
      newEditorState,
      entityKey,
      ' '
    )
    this.props.updateDocument(newState);
    this.setState({
      showURLInput: false,
      urlValue: '',
    }, () => {
      setTimeout(() => this.props.focusEditor(), 500);
    });
  }
  onURLInputKeyDown(e) {
    if (e.which === 13) {
      this.confirmMedia(e);
    }
  }
  addImage() {
    this.promptForMedia('image');
  }
  promptForMedia(type) {
    this.setState({
      showURLInput: true,
      urlValue: '',
      urlType: type,
    }, () => {
      setTimeout(() => this.refs.url.focus(), 0);
    });
  }
  render(){
    let urlInput;
    if (this.state.showURLInput) {
      urlInput =
        <div>
          <input
            onChange={this.onURLChange}
            ref="url"
            type="text"
            value={this.state.urlValue}
            onKeyDown={this.onURLInputKeyDown}
          />
          <button onMouseDown={this.confirmMedia}>
            Confirm
          </button>
        </div>;
    }
    return(
      <div>
      <button onMouseDown={this.addImage} style={{marginRight: 10}}>
        Add Image
      </button>
      {urlInput}
      </div>
    )
  }
}