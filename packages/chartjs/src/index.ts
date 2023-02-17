// import {
//   Chart,
//   LineController,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Colors,
// } from 'chart.js';

// Chart.register(LineController, CategoryScale, LinearScale, PointElement, LineElement, Colors);

import Chart from 'chart.js/auto';

window.Webflow ||= [];
window.Webflow.push(async () => {
  const data1 = [
    { year: 2010, count: null },
    { year: 2011, count: NaN },
    { year: 2012, count: 15 },
    { year: 2013, count: 25 },
    { year: 2014, count: 22 },
    { year: 2015, count: 30 },
    { year: 2016, count: 28 },
  ];
  const data2 = [
    { year: 2010, count: 45 },
    { year: 2011, count: 20 },
    { year: 2012, count: 12 },
    { year: 2013, count: 3 },
    { year: 2014, count: 25 },
    { year: 2015, count: 11 },
    { year: 2016, count: 32 },
  ];

  // Chart 1
  const ctx1 = document.querySelector<HTMLCanvasElement>('[data-element="chart-1"]');
  if (!ctx1) return;

  const scores = await fetchScores();
  const player1Scores = scores.filter(({ player }) => player === 'Player 1');
  const player2Scores = scores.filter(({ player }) => player === 'Player 2');
  console.log({ player1Scores, player2Scores });

  new Chart(ctx1, {
    type: 'line',
    options: {
      // aspectRatio: 3,
    },
    data: {
      labels: player1Scores.map((score, index) => index),
      datasets: [
        {
          label: 'Player 1',
          data: player1Scores.map((row) => row.score),
        },
        {
          label: 'Player 2',
          data: player2Scores.map((row) => row.score),
        },
      ],
    },
  });

  // Chart 2
  const ctx2 = document.querySelector<HTMLCanvasElement>('[data-element="chart-2"]');
  if (!ctx2) return;

  const stockPrices = getStockPrices();
  console.log({ stockPrices });

  new Chart(ctx2, {
    type: 'line',
    data: {
      labels: stockPrices.map(({ year }) => year),
      datasets: [
        {
          data: stockPrices.map(({ price }) => price),
          label: 'Price',
        },
      ],
    },
    options: {
      scales: {
        y: {
          ticks: {
            callback: (value) => {
              return `$${value}`;
            },
          },
        },
      },
      animations: {
        tension: {
          duration: 1000,
          easing: 'linear',
          from: 0.5,
          to: 0,
          loop: true,
        },
      },
    },
  });
});

/**
 * @returns Stock prices
 */
const getStockPrices = () => {
  return [...Array(91)]
    .map(() => ({
      year: Math.round(Math.random() * 91 + 1929),
      price: Math.round(Math.random() * 3000 + 1000),
    }))
    .sort((a, b) => a.year - b.year);
};

const fetchScores = async () => {
  const response = await fetch('/scores');
  const html = await response.text();

  const parser = new DOMParser();
  const page = parser.parseFromString(html, 'text/html');
  console.log(page);

  const scripts = page.querySelectorAll('script[type="application/json"]');
  const scores: Array<{ player: string; score: number }> = [...scripts].map((script) =>
    JSON.parse(script.textContent!)
  );

  return scores;
};
