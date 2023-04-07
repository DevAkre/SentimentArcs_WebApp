import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Colors,
    Legend,
    Tooltip,
  } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Colors,
    Title,
    Tooltip,
    Legend
  );

export default function LineChart({lineLabels, datasets, xLabel, yLabel}) {
    let labels = [];
    for(let i = 0; i < datasets[0].length; i+=10){
        labels.push(i);
    }

    const data = {
        //labels step by n
        labels: labels,
        datasets:[]
    };

    for(let i =0; i< datasets.length; i++){
        data.datasets.push({
            data:  datasets[i].map((item) => item.sentiment),
            label: lineLabels[i],
            fill: false
        });
    }
    return <Line data={data} />;
}