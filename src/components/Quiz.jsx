
import { useState, useCallback } from 'react';
import QUESTIONS from '../../questions.js';
import Question from './Question.jsx';
import Summary from './Summary.jsx';


export default function Quiz() {
  const [userAnswers , setUSerAnswers] = useState([]);
  const activeQuestionIndex = userAnswers.length;
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;
  
  const handleSelectedAnswer = useCallback (function handleSelectedAnswer (selectedAnswer) {
    setUSerAnswers((prevState) => {
      return [... prevState, selectedAnswer];
    });
  },[]);

  const handleSkipAnswer = useCallback(() => { handleSelectedAnswer(null) }, [handleSelectedAnswer]);
  
  if (quizIsComplete) {
    return (
      <Summary userAnswers={userAnswers}/>
    )
  }

  return (
    <div id='quiz'>
      <Question
        key={activeQuestionIndex}
        index={activeQuestionIndex}
        onSelectedAnswer={handleSelectedAnswer}
        onSkippedAnswer={handleSkipAnswer}
      />
    </div>
  )
}
