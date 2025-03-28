
import { useState, useCallback } from 'react';
import QUESTIONS from '../../questions.js';
import quizComplete from '../assets/quiz-complete.png';
import Question from './Question.jsx';


export default function Quiz() {
  const [answerState, setAnswerState] = useState('');
  const [userAnswers , setUSerAnswers] = useState([]);
  const activeQuestionIndex = answerState === '' ? userAnswers.length : userAnswers.length - 1;
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;
  
  const handleSelectedAnswer = useCallback (function handleSelectedAnswer (selectedAnswer) {
    setAnswerState('answered');
    setUSerAnswers((prevState) => {
      return [... prevState, selectedAnswer];
    });

    setTimeout(() => {
      if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
        setAnswerState('correct');
      } else {
        setAnswerState('wrong');
      }

      setTimeout(() => { setAnswerState('') }, 2000);
    }, 1000);
  },[activeQuestionIndex]);

  const handleSkipAnswer = useCallback(() => { handleSelectedAnswer(null) }, [handleSelectedAnswer]);
  
  if (quizIsComplete) {
    return (
      <div id='quiz'>
        <img src={quizComplete} alt="Trophy item" />
        <h2>Quiz complete!</h2>
        {/* <p>You answered {userAnswer.filter((answer, index) => answer === QUESTIONS[index].correct).length} out of {QUESTIONS.length} questions correctly.</p> */}
      </div>
    )
  }

  return (
    <div id='quiz'>
      <Question
        key={activeQuestionIndex}
        questionText={QUESTIONS[activeQuestionIndex].text}
        answers={QUESTIONS[activeQuestionIndex].answers}
        onSelectedAnswer={handleSelectedAnswer}
        selectedAnswer={userAnswers[userAnswers.length - 1]}
        answerState={answerState}
        onSkippedAnswer={handleSkipAnswer}
      />
    </div>
  )
}
