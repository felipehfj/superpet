import React, { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import './styles.css';
import NavigationBar from '../../components/NavigationBar';
import api from '../../services/api';

export default function Pet() {
  const { id } = useParams();

  const [refreshPage, setRefreshpage] = useState(0);
  const [name, setName] = useState('');
  const [color, setColor] = useState('');
  const [animal, setAnimal] = useState('');
  const [animalName, setAnimalName] = useState('');
  const { addToast } = useToasts();

  const history = useHistory();

  useEffect(() => {
    api.get(`pets/${id}`)
      .then(response => {
        setName(response.data.name);
        setColor(response.data.color);
        setAnimal(response.data.animal);
        setAnimalName(response.data.animalName);
      }).catch(e => {
        addToast(e.response.data.message, { appearance: 'error' });
      })
  }, [id, refreshPage])

  function updatePet(e) {
    if (e) e.preventDefault();
    api.patch(`pets/${id}`, {
      name, color, animal, animalName
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
      <div><div className="card" >
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">Cor: {color}</p>
          <p className="card-text">Tipo: {animalName}</p>
          <Link className="btn btn-primary btn-block" to={'/pets'}>Voltar</Link>
        </div>
      </div></div>
    </div>
  );
}