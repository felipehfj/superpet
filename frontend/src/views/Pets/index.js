import React, { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';

import './styles.css';
import NavigationBar from '../../components/NavigationBar';

import api from '../../services/api';

export default function Pets() {
  const [pets, setPets] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const { addToast } = useToasts();

  const history = useHistory();

  useEffect(() => {
    api.get('pets', { params: { size, page } })
      .then(response => {
        setPets(response.data);
        setTotalCount(parseInt(response.headers['x-total-count']))
      }).catch(e => {        
        addToast(e.response.data.message, { appearance: 'error' });
      })
  }, [setTotalCount, page, size]);


  return (
    <div>
      <NavigationBar />
      <div className="container">
        <div className="all-container">
          {
            pets.map(item => (
              <div key={item.id}>
                <div className="pet-container">
                  <div className="card" >
                    <div className="card-body">
                      <h5 className="card-title">{item.name}</h5>
                      <p className="card-text">Cor: {item.color}</p>
                      <p className="card-text">Tipo: {item.animalName}</p>
                      <Link className="btn btn-primary btn-block" to={"pets/" + item.id}>Ver</Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div >
  );
}
