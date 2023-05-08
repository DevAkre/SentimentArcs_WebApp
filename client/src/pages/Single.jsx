import {React} from 'react';
import {ColumnGrid, Column} from '../components/ColumnGrid';
import LineChart from '../components/LineChart';
import ModelSelect from '../components/ModelSelect';
import { ModelProvider } from '../contexts/ModelContext';

export default function SinglePage() {
  return(
    <ModelProvider>
      <ModelSelect/>
      <ColumnGrid>
        <Column>
          <LineChart datasetIdKey={1} datasets = {[{id: 1, label: "Vader", dataset: []}]} />
        </Column>
      </ColumnGrid>
    </ModelProvider>
  );
}
