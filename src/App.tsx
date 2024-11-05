import React, { useState } from 'react'
import QuestionCard from './componants/QuestionCard'
import { fetchQuestions } from './API'
import { QuestionState,Difficulty } from './API'
import { GlobalStyle, Wrapper } from './app.styles'

export type answerObject = {
  question : string;
  answer:string;
  correct: boolean;
  correctAnswer : string;

}


function App() {

  const Total_Questions = 10

  const [loading,setLoading] = useState(false)
  const [questions,setQuestions] = useState<QuestionState[]>([])
  const [number,setNumber ] = useState(0)
  const [ userAnswers,setUserAnswers] = useState<answerObject[]>([])
  const [score,setScore] = useState(0)
  const [gameOver,setGameOver] = useState(true)

  console.log(questions);
  
 
const startQuesion = async() =>{
  setLoading(true)
  setGameOver(false)
  const newQuestions= await fetchQuestions(
    Total_Questions,Difficulty.EASY
  )

  setQuestions(newQuestions)
  setScore(0)
  setUserAnswers([])
  setNumber(0)
  setLoading(false)
}

const checkAnswer = (e : React.MouseEvent<HTMLButtonElement>) =>{
    if(!gameOver){
      const answer = e.currentTarget.value
      const correct = questions[number].correct_answer ===answer
      if(correct ) {
        setScore(prev => prev + 1)
       correct? 'green' : 'red'
       
      }
        //save answers in array
      const answerObject = {
        question : questions[number].question,
        answer,
        correct,
        correctAnswer : questions[number].correct_answer
      }

      setUserAnswers((prev)=> [...prev, answerObject])
    }

}

const nextQuestion = () => {
  const next_question = number + 1;
  if (next_question === Total_Questions) {
    setGameOver(true);
  } else {
    setNumber(next_question);
  }
};





  return (
    <>
    <GlobalStyle/>
    <Wrapper>
      <h1>QUIZ ZONE</h1>
      { gameOver || userAnswers.length === Total_Questions ? (
      <button className='start' onClick={startQuesion}>
        start
      </button>
       ) : null  }
      { !gameOver ? <p className='score'>Score:{score} </p> : null}
      {loading && <p>Loading Questions...</p>}
      {!loading && !gameOver && (
      <QuestionCard 
        questionNum={number+1}
        totalQuestions={Total_Questions}
        question={questions[number].question}
        answers={questions[number].answers}
        userAnswer = {userAnswers ? userAnswers[number] : undefined}
        callback={checkAnswer}
      />
      )}
      {!gameOver && !loading && userAnswers.length == number+1 && number !==Total_Questions -1 ? (
      <button className='next' onClick={nextQuestion}>Next Question</button>
      ):null}
    </Wrapper>
    </>
  )
}

export default App
