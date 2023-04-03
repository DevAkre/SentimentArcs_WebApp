import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

export default function LineChart({labels, dataset, title, xLabel, yLabel}) {
    var l = [];
    for (var i = 0; i < dataset.length; i+=100) {
        l.push(i);
    };

    const data = {
        
        labels: l,
        datasets: [
            {
                data: dataset.map((item) => item.sentiment),
                label: "Vader",
                borderColor: "#3e95cd",
                fill: false
            }
        ]
    };
    return <Line data={data} />;
}