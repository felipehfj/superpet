import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, convertFromHTML, ContentState } from 'draft-js'
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import './styles.css';
import NavigationBar from '../../components/NavigationBar';
import api from '../../services/api';

export default function Animal() {
  const history = useHistory();
  const { id } = useParams();

  const [refreshPage, setRefreshpage] = useState(0);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const [editorState, setEditorState] = useState(EditorState.createEmpty());


  useEffect(() => {
    api.get(`animals/${id}`)
      .then(response => {
        setName(response.data.name);
        setDescription(response.data.description);
        setCreatedAt(response.data.createdAt);

        let contentBlock = htmlToDraft(response.data.description);
        if (contentBlock) {
          let contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
          setEditorState(EditorState.createWithContent(contentState));
        }
      })
  }, [id, refreshPage])

  // Finish!
  function onEditorStateChange(editorState) {
    setEditorState(editorState);
    setDescription(draftToHtml(convertToRaw(editorState.getCurrentContent())))
  }

  function updateAnimal(e){
    if(e) e.preventDefault();
    api.patch(`animals/${id}`, {
      name, description
    })
    .then(response =>{
      setRefreshpage( refreshPage + 1)
    })
  }

  return (
    <div>
      <NavigationBar />
      <div className="container">
        <form >
          <div className="form-group">

            <label className="control-label">{id}</label>
            <div className="form-group">
              <label className="control-label">Nome</label>
              <input
                className="form-control"
                placeholder="Título do caso"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="control-label">Descrição</label>
              <Editor
                editorState={editorState}
                wrapperClassName="form-control"
                editorClassName="form-control"
                onEditorStateChange={onEditorStateChange}
                localization={{
                  locale: 'pt',
                }}
              />              
            </div>

            <button className="button" type="button" onClick={e => updateAnimal(e)}>Salvar</button>
            <button className="button" type="button" onClick={e => history.goBack()}>Voltar</button>
          </div>
        </form>

      </div>
    </div>
  );
}
