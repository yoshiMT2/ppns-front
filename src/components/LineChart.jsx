import { useEffect, useState } from 'react';
import {
	ComposedChart,
	Line,
	Area,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
	BarChart
} from 'recharts';

export const LineDaily = ({ data }) => {
	const [reversed, setReversed] = useState()
	//   const [movingAverage, setMovingAverage] = useState()

	function calculateMovingAverage(arr, window) {
		if (!arr || arr.length < window) {
			return [];
		}
		let index = window - 1;
		const length = arr.length + 1;
		const simpleMovingAverages = [];
		while (++index < length) {
			const windowSlice = arr.slice(index - window, index);
			const sum = windowSlice.reduce((prev, curr) => prev + curr, 0);
			simpleMovingAverages.push(sum / window);
		}
		return simpleMovingAverages;
	}
	useEffect(() => {
		// const workload = data.map(d => d.daily)
		// const ma = calculateMovingAverage(workload, 7)
		// setMovingAverage(["", "", "", "", "", "", ...ma])
		setReversed(data.reverse())
	}, [])
	console.log(reversed)
	return (
		<>
			{/* <ResponsiveContainer width='100%' height='100%'> */}
			<ComposedChart
				width={1300}
				minWidth={800}
				height={400}
				data={reversed}
				margin={{
					top: 20,
					right: 20,
					bottom: 20,
					left: 20,
				}}
			>
				<CartesianGrid stroke='#f5f5f5' />
				<Tooltip />
				<Legend />
				<XAxis dataKey='date' />
				<YAxis
					yAxisId={1}
					orientation='right'
					domain={[2200, 2300]}
					unit='円'
					label={{ value: '時給', angle: 90, position: 'insideRight', offset: -13 }}
				/>
				<YAxis
					yAxisId={2}
					domain={['auto', 'auto']}
					unit='人'
					label={{ value: '稼働数', angle: -90, position: 'insideLeft', offset: -10 }}
				/>
				{/* <YAxis yAxisId={3} domain ={['dataMin - 1', 'auto']} /> */}
				<Bar yAxisId={2} type='monotone' dataKey="daily" fill="#58d0ee" barSize={30} name="日毎稼働数" />
				<Line yAxisId={2} type='monotone' dataKey='moving_averages' connectNulls stroke="#ff8b3d" strokeWidth="2" name="7日間移動平均" />
				<Line yAxisId={1} type='monotone' dataKey='wage' connectNulls stroke="#6489ED" strokeWidth="2" name="時給平均" />
			</ComposedChart>
			{/* </ResponsiveContainer> */}
		</>
	)
}

export const SittersBar = ({ data }) => {
	return (
		<>
			{/* <ResponsiveContainer width='100%' height='100%'> */}
			<ComposedChart
				width={1300}
				minWidth={800}
				height={400}
				data={data}
				margin={{
					top: 20,
					right: 20,
					bottom: 20,
					left: 20,
				}}
			>
				<defs>
					<linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
						<stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
						<stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
					</linearGradient>
				</defs>
				<CartesianGrid stroke='#f5f5f5' />
				<Tooltip />
				<Legend />
				<XAxis dataKey='date' />
				<YAxis
					yAxisId={1}
					domain={[1600, 'auto']}
					unit='人'
					label={{ value: '登録者数', angle: -90, position: 'insideLeft', offset: -13 }}

				/>
				<YAxis
					orientation='right'
					yAxisId={2}
					domain={[0, 100]}
					unit='%'
					label={{ value: '稼働率', angle: 90, position: 'insideRight', offset: -10 }}
				/>
				<Area yAxisId={1} dataKey="active" fill="url(#colorUv)" name="登録者数" />
				<Line yAxisId={2} type='monotone' dataKey={data => Math.round((data.daily / data.active) * 1000) / 10} connectNulls stroke="#82ca9d" strokeWidth="2" dot={false} name="稼働率" />

				{/* </ResponsiveContainer> */}
			</ComposedChart>
		</>
	)
}

