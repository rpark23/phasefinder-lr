import React, { useEffect, useLayoutEffect, useState, useRef } from 'react';
import DATA from './data/fullTable.json'
import indices from '../../components/results/data/runIndices.json'
import { cols } from './data/IR_columns'
import RunTable from '../../components/results/RunTable';

import styles from '../../styles/Results.module.css'

import Slider from '@mui/material/Slider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function IRTable() {
  const [queries, setQueries] = useState({'id': '', 'species': '', 'type1': ''});
  const [values, setValues] = useState({'fReads': [0, 135283], 'rReads': [0, 58456], 'ratio': [0, 1], 'nRuns': [0, 336], 'length': [0, 727]});
  //const [types, setTypes] = useState(new Set(['intragenic', 'partial', 'intergenic']));
  const [types, setTypes] = useState([]);
  const [typeChecks, setTypeChecks] = useState({
    intragenic: true,
    partial: true,
    intergenic: true,
  });

  const [hits, setHits] = useState(DATA);
  const [open, setOpen] = useState(false);
  const [currID, setCurrID] = useState(null);
  const [currJ, setCurrJ] = useState(null);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);

  const search = (q=null, i =null) => {
    if (q === null) {
      q = queries['species'];
    }
    if (i === null) {
      i = queries['id']
    }

    function compareNumbers(a, b) {
      return a - b;
    }
    
    let hits = DATA.filter(
      row => row.id.toString().indexOf(i.toString()) > -1
    ).filter(
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
      row => row.nRuns >= values['nRuns'][0]
    ).filter(
      row => row.nRuns <= values['nRuns'][1]
    ).filter(
      row => row.species.toLowerCase().indexOf(q.toLowerCase()) > -1
    ).filter(
      row => types.indexOf(row.type1) > -1
    );
    setHits(hits);

    /*console.log(hits.map(
      row => row.rStart - row.lEnd
    ).sort(compareNumbers).reverse());*/
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
    e.preventDefault();
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };

  const handleType = (e, i) => {
    e.preventDefault();
    const { name, value } = e.target;
    let newValue = values[name];
    newValue[i] = Number(value)
    setValues({
      ...values,
      [name]: newValue
    });
  };

  const handleQuery = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setQueries({
      ...queries,
      [name]: value
    });
    if (name == 'species') {
      search(value);
    } else if (name == 'id') {
      search(null, value);
    }
  };

  const handleCheck = (e) => {
    e.preventDefault();
    setTypeChecks({
      ...typeChecks,
      [e.target.name]: e.target.checked,
    });
  };

  useEffect(() => {
    let t = []
    if (typeChecks.intragenic) {
      t.push('intragenic');
    }
    if (typeChecks.partial) {
      t.push('partial');
    }
    if (typeChecks.intergenic) {
      t.push('intergenic');
    }
    setTypes(t);
  }, [typeChecks]);

  useEffect(() => {
    search();
  }, [types, values]);

  const handleClickOpen = (e, id) => {
    e.preventDefault();
    const j = indices.filter(
      row => row.index == DATA[id].index
    )[0].indices;
    setOpen(true);
    setCurrID(id);
    setCurrJ(j);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { intragenic, partial, intergenic } = typeChecks;

  return (
    <div className={styles.IRcontainer}>
      <TableContainer component={Paper} className={styles.IRs} elevation={8}>
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
                    max={col.max}
                    step={col.step}
                    disableSwap
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
                  <div className={styles.checkboxes}>
                    <FormControlLabel control={<Checkbox name="intragenic" checked={intragenic} onChange={handleCheck} size="small"/>} 
                      label="intragenic" className={styles.checkbox} />
                    <FormControlLabel control={<Checkbox name="partial" checked={partial} onChange={handleCheck} size="small"/>} 
                      label="partial" className={styles.checkbox} />
                    <FormControlLabel control={<Checkbox name="intergenic" checked={intergenic} onChange={handleCheck} size="small"/>} 
                      label="intergenic" className={styles.checkbox} />
                  </div>
                }
              </TableCell>)}
            </TableRow>
          </TableHead>
          <TableBody>
            {hits ? hits.slice(pageSize*(page-1), pageSize*page).map(row => 
              <TableRow key={row.id} onClick={(e) => handleClickOpen(e, row.id-1) /*window.open(`/ir/${row.id}`, '_blank')*/} className={styles.tableRow}>
                {
                  cols.map(col => <td key={col.id}>{col.id == "ratio" ? row[col.id].toFixed(3) : 
                  col.id == 'length' ? row['rStart'] - row['lEnd'] : row[col.id]}</td>)
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
          <DialogTitle>{currID+1}. {DATA[currID].index}</DialogTitle>
          <DialogContent>
          <RunTable i={currJ} ir={DATA[currID]}/>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Back</Button>
          </DialogActions>
        </Dialog> : null
        }
        <div className={styles.tableFooter}>
          <p>{Math.min(hits.length, pageSize*page, pageSize*(page-1)+1)}-{Math.min(hits.length, pageSize*page)} of {hits ? hits.length == 1 ? "1 IR found" : hits.length + " IRs found" : null}</p>
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
            <p>Page {Math.min(Math.ceil(hits.length / pageSize), page)} of {Math.ceil(hits.length / pageSize)}</p>
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
        </div>
      </TableContainer>
    </div>
  );
}