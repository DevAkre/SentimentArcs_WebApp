import {React} from 'react';
import {ColumnGrid, Column} from '../components/ColumnGrid';
import LineChart from '../components/LineChart';

export default function SinglePage() {
  return(
    <ColumnGrid>
      <Column>
        <LineChart datasetIdKey={1} datasets = {[{id: 1, label: "Vader", dataset: []}]} />
      </Column>
    </ColumnGrid>
  );
}
