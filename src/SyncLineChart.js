import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
  } from 'recharts';
 
const _linspace = (end,number) => (
  [...Array(Math.ceil(number)).keys()] //create array of n nonnegative integers
  .map(i => Math.round(i*(end/(number-1)))) //scale up to desired end length
)

export default function SyncLineChart(props) {

  const data = props.data
  const lr_key = props.leverage_ratio_key
  const travel_key = props.travel_key
  const as_key = props.anti_squat_key 

  const max_travel = (data.length>0 ? data[data.length-1][travel_key] : 0)

  return(
    <div style={{ width: '100%' }}>
    <h4>Results:</h4>

    <p>Leverage Ratio</p>

    <ResponsiveContainer width="100%" height={450}>
      <LineChart
        width={500}
        height={200}
        data={data}
        syncId="anyId"
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type = "number" dataKey={travel_key} domain = {['auto', 'auto']} ticks = {_linspace(max_travel,max_travel/20+1)}/>
        <YAxis type = "number" domain={['auto', 'auto']} allowDataOverflow={true}/>
        <Tooltip labelFormatter={(label) => "Travel: " + label} contentStyle = {{'color':'#E4C3AD','background-color': '#546A7B'}} itemStyle = {{'color':'#E4C3AD'}} />
        <Line dataKey={lr_key} stroke="#8884d8" fill="#8884d8" dot = {false} />
      </LineChart>
    </ResponsiveContainer>
    
    <p>Anti-Squat</p>

    <ResponsiveContainer width="100%" height={450}>
      <LineChart
        width={500}
        height={200}
        data={data}
        syncId="anyId"
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type = "number" dataKey={travel_key} domain = {['auto', 'auto']} ticks = {_linspace(max_travel,max_travel/20+1)}/>
        <YAxis type= "number" domain = {['auto', 'auto']}/>
        <Tooltip  labelFormatter={(label) => "Travel: " + label}contentStyle = {{'color':'#E4C3AD','background-color': '#546A7B'}} itemStyle = {{'color':'#E4C3AD'}} />
        <Line  dataKey={as_key} stroke="#82ca9d" fill="#82ca9d" dot = {false} />
      </LineChart>
    </ResponsiveContainer>
  </div>
  )

}