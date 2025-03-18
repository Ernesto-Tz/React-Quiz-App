
import { useState } from 'react';
import QUESTIONS from '../../questions.js';
import quizComplete from '../assets/quiz-complete.png';


export default function Quiz() {
  const [userAnswer, setUSerAnswer] = useState([]);
  const activeQuestionIndex = userAnswer.length;
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;
  
  function handleSelectedAnswer (selectedAnswer) {
    setUSerAnswer((prevState) => {
      return [... prevState, selectedAnswer];
    });
  }
  
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
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id='answers'>
          {shuffleAnswers.map((answer) => (
            <li key={answer} className='answer'>
              <button onClick={() => handleSelectedAnswer(answer)}>
                {answer}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
