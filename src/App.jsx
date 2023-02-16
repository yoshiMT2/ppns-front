import { useState, useEffect } from 'react'
import { LineDaily, SittersBar } from './components/LineChart'
import { Loader } from './components/Loader'
import Stats from './components/Stats'

function App() {
  const [dailyReport, setDailyReoprt] = useState(null)

  useEffect(() => {
    async function getInitialData () {
      const res = await fetch('https://ppns-daily-report-api.herokuapp.com/daily')
      const data = await res.json()
      setDailyReoprt(data['data'])
    }
    getInitialData()
  },[])

  return (
    <div className="">
      {dailyReport
      ? <div className='px-5 pt-10'>
        <div className='ml-5'>7日間比較</div>
        <Stats data={dailyReport}/>
        <div className='my-10'></div>
        <LineDaily data={dailyReport}/>
        <SittersBar data={dailyReport}/>
      </div>
      :<Loader />
      }
    </div>
  )
}

export default App
