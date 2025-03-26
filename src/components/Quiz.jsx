
import { useState, useCallback } from 'react';
import QUESTIONS from '../../questions.js';
import quizComplete from '../assets/quiz-complete.png';
import QuestionTimer from './QuestionTimer.jsx';


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
  
  const shuffleAnswers = [...QUESTIONS[activeQuestionIndex].answers].sort(() => Math.random() - 0.5);

  return (
    <div id='quiz'>
      <div id="question">
        <QuestionTimer key={activeQuestionIndex} timeout={10000} onTimeout={handleSkipAnswer}/>
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id='answers'>
          {shuffleAnswers.map((answer) => {
            const isSelected = userAnswers[userAnswers.length - 1] === answer;
            let cssClass = '';
            if (answerState === 'answered' && isSelected) {
              cssClass = 'selected';
            }
            if ((answerState === 'correct' || answerState === 'wrong') && isSelected) {
              cssClass = answerState;
            }
            return(
              <li key={answer} className='answer'>
                <button onClick={() => handleSelectedAnswer(answer)} className={cssClass}>
                  {answer}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  )
}
