import Head from 'next/head'
import fs from 'fs/promises';
import data from '../../components/results/data/fullTable.json'
import indices from '../../components/results/data/runIndices.json'
import styles from '../../styles/IR.module.css'

import RunTable from '../../components/results/RunTable';

export const getStaticPaths = async () => {
  const paths = data.map(ir => {
    return {
      params: { id: ir.id.toString()}
    }
  })

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps = async (context) => {
  const i = context.params.id;
  const ir = data[i-1];
  // let gb = await fs.readFile(`gb/${ir.genome}.json`);
  // gb = await JSON.parse(gb);

  const j = indices.filter(
    row => row.index == ir.index
  )[0].indices;

  return {
    props: { ir, j }
  }
}

const IR = ({ ir, j }) => {
  return (
    <div className={styles.irContainer}>
      <Head>
        <title>IR Info</title>
        <meta name="description" content="View Results from PhaseFinder-LR" />
        <link rel="icon" href="/images/favicon/dna.svg" />
      </Head>
      <div className={styles.header}>
        <div className={styles.species}>
          <h2>{ir.species}</h2>
          <p>{ir.genome}</p>
        </div>
        <div>
          <p>{ir.index}</p>
        </div>
      </div>

      <div className={styles.irtype}>
        <h4>Type of IR: </h4>
        <p>{ir.type1}</p>
      </div>

      {
        ir.product1 ? 
        <div className={styles.gene}>
          <div>
            <h4>Product: </h4>{' '}
            <p>{ir.product1}</p>
          </div>
          <div>
            <h4>Inference: </h4>
            <p>{ir.inference1}</p>
          </div>
          <div>
            <h4>Note: </h4>
            <p>{ir.note1}</p>
          </div>
        </div>: null
      }
      <div className={styles.reads}>
        <div>
          <h4>Forward Reads: </h4>{ir.fReads} 
        </div>
        <div>
          <h4>Reverse Reads: </h4>{ir.rReads} 
        </div>
        <div>
          <h4>Ratio: </h4>{ir.ratio}
        </div>
        <div>
          <h4>Number of Runs: </h4>{ir.nRuns}
        </div>
      </div>
      <RunTable i={j} />
      <div className={styles.indices}>
        <div>
          <h4>Indices:</h4> {ir.lStart} {ir.lEnd} {ir.rStart} {ir.rEnd}
        </div>
        <p>({ir.lEnd - ir.lStart} bps, {ir.rStart - ir.lEnd} bps, {ir.rEnd - ir.rStart} bps)</p>
      </div>
    </div>
  )
}

export default IR;