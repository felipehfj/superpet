import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState } from 'draft-js'
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import './styles.css';
import NavigationBar from '../../components/NavigationBar';
import api from '../../services/api';
import { FaBackward } from 'react-icons/fa';

export default function EventType() {
  const { id } = useParams();

  const [refreshPage, setRefreshpage] = useState(0);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const { addToast } = useToasts();


  useEffect(() => {
    api.get(`eventTypes/${id}`)
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

  function updateEventType(e) {
    if (e) e.preventDefault();
    api.patch(`eventTypes/${id}`, {
      name, description
    })
      .then(response => {
        setRefreshpage(refreshPage + 1)
        addToast('Tipo de Evento salvo com sucesso', { appearance: 'success' });
      })
      .catch(e => {        
        addToast(e.response.data.message, { appearance: 'error' });
      })
  }

  return (
    <div>
      <NavigationBar />
      <div className="container">
        <Link to='/config/tipos-de-evento'><FaBackward /> Voltar</Link>
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
                wrapperClassName=""
                editorClassName="h700 form-control"
                onEditorStateChange={onEditorStateChange}
                localization={{
                  locale: 'pt',
                }}
              />
            </div>
            <button className="btn btn-lg btn-primary w-100" type="button" onClick={e => updateEventType(e)}>Salvar</button>
          </div>
        </form>

      </div>
    </div>
  );
}
