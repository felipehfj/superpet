import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function EventList(props) {
    const [list, setList] = useState([]);
    const [baseLinkTo, setBaseLinkTo] = useState('');
    
    useEffect(() =>{
        setList(props.list);
        setBaseLinkTo(props.baseLinkTo)
    }, [props.list, props.baseLinkTo]);
  return <div>
      <div className="container">
        <div className="all-container">
          {
            list.map(item => (
              <div key={item.id}>
                <div className="pet-container">
                  <div className="card" >
                    <div className="card-body">
                      <h5 className="card-title">{item.createdAt}</h5>                      
                      <p className="card-text">Descrição: {item.description}</p>
                      <Link className="btn btn-primary btn-block" to={baseLinkTo + "/" + item.id}>Ver</Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
  </div>;
}

export default EventList;