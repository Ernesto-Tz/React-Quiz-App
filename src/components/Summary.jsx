import quizComplete from '../assets/quiz-complete.png';
import QUESTIONS from '../../questions.js';


function getPercentage(count) {
  return Math.round((count / QUESTIONS.length) * 100);
}

export default function Summary({userAnswers}) {

  const correctAnswersCount = userAnswers.filter((answer, index) => answer === QUESTIONS[index].answers[0]).length;
  const correctPercentage = getPercentage(correctAnswersCount);
  const skippedCount = userAnswers.filter(answer => answer === null || answer === undefined || answer === '').length;
  const skippedPercentage = getPercentage(skippedCount);
  const incorrectCount = QUESTIONS.length - correctAnswersCount - skippedCount;
  const incorrectPercentage = getPercentage(incorrectCount);



  console.log('userAnswers', userAnswers);
  return (
    <div id='summary'>
      <img src={quizComplete} alt="Trophy item" />
      <h2>Quiz complete!</h2>
      <div id="summary-stats">
        <p>
          <span className='number'>{skippedPercentage}%</span>
          <span className='text'>Skipped</span>
        </p>
        <p>
          <span className='number'>{correctPercentage}%</span>
          <span className='text'>Answered Correctly</span>
        </p>
        <p>
          <span className='number'>{incorrectPercentage}%</span>
          <span className='text'>Incorrect Answers</span>
        </p>
      </div>
      <ol>
        {userAnswers.map((answer, index) => {
          let cssClass = 'user-answer';

          if( answer === null) {
            cssClass += ' skipped';
          } else if (answer === QUESTIONS[index].answers[0]) {
            cssClass += ' correct';
          } else {
            cssClass += ' wrong'
          }
          return (
            <li key={index} className={answer === QUESTIONS[index].answers[0] ? 'correct' : 'wrong'}>
              <h3>{index + 1}</h3>
              <p className='question'>{QUESTIONS[index].text}</p>
              <p className={cssClass}>{answer ?? 'Skipped'}</p>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
