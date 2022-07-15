import React, { useEffect, useState } from 'react';
import DATA from './data/runs.json';
import { cols } from './data/run_columns'

import styles from '../../styles/Results.module.css'

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

export default function RunTable(props) {
  const [results, setResults] = useState(null);
  const [queries, setQueries] = useState({'run': ''});
  const [maxValues, setMaxValues] = useState({'fReads': 1, 'rReads': 1, 'ratio': 1});
  const [values, setValues] = useState({'fReads': [0, 1], 'rReads': [0, 1], 'ratio': [0, 1]});
  const [types, setTypes] = useState(new Set(['intragenic', 'partial', 'intergenic']));
  const [hits, setHits] = useState(null);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);

  useEffect(() => {
    const { i } = props;
    let results = [];
    for (let x=0; x<i.length; x++) {
      results.push(DATA[i[x]]);
    }
    let maxF = Math.max(...results.map(run => run.fReads));
    let maxR = Math.max(...results.map(run => run.rReads));
    setValues({'fReads': [0, maxF], 'rReads': [0, maxR], 'ratio': [0, 1]});
    setMaxValues({'fReads': maxF, 'rReads': maxR, 'ratio': 1});
    setResults(results);
    setHits(results);
  }, []);

  const search = (e, q=null) => {
    e.preventDefault();
    console.log(queries);
    if (q === null) {
      q = queries['run'];
    }
    let hits = results.filter(
      row => row.fReads >= values['fReads'][0]
    ).filter(
      row => row.fReads <= values['fReads'][1]
    ).filter(
      row => row.rReads >= values['rReads'][0]
    ).filter(
      row => row.rReads <= values['rReads'][1]
    ).filter(
      row => row.ratio >= values['ratio'][0]
    ).filter(
      row => row.ratio <= values['ratio'][1]
    ).filter(
      row => row.run.toLowerCase().indexOf(q.toLowerCase()) > -1
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
    <TableContainer component={Paper} className={styles.runs} elevation={8}>
      <Table sx={{ minWidth: 650 }} size="small">
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
                cols.map(col => <td key={col.id}>{col.id == "ratio" ? row[col.id].toFixed(3) : row[col.id]}</td>)
              }
            </TableRow>) : null}
        </TableBody>
      </Table>
      {
        hits ? 
        <div className={styles.tableFooter}>
        <p>{pageSize*(page-1)+1}-{Math.min(hits.length, pageSize*page)} of {hits ? hits.length == 1 ? "1 run found" : hits.length + " runs found" : null}</p>
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
  );
}