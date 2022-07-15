export const cols = [
  /*{
    id: 'id',
    header: 'ID',
    width: 80,
    filter: 'search'
  },*/
  {
    id: 'species',
    header: 'Species',
    width: 240,
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
  },
  {
    id: 'nRuns',
    header: 'Number of Runs',
    width: 150,
    filter: 'slider',
    max: 336,
    step: 1
  },
  {
    id: 'type1',
    header: 'Type of IR',
    width: 120,
    filter: 'checkbox'
  },
  {
    id: 'length',
    header: 'IR Length',
    width: 150,
    filter: 'slider',
    max: 727,
    step: 1
  }
]