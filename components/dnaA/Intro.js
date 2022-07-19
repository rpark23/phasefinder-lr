import styles from '../../styles/dnaA/Intro.module.css'
import DnaAspecies from '../../components/dnaA/DnaAspecies'
import DnaApairs from '../../components/dnaA/DnaApairs'


export default function Intro() {
  return (
    <div className={styles.welcome}>
      <h1 className={styles.title}>
        DnaA Analysis
      </h1>
      <div className={styles.description}>
        <ul>
          <li className={styles.point}>1461 out of 51,292 partial or intragenic invertible regions (IRs) 
            were found within <strong>DnaA</strong> or <strong>DnaA family proteins</strong> from 128 different 
            species/strains.
            <ul className={styles.indent}>
              <li className={styles.point2}>After hypothetical proteins, DnaA proteins were the{' '}
              <strong>most common inference</strong> (mostly derived using protein homology). </li>
            </ul>
          </li>
          <li className={styles.point}>Here, we focus on the <strong>835 IRs</strong> within the coding sequence of{' '} 
            "<span className={styles.underline}>chromosomal replication initiator protein DnaA</span>" 
             from 115 unique species/strains.
            <ul className={styles.indent}>
              <li className={styles.point2}>The majority (430 IRs) were from <strong>Clostridioides difficile</strong> runs.</li>
              {<DnaAspecies />}
              <li className={styles.point2}>The repeat regions for these IRs ranged in length from 11 to 241 bps with only 
              5 repeat regions exceeding 45 bps.</li>
            </ul>
          </li>
          <li className={styles.point}>Next, pair-wise comparisons were done between all IRs with repeat regions of the same length.
            For example, there are 16 IRs with 21 bp repeat regions. Hence, <sub>16</sub>C<sub>2</sub>{' '}
            = 240 pairs of IRs (with 21 bp repeat regions) were compared.
            <ul className={styles.indent}>
              <li className={styles.point2}>
                Below, is a table of these pairs sorted by % identity of repeat regions, total runs, and total reads.
                Click on a row for full comparison.
              </li>
              {<DnaApairs />}
            </ul>
          </li>
        </ul>
      </div>
      {/* <footer className={styles.footer}>
        <a  
          href="https://www.bhattlab.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Bhatt Lab &#128169; Stanford School of Medicine
        </a>
      </footer> */}
    </div>
  )
}
