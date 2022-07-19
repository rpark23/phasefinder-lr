import React, { useEffect, useState } from 'react';
import DATA from './data/DnaApairs.json';
import DnaA from './data/DnaA.json';
import { cols } from './data/pairs_columns';

import styles from '../../styles/dnaA/Intro.module.css';

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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

export default function DnaApairs() {
  const [results, setResults] = useState(DATA);
  const [queries, setQueries] = useState({'species1': '', 'species2': ''});
  const [minValues, setMinValues] = useState({'identity': 0, 'totalRuns': 1, 'totalReads': 1, 'length': 11});
  const [maxValues, setMaxValues] = useState({'identity': 100, 'totalRuns': 31, 'totalReads': 6251, 'length': 38});
  const [values, setValues] = useState({'identity': [0, 100], 'totalRuns': [1, 31], 'totalReads': [1, 6251], 'length': [11, 38]});
  const [hits, setHits] = useState(DATA);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [open, setOpen] = useState(false);
  const [currI, setCurrI] = useState(null);
  const [currJ, setCurrJ] = useState(null);
  const [identity, setIdentity] = useState(null);

  const search = () => {
    let hits = results.filter(
      row => row.species1.toLowerCase().indexOf(queries['species1'].toLowerCase()) > -1
    ).filter(
      row => row.species2.toLowerCase().indexOf(queries['species2'].toLowerCase()) > -1
    ).filter(
      row => row.identity >= values['identity'][0]
    ).filter(
      row => row.identity <= values['identity'][1]
    ).filter(
      row => row.totalRuns >= values['totalRuns'][0]
    ).filter(
      row => row.totalRuns <= values['totalRuns'][1]
    ).filter(
      row => row.totalReads >= values['totalReads'][0]
    ).filter(
      row => row.totalReads <= values['totalReads'][1]
    ).filter(
      row => row.length >= values['length'][0]
    ).filter(
      row => row.length <= values['length'][1]
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
    search();
  };

  const handleType = (e, i) => {
    const { name, value } = e.target;
    let newValue = values[name];
    newValue[i] = value
    setValues({
      ...values,
      [name]: newValue
    });
    search();
  };

  const handleQuery = (e) => {
    const { name, value } = e.target;
    setQueries({
      ...queries,
      [name]: value
    });
  };

  useEffect(() => {
    search();
  }, [queries]);

  const handleClickOpen = (e, row) => {
    e.preventDefault();
    /*const j = indices.filter(
      row => row.index == DATA[id].index
    )[0].indices;*/
    setCurrI(row.i);
    setCurrJ(row.j);
    setIdentity(row.identity)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={styles.dnaAContainer}>
      <div className={styles.dnaApairs}>
      <TableContainer component={Paper} className={styles.pair} elevation={8}>
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
                    min={minValues[col.id]}
                    max={maxValues[col.id]}
                    step={col.step}
                    />
                    <div className={styles.sliderInput}>
                      <input name={col.id} type="number" min={col.min} max={col.max} step={col.step} 
                        onChange={(e) => handleType(e, 0)} value={values[col.id][0]} className={styles.input}/>
                      <input name={col.id} type="number" min={col.min} max={col.max} step={col.step} 
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
              <TableRow key={row.id} onClick={(e) => handleClickOpen(e, row)} className={styles.tableRow}>
                {
                  cols.map(col => <td key={col.id}>{col.id == 'identity' ? <span>{row[col.id].toFixed(1)}%</span> : row[col.id]} {col.id == 'length' ? 'bps' : null}</td>)
                }
              </TableRow>) : null}
          </TableBody>
        </Table>
        {open ? 
        <Dialog
          fullWidth={true}
          maxWidth='xl'
          open={open}
          onClose={handleClose}
        >
          <DialogTitle>IR #{DnaA[currI].id} and IR #{DnaA[currJ].id}</DialogTitle>
          <DialogContent className={styles.comparison}>
            <p className={styles.identity}><strong>{identity.toFixed(1)}% identity</strong> of repeat regions</p>
            <div>
              <h4>IR Index</h4>
              <p>{DnaA[currI].id}: {DnaA[currI].index}</p>
              <p>{DnaA[currJ].id}: {DnaA[currJ].index}</p>
            </div>
            <div>
              <h4>Species</h4>
              <p>{DnaA[currI].species}</p>
              <p>{DnaA[currJ].species}</p>
            </div>
            <div>
              <h4>Forward Reads</h4>
              <p>{DnaA[currI].fReads}</p>
              <p>{DnaA[currJ].fReads}</p>
            </div>
            <div>
              <h4>Reverse Reads</h4>
              <p>{DnaA[currI].rReads}</p>
              <p>{DnaA[currJ].rReads}</p>
            </div>
            <div>
              <h4>Ratio</h4>
              <p>{DnaA[currI].ratio}</p>
              <p>{DnaA[currJ].ratio}</p>
            </div>
            <div>
              <h4># of Runs</h4>
              <p>{DnaA[currI].nRuns}</p>
              <p>{DnaA[currJ].nRuns}</p>
            </div>
            <div>
              <h4>Left Repeat</h4>
              <p>{DnaA[currI].left_seq.toUpperCase()}</p>
              <p>{DnaA[currJ].left_seq.toUpperCase()}</p>
            </div>
            <div>
              <h4>Right Repeat</h4>
              <p>{DnaA[currI].right_seq.toUpperCase()}</p>
              <p>{DnaA[currJ].right_seq.toUpperCase()}</p>
            </div>
            <div>
              <h4>DnaA Protein ID</h4>
              <p>{DnaA[currI].protein_id}</p>
              <p>{DnaA[currJ].protein_id}</p>
            </div>
            <div>
              <h4>DnaA Translation</h4>
              <p>{DnaA[currI].translation}</p>
              <p>{DnaA[currJ].translation}</p>
            </div>
            {/*<RunTable i={currJ} ir={DATA[currID]}/>*/}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Back</Button>
          </DialogActions>
        </Dialog> : null
        }
        {
          hits ? 
          <div className={styles.tableFooter}>
          <p>{pageSize*(page-1)+1}-{Math.min(hits.length, pageSize*page)} of {hits ? hits.length + " pairs found" : null}</p>
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