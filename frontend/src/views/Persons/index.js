import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import DataTable from 'react-data-table-component';

import './styles.css';
import NavigationBar from '../../components/NavigationBar';

import api from '../../services/api';

export default function Persons() {
  const [persons, setPersons] = useState([]);
  const [updateTable, setUpdateTable] = useState(0);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);  

  const history = useHistory();
  const columns = [
    {
      name: 'ID#',
      selector: 'id',
      sortable: true,
      right: true,
    },
    {
      name: 'Nome',
      selector: 'name',
      sortable: true,
    },
    {
      name: 'Email',
      selector: 'email',
      sortable: true,      
    },    
  ];
  function onRowClicked(e) {    
    history.push(`/config/pessoas/${e.id}`)
  }

  function onChangePage(e) {
    console.log("Page: " + e);    
    setPage(parseInt(e));    
  }

  function onChangeRowsPerPage(e) {
    console.log("Row: " + e);   
    setSize(parseInt(e));    
  }

  useEffect(() => {
    api.get('persons', { params: { size, page } })
      .then(response => {
        setPersons(response.data);        
        setTotalCount(parseInt(response.headers['x-total-count']))
      })
  }, [updateTable, setTotalCount, page, size]);


  return (
    <div>
      <NavigationBar />
      <div className="container">
        <DataTable title="Pessoas"
          striped
          highlightOnHover
          onRowClicked={e => onRowClicked(e)}
          columns={columns}
          data={persons}
          pagination          
          paginationServer
          paginationDefaultPage={1}
          paginationPerPage={10}
          onChangeRowsPerPage={onChangeRowsPerPage}
          paginationRowsPerPageOptions={[5, 10, 20, 50, 100]}
          onChangePage={onChangePage}
          paginationTotalRows={totalCount}
          paginationComponentOptions={{ rowsPerPageText: 'Registros por página:', rangeSeparatorText: 'de', noRowsPerPage: false, selectAllRowsItem: false, selectAllRowsItemText: 'All' }}
        />
      </div>
    </div >
  );
}
