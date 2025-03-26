import React from 'react'
import QuestionTimer from './QuestionTimer.jsx';
import Answers from './Answers.jsx';

export default function Question({questionText, answers, onSelectedAnswer, selectedAnswer, answerState, onSkippedAnswer}) {
  return (
    <div id="question">
      <QuestionTimer 
        timeout={10000} 
        onTimeout={onSkippedAnswer}
      />
      <h2>{questionText}</h2>
      <Answers 
        answers={answers} 
        selectedAnswer={selectedAnswer} 
        answerState={answerState} 
        onSelect={onSelectedAnswer}
      />
    </div>
  )
}
