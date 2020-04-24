import React, { useState, useEffect } from 'react';
import parse from 'html-react-parser';
import { Link, useHistory } from 'react-router-dom';
import DataTable from 'react-data-table-component';

import './styles.css';
import NavigationBar from '../../components/NavigationBar';

import api from '../../services/api';

export default function Animals() {
  const [animals, setAnimals] = useState([]);
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
      name: 'Descrição',
      selector: 'description',
      sortable: true,
      cell:row => parse(row.description)
    },
    {
      name: 'Criação',
      selector: 'createdAt',
      sortable: true,
    },
  ];

  function handleChange(state) {
    // You can use setState or dispatch with something like Redux so we can use the retrieved data
    console.log('Selected Rows: ', state.selectedRows);
    alert(state);
  };

  function onRowClicked(e) {    
    history.push(`/config/animais/${e.id}`)
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
    api.get('animals', { params: { size, page } })
      .then(response => {
        setAnimals(response.data);        
        setTotalCount(parseInt(response.headers['x-total-count']))
      })
  }, [updateTable, setTotalCount, page, size]);


  return (
    <div>
      <NavigationBar />
      <div className="container">
        <DataTable title="Animais"
          striped
          highlightOnHover
          onRowClicked={e => onRowClicked(e)}
          columns={columns}
          data={animals}
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
