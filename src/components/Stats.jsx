import { useEffect, useState, useMemo } from 'react'
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/20/solid'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Stats({ data }) {
  const [currentWorkload, setCurrentWorkload] = useState(null)
  const [previousWorkload, setPreviousWorkload] = useState(null)
  const [wlChangeType, setWlChangeType] = useState(null)
  const [currentOperationRate, setCurrentOperationRate] = useState(null)
  const [previousOperationRate, setPreviousOperationRate] = useState(null)
  const [orChangeType, setOrChangeType] = useState(null)
  const [currentSitters, setCurrentSitters] = useState()
  const [previousSitters, setPreviousSitters] = useState()
  const [currentWage, setAverageWage] = useState()
  const [previousWage, setPreviousAverageWage] = useState()


  useMemo(() => {
    const reversed = data.reverse()
    const current = reversed.slice(0, 7).map(d => d.daily).reduce((acc, crr) => acc + parseInt(crr, 10), 0)
    const previous = reversed.slice(7, 14).map(d => d.daily).reduce((acc, crr) => acc + parseInt(crr, 10), 0)
    const currentActive = reversed.slice(0, 7).map(d => d.active).reduce((acc, crr) => acc + parseInt(crr, 10), 0)
    const previousActive = reversed.slice(7, 14).map(d => d.active).reduce((acc, crr) => acc + parseInt(crr, 10), 0)
    const currentWage = reversed.slice(0, 7).map(d => d.wage).reduce((acc, crr) => acc + parseInt(crr, 10), 0)
    const previousWage = reversed.slice(7, 14).map(d => d.wage).reduce((acc, crr) => acc + parseInt(crr, 10), 0)
    setCurrentWorkload(current)
    setPreviousWorkload(previous)
    setWlChangeType(current >= previous ? 'increase' : 'decrease')
    setCurrentOperationRate(((current / currentActive)*100).toFixed(2))
    setPreviousOperationRate(((previous / previousActive)*100).toFixed(2))
    setOrChangeType((current / currentActive) >= (previous / previousActive) ? 'increase' : 'decrease')
    setCurrentSitters(Math.round(currentActive/7))
    setPreviousSitters(Math.round(previousActive/7))
    setAverageWage(Math.round(currentWage/7))
    setPreviousAverageWage(Math.round(previousWage/7))

  },[data])

  const stats = [
    { id: 1, name: '???????????????', stat: currentWorkload, previousStat: previousWorkload, change: currentWorkload - previousWorkload, changeType: wlChangeType },
    { id: 2, name: '???????????????', stat: `${currentOperationRate}%`, previousStat: `${previousOperationRate}%`, change: `${(currentOperationRate - previousOperationRate).toFixed(2)}%`, changeType: orChangeType},
    { id: 3, name: '?????????????????????', stat: currentSitters, previousStat: previousSitters, change: currentSitters - previousSitters, changeType: currentSitters > previousSitters ? 'increase' : 'decrease' },
    { id: 4, name: '????????????', stat: currentWage, previousStat: previousWage, change: currentWage - previousWage, changeType: currentWage > previousWage ? 'increase' : 'decrease' },

  ]
  return (
    <div>
      <dl className="m-4 grid grid-cols-1 gap-5 md:grid-cols-4 md:divide-y-0 md:divide-x">
        {stats.map((item) => (
          <div key={item.name} className="overflow-hidden rounded-lg bg-slate-100  px-2 py-5 shadow sm:p-4">
            <dt className="text-base font-normal text-gray-900">{item.name}</dt>
            <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
              <div className="flex items-baseline text-2xl font-semibold text-indigo-600">
                {item.stat}
                <span className="ml-2 text-sm font-medium text-gray-500">from {item.previousStat}</span>
              </div>

              <div
                className={classNames(
                  item.changeType === 'increase' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800',
                  'inline-flex items-baseline px-3 py-1 rounded-lg text-sm font-medium md:mt-2 lg:mt-3'
                )}
              >
                {item.changeType === 'increase' ? (
                  <ArrowUpIcon
                    className="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-green-500"
                    aria-hidden="true"
                  />
                ) : (
                  <ArrowDownIcon
                    className="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-red-500"
                    aria-hidden="true"
                  />
                )}

                <span className="sr-only"> {item.changeType === 'increase' ? 'Increased' : 'Decreased'} by </span>
                {item.change}
              </div>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}