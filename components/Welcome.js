import styles from '../styles/Welcome.module.css'
import IconButton from '@mui/material/IconButton';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

export default function Welcome() {
  return (
    <div className={styles.welcome}>
      {/*<button className={styles.tool}>Skip</button>*/}
      <h1 className={styles.title}>
        PhaseFinder-LR
      </h1>
      <p className={styles.description}>
        <a href='https://github.com/XiaofangJ/PhaseFinder' rel="noreferrer" target="_blank">PhaseFinder</a> is a tool 
        developed by <a href='https://dspace.mit.edu/handle/1721.1/124944' rel="noreferrer" target="_blank">Jiang et al. (2019)</a>{' '}
        used to identify invertible DNA regions (invertons). Here, we adapt PhaseFinder to analyze data from 29,799 
        long read sequencing runs from 4,022 different strains and species of bacteria.
      </p>
      <p className={styles.scroll}>Scroll down to view results</p>
      {/*<ArrowDownwardIcon />*/}
      <footer className={styles.footer}>
        <a  
          href="https://www.bhattlab.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Bhatt Lab &#128169; Stanford School of Medicine
        </a>
      </footer>
    </div>
  )
}
