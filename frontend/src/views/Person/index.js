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

export default function Person() {
  const { id } = useParams();

  const [refreshPage, setRefreshpage] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');  
  const { addToast } = useToasts();


  useEffect(() => {
    api.get(`persons/${id}`)
      .then(response => {
        setName(response.data.name);
        setEmail(response.data.email);        
      })
  }, [id, refreshPage])

  function updatePessoa(e) {
    if (e) e.preventDefault();
    api.patch(`persons/${id}`, {
      name, email
    })
      .then(response => {
        setRefreshpage(refreshPage + 1)
        addToast('Pessoa salva com sucesso', { appearance: 'success' });
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
                required
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="control-label">E-mail</label>
              <input
                className="form-control"
                type="email"
                placeholder="E-mail da pessoa"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            
            <button className="btn btn-lg btn-primary w-100" type="button" onClick={e => updatePessoa(e)}>Salvar</button>
          </div>
        </form>

      </div>
    </div>
  );
}
