import React, { useEffect, useState } from 'react';
import DATA from './data/DnaAspecies.json';
import { cols } from './data/species_columns'

import styles from '../../styles/dnaA/Intro.module.css'

import Slider from '@mui/material/Slider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';

export default function DnaAspecies() {
  const [results, setResults] = useState(DATA);
  const [queries, setQueries] = useState({'name': ''});
  const [maxValues, setMaxValues] = useState({'count': 276});
  const [values, setValues] = useState({'count': [0, 276]});
  const [hits, setHits] = useState(DATA);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);

  const search = (e, q=null) => {
    e.preventDefault();
    console.log(queries);
    if (q === null) {
      q = queries['name'];
    }
    let hits = results.filter(
      row => row.count >= values['count'][0]
    ).filter(
      row => row.count <= values['count'][1]
    ).filter(
      row => row.name.toLowerCase().indexOf(q.toLowerCase()) > -1
    );
    setHits(hits);
  }

  const handleFirstPageButtonClick = () => {
    setPage(1);
  }

  const handleBackButtonClick = () => {
    setPage(page-1);
  }

  const handleNextButtonClick = () => {
    setPage(page+1);
  }

  const handleLastPageButtonClick = () => {
    setPage(Math.ceil(hits.length / pageSize));
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
    search(e);
  };

  const handleType = (e, i) => {
    const { name, value } = e.target;
    let newValue = values[name];
    newValue[i] = value
    setValues({
      ...values,
      [name]: newValue
    });
    search(e);
  };

  const handleQuery = (e) => {
    const { name, value } = e.target;
    setQueries({
      ...queries,
      [name]: value
    });
    search(e, value);
  };

  return (
    <div className={styles.dnaAContainer}>
      <div className={styles.dnaATable}>
      <TableContainer component={Paper} className={styles.species} elevation={8}>
        <Table size="small">
          <TableHead>
            <TableRow key="header">{cols.map((col) => 
              <TableCell style={{width: col.width}} key={col.id}>
                <h4> {col.header} </h4>
                {
                  col.filter === 'slider' ? 
                  <div className={styles.sliderHeader}>
                    <Slider
                    value={values[col.id]}
                    name={col.id}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    style={{width: '95%'}}
                    max={maxValues[col.id]}
                    step={col.step}
                    />
                    <div className={styles.sliderInput}>
                      <input name={col.id} type="number" min="0" max={col.max} step={col.step} 
                        onChange={(e) => handleType(e, 0)} value={values[col.id][0]} className={styles.input}/>
                      <input name={col.id} type="number" min="0" max={col.max} step={col.step} 
                        onChange={(e) => handleType(e, 1)} value={values[col.id][1]} className={styles.input}/>
                    </div>
                  </div> : col.filter === 'search' ?
                  <form onSubmit={search}>
                    <input type="text" name={col.id} style={{width: '95%'}} className={styles.input} onChange={handleQuery} />
                  </form> : 
                  null
                }
              </TableCell>)}
            </TableRow>
          </TableHead>
          <TableBody>
            {hits ? hits.slice(pageSize*(page-1), pageSize*page).map(row => 
              <TableRow key={row.id}>
                {
                  cols.map(col => <td key={col.id}>{row[col.id]}</td>)
                }
              </TableRow>) : null}
          </TableBody>
        </Table>
        {
          hits ? 
          <div className={styles.tableFooter}>
          <p>{pageSize*(page-1)+1}-{Math.min(hits.length, pageSize*page)} of {hits ? hits.length + " species found" : null}</p>
          <div className={styles.pagination}>
            <IconButton
            onClick={handleFirstPageButtonClick}
            disabled={page === 1}
            >
              <FirstPageIcon />
            </IconButton>
            <IconButton
              onClick={handleBackButtonClick}
              disabled={page === 1}
            >
              <KeyboardArrowLeft />
            </IconButton>
            <p>Page {page} of {Math.ceil(hits.length / pageSize)}</p>
            <IconButton
              onClick={handleNextButtonClick}
              disabled={page >=Math.ceil(hits.length / pageSize)}
            >
              <KeyboardArrowRight />
            </IconButton>
            <IconButton
              onClick={handleLastPageButtonClick}
              disabled={page >= Math.ceil(hits.length / pageSize)}
            >
              <LastPageIcon />
            </IconButton>
          </div>
        </div>: null
        }
      </TableContainer>
      </div>
    </div>
  );
}