import styles from '../../styles/Results.module.css'
import IR_table from './irTable'
//import Counts from './Counts'

export default function Results() {
  return (
    <div className={styles.resultsContainer}>
      <IR_table/>
      {/*<Counts/>*/}
    </div>
  )
}