export const cols = [
  {
    id: 'run',
    header: 'Run',
    width: 150,
    filter: 'search'
  },
  {
    id: 'fReads',
    header: 'Forward Reads',
    width: 150,
    filter: 'slider',
    max: 135283,
    step: 1
  },
  {
    id: 'rReads',
    header: 'Reverse Reads',
    width: 150,
    filter: 'slider',
    max: 58456,
    step: 1
  },
  {
    id: 'ratio',
    header: 'Ratio',
    width: 150,
    filter: 'slider',
    max: 1,
    step: 0.01
  }
]