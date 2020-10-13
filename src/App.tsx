
import React, {useState} from "react";
import QuestionCard from './components/QuestionCard';
import {fetchQuizQuestions} from './API';
import {Difficulty, QuestionsState} from './API'
import {GlobalStyle, Wrapper} from './App.styles';

/*
import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
const About = lazy(() => import('./About'));
const Home = lazy(() => import('./Home'));

 A good way to improve loading times for PWAs is to ensure that the code is not built into big files. 

 This (above About & Home variables) is the syntax to lazily load components in React. You’ll note that it internally uses the 
 dynamic import() syntax, which webpack uses as a “split point.”

 The <Suspense> component will render the <div>Loading...</div> while it waits for a route’s code to be dynamically loaded. 
 This ensures that users load files as they need to and that those files should not be too large — great performance that 
 will scale.

 Before code split:
    47.42 KB  build\static\js\2.b0d049fb.chunk.js     
    1.07 KB   build\static\js\main.9d920572.chunk.js  
    784 B     build\static\js\runtime-main.f4c23f94.js
    278 B     build\static\css\main.5ecd60fb.chunk.css


 After code split"
    47.42 KB          build\static\js\2.b0d049fb.chunk.js
    1.18 KB (+429 B)  build\static\js\runtime-main.b1fa35d4.js
    1.11 KB (+40 B)   build\static\js\main.ace14394.chunk.js
    278 B             build\static\css\main.5ecd60fb.chunk.css
    233 B             build\static\js\4.b341bc01.chunk.js
    229 B             build\static\js\3.b8b1d755.chunk.js

    const App: React.FC = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </nav>
    <Switch>
      <Route path="/about">
        <About />
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
    </Suspense>
  </Router>
);
*/
const TOTAL_QUESTIONS = 10;

export type AnswerObject = {
    question: string;
    answer: string;
    correct: boolean;
    correctAnswer: string;
}

const App = () => {
    const [loading, setLoading] = useState(false);
    const [questions, setQuestions] = useState<QuestionsState[]>([]);
    const [number, setNumber] = useState(0);
    const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver]= useState(true);

    const startTrivia = async () => {
        setLoading(true);
        setGameOver(false);

        const newQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY);

        setQuestions(newQuestions);
        setScore(0);
        setUserAnswers([]);
        setNumber(0);
        setLoading(false);
    };

    const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
        if(!gameOver) {
            const answer = e.currentTarget.value;
            //check answer against correct answer
            const correct = questions[number].correct_answer === answer;
            //add score if answer is correct
            if(correct) {
                setScore((prev) => prev + 1);
            }
            //save answer in the array for user answers
            const answerObject = {
                question: questions[number].question,
                answer,
                correct,
                correctAnswer: questions[number].correct_answer,
            }
            setUserAnswers((prev) => [...prev, answerObject]);
        }
    };

    const nextQuestion = () => {
        //move to next question if not the last question
        const nextQuestion = number + 1;

        if(nextQuestion === TOTAL_QUESTIONS) {
            setGameOver(true);
        } else{
            setNumber(nextQuestion);
        }
    };

    return( 
        <> 
        <GlobalStyle/>
        <Wrapper>
            <h1>React Quiz</h1>
            {
                gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
                    <button className='start' onClick={startTrivia}>Start</button>
                ) : null
            }
            {
                !gameOver ? <p className='score'>Score: {score}</p> : null
            }
            {
                loading && <p>Loading Questions ...</p>//short circuit
            }
            {
                !loading && !gameOver && (
                    <QuestionCard
                        questionNumber={number + 1}
                        totalQuestions={TOTAL_QUESTIONS}
                        question={questions[number].question}
                        answers={questions[number].answers}
                        userAnswer={userAnswers ? userAnswers[number] : undefined}
                        callback={checkAnswer}
                    />
                )
            }
            {
                !gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ? (
                    <button className='next' onClick={nextQuestion}>Next Question</button>
                ) : null
            }
        </Wrapper>
        </>
    );
};

export default App;