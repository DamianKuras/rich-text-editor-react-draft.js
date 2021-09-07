import React from 'react';
import { Editor,EditorState,CompositeDecorator,RichUtils } from 'draft-js';
import EditorToolbar from './EditorToolbar';
import './RichTextEditor.css';
import config from '../decorators/Link';
import 'draft-js/dist/Draft.css'
export default class RichTextEditor extends React.Component{
  constructor(props) {
    super(props);
    const decorators = new CompositeDecorator([
      {
          strategy: findLinkEntities,
          component: Link,
      },
      {
        strategy: findImageEnitites,
        component: Image,
      }
  ]);
    this.state = {
      editorState: EditorState.createEmpty(decorators)
    };
    this.setDomEditorRef = ref => this.domEditor = ref;
    this.focus = () => this.domEditor.focus();
    this.focusEditor= this.focusEditor.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onTab = this.onTab.bind(this);
  }
  focusEditor(){
    this.domEditor.focus();
  }
  componentDidMount(){
    this.domEditor.focus();
  }
  onChange (editorState) {
    this.setState({editorState});
  }
  onTab(e) {
    const maxDepth = 4;
    this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
  }
  render(){
    return (
        <div className="editor-container"> 
          <h1>Editor</h1>
          <EditorToolbar editorState={this.state.editorState} updateDocument={this.onChange} focusEditor={this.focusEditor}/>
          <div className="editor" onClick={this.focus}> 
            <Editor
            className="editor"
              editorState={this.state.editorState}
              onChange={this.onChange} 
              onTab={this.onTab}
              ref={this.setDomEditorRef}/>
          </div>

        </div>
    );
  }
}
function findImageEnitites(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null &&
        contentState.getEntity(entityKey).getType() === 'IMAGE'
      );
    },
    callback
  );
}
const Image = (props) =>{
  const {url} = props.contentState.getEntity(props.entityKey).getData();
  return(
    <img src={url}/>
  )
}
function findLinkEntities(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null &&
        contentState.getEntity(entityKey).getType() === 'LINK'
      );
    },
    callback
  );
}

const Link = (props) => {
  const {url} = props.contentState.getEntity(props.entityKey).getData();
  return (
    <a href={url}>
      {props.children}
    </a>
  );
};