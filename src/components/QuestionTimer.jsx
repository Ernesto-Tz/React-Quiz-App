import React, { useEffect, useState } from 'react'


export default function QuestionTimer({timeout, onTimeout}) {

  const [remainingTime, setRemainingTime] = useState(timeout);

  useEffect(() => {
    const timer = setTimeout(onTimeout, timeout);
    console.log('timer running');
    
      return () => {
        clearTimeout(timer);
        setRemainingTime(timeout);
      }
  }
  , [timeout, onTimeout]);


  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevState) => prevState - 100);
    }, 100);

    return () => {
      clearInterval(interval);
    }
  }, []);

  return (
    <progress id='question-time' value={remainingTime} max={timeout}/>
  )
}
