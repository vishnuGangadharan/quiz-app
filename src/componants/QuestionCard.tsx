import React from 'react'
import { answerObject } from '../App'
import { Wrapper,ButtonWrapper } from './QuestionCard.styles'


//assigning types name can be any eg.props
type props = {
    question : string;
    answers : string[];
    callback : (e : React.MouseEvent<HTMLButtonElement>) => void ;
    userAnswer: answerObject |undefined;
    questionNum: number
    totalQuestions: number;
}



const QuestionCard: React.FC<props> = ({
    question,
    answers,
    callback,
    userAnswer,
    questionNum,
    totalQuestions
}) => {
  return (
    <Wrapper>
      <p className='number'>
        Question : {questionNum} / {totalQuestions}
      </p>
      <p dangerouslySetInnerHTML={{ __html : question}}></p>
      <div >
            {
                answers.map((answer)=>(
                    <ButtonWrapper 
                    correct= {userAnswer?.correctAnswer == answer}
                    userClicked = {userAnswer?.answer == answer}
                    key={answer}>
                        <button style={{backgroundColor:'white'}} disabled={userAnswer ? true :false} value={answer}onClick={callback} > 
                          
                          
                            <span dangerouslySetInnerHTML={{__html: answer}}></span>

                        </button>
                        
                    </ButtonWrapper>
                ))
            }
      </div>
    </Wrapper>
  )
}

export default QuestionCard
