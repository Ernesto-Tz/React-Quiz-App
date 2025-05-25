import React, { useState } from 'react'
import QuestionTimer from './QuestionTimer.jsx';
import Answers from './Answers.jsx';
import QUESTIONS from '../../questions.js';

export default function Question({index, onSelectedAnswer, onSkippedAnswer}) {

  const [answer, setAnswer] = useState({
    selectedAnswer: '', 
    isCorrect: null}
  );

  let timer = 10000;

  if(answer.selectedAnswer) {
    timer = 1000;
  }

  if(answer.isCorrect !== null) {
    timer = 2000;
  }

  function handleSelectedAnswer(selectedAnswer) {
    setAnswer({ 
      selectedAnswer, 
      isCorrect: null 
    });
    
    setTimeout(() => {
      setAnswer({ 
        selectedAnswer, 
        isCorrect: QUESTIONS[index].answers[0] === selectedAnswer,
      });

      setTimeout(() => {
        onSelectedAnswer(selectedAnswer);
      }, 2000);
    }, 1000); 
  }

  let answerState = '';
  if (answer.selectedAnswer && answer.isCorrect !== null) {
    answerState = answer.isCorrect ? 'correct' : 'wrong';
  } else if (answer.selectedAnswer) { 
    answerState = 'answered';
  }

  return (
    <div id="question">
      <QuestionTimer
        key={timer} // This makes sure to recreate the timer component when the timer changes
        timeout={timer} 
        onTimeout={answer.selectedAnswer === '' ? onSkippedAnswer : null}
        mode={answerState}
      />
      <h2>{QUESTIONS[index].text}</h2>
      <Answers 
        answers={QUESTIONS[index].answers} 
        selectedAnswer={answer.selectedAnswer} 
        answerState={answerState} 
        onSelect={handleSelectedAnswer}
      />
    </div>
  )
}
