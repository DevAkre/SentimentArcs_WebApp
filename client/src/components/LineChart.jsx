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

export default function LineChart({datasets, xLabel, yLabel}) {
    const data = {
        labels: datasets.map((item) => item.label),
        datasets: [
            {
                label: 'Sentiment',
                data: datasets.map((item) => item.sentiment)
            }
           
        ]
    };
    
    return <Line data={data} />;
}