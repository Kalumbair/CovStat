import ReactDOM, { createRoot} from 'react-dom/client';
import React from 'react';
import './index.css';

import reportWebVitals from './reportWebVitals';

import { 
  PieChart, Pie, BarChart, 
  Bar, Cell, AreaChart, Area, 
  ComposedChart, Line, Legend,
  ResponsiveContainer, XAxis, 
  YAxis, CartesianGrid, Tooltip } from 'recharts';

import dataWoman from './chartDataAgeWoman'; 
import dataMan from './chartDataAgeWoman'; 
import data1 from './chartDatasilk_dead_recovered';
import dataSituationInCity from'./chartDataTinyBarSitInCity'
import dataPiesituationInCity from './chartDataPiesituationInCity'


const chartSilkDeadRecovered = document.getElementById('charts_silk_dead_recovered');
if(chartSilkDeadRecovered){
ReactDOM.createRoot(chartSilkDeadRecovered).render(
<ResponsiveContainer width="100%" height="100%" >
  <ComposedChart data={data1} margin={{top: 20, right: 80, bottom: 20, left: 20, }}>
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="name" label={{ position: 'insideBottomRight', offset: 0 }} scale="band" />
          <YAxis label={{ angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="amt" stroke="#8884d8" fillOpacity={0.1} fill="#8884d8"/>
          <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
          <Line type="monotone" dataKey="uv" stroke="#ff7300" />
    </ComposedChart>
</ResponsiveContainer>

);

}


const chartTinyBarsituationInCity = document.getElementById('chartTinyBarsituationInCity');

if (chartTinyBarsituationInCity) {
  ReactDOM.createRoot(chartTinyBarsituationInCity).render(
    <ResponsiveContainer width="100%" height="100%" >
 <BarChart  data={dataSituationInCity} layout="vertical" 
    > 
      <CartesianGrid strokeDasharray="3 3" /> 
      <XAxis type="number" hide={true} /> 
      <YAxis type="category" dataKey="name" tick={{ fontSize: 6 }} /> 
      <Tooltip />       
      <Bar dataKey="value"> 
        {dataSituationInCity.map((entry, index) => ( 
          <Cell key={`cell-${index}`} fill={entry.color} /> 
        ))} 
      </Bar> 
    </BarChart> 
    </ResponsiveContainer>

);
  }


 
  const chartPiesituationInCity = document.getElementById('chartPiesituationInCity');

  const RADIAN = Math.PI / 180; 
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => { 
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5; 
    const x = cx + radius * Math.cos(-midAngle * RADIAN); 
    const y = cy + radius * Math.sin(-midAngle * RADIAN); 
   
    return ( 
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central"> 
        {`${(percent * 100).toFixed(0)}%`} 
      </text> 
    ); 
  };

  if (chartPiesituationInCity) {
    ReactDOM.createRoot(chartPiesituationInCity).render(
      <ResponsiveContainer width="100%" height="100%" >
        <PieChart>
      <Pie 
        data={dataPiesituationInCity} 
        dataKey="value" 
        nameKey="name" 
        cx="50%" 
        cy="50%" 
        labelLine={false} 
        label={renderCustomizedLabel} 
        outerRadius={80}
      > 
        {dataPiesituationInCity.map((entry, index) => ( 
          <Cell key={`cell-${index}`} fill={entry.color} /> 
        ))} 
      </Pie>
      </PieChart>
      </ResponsiveContainer>
    );
  }




const chartAgeWoman = document.getElementById('charts__registerCasesAdeaths_byAgeWoman');
const chartAgeMan = document.getElementById('charts__registerCasesAdeaths_byAgeMan');

renderChart(chartAgeWoman, dataWoman); 
renderChart(chartAgeMan, dataMan);

function renderChart(chartElement, data) { 
  if (chartElement) { 
    createRoot(chartElement).render( 
      <ResponsiveContainer width="100%" height="100%"> 
        <AreaChart width={730} height={250} data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}> 
          <defs> 
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1"> 
              <stop offset="5%" stopColor="#ff7300" stopOpacity={0.8} /> 
              <stop offset="95%" stopColor="#ff7300" stopOpacity={0} /> 
            </linearGradient> 
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1"> 
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} /> 
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} /> 
            </linearGradient> 
          </defs> 
          <XAxis dataKey="name" /> 
          <YAxis /> 
          <CartesianGrid strokeDasharray="3 3" /> 
          <Tooltip /> 
          <Area type="monotone" dataKey="uv" stroke="#ff7300" fillOpacity={1} fill="url(#colorUv)" /> 
          <Area type="monotone" dataKey="pv" stroke="#8884d8" fillOpacity={1} fill="url(#colorPv)" /> 
        </AreaChart> 
      </ResponsiveContainer> 
    ); 
  } 
} 



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

reportWebVitals();
