import React, { useEffect, useState } from 'react'
import Layout, { HeaderCreator, Content, Footer } from '../components/Layout'
// import './CreatorPlayQuizPage.postcss'
import { Box, Icon } from '@chakra-ui/react'
import { FiChevronRight, FiUser } from 'react-icons/fi'
import question from '../../pic/question.jpg'
import { useHistory, useParams } from 'react-router-dom'
import axios from '../config/axios'
import { socket } from '../contexts/SocketContextProvider'
import ShowResultComp from '../components/resultComp/ShowResultComp'

function CreatorPlayQuizPage() {
  const history = useHistory()
  const { id } = useParams()
  const [count, setCount] = useState(0)
  const [quiz, setQuiz] = useState(null)
  const [questions, setQuestions] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeIndex, setActiveIndex] = useState(null)
  const [timeLimit, setTimeLimit] = useState(null)
  const [eachOptionCount, setEachOptionCount] = useState({})

  const getQuestions = async () => {
    try {
      const res = await axios.get(`/quiz/each-quiz/${id}`)
      console.log(res)
      if (res) {
        setQuiz(res.data.quiz)
        const { Questions } = res.data.quiz
        if (Questions.length <= 0) {
          return console.log('error, this is no questions')
        }

        setQuestions(Questions)
        setActiveIndex(0)
        setTimeLimit(Number(Questions[0].timeLimit))
      }

      setIsLoading(false)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getQuestions()
  }, [])
  console.log(questions)

  useEffect(() => {
    if (timeLimit === null) {
      return
    }

    const interval = setInterval(() => {
      if (timeLimit === 0) {
        setTimeLimit(0)
      } else {
        setTimeLimit(timeLimit - 1)
      }
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [timeLimit])

  useEffect(() => {
    socket.on('count_answer', (count) => {
      setCount(count)
    })
  }, [count])

  useEffect(() => {
    socket.on('count_option', (data) => {
      setEachOptionCount({
        option1: data.option1 ? data.option1 : 0,
        option2: data.option2 ? data.option2 : 0,
        option3: data.option3 ? data.option3 : 0,
        option4: data.option4 ? data.option4 : 0
      })
    })
  }, [eachOptionCount])

  console.log(eachOptionCount)
  console.log(count)

  const handleSkipButton = () => {}

  const handleNextQuestion = () => {
    setActiveIndex(activeIndex + 1)
    setTimeLimit(questions[activeIndex + 1].timeLimit)

    const data = {
      pin: quiz.pin,
      question: questions[activeIndex + 1]
    }

    socket.emit('change_question', data)
  }

  if (questions === null) {
    return <div>loading</div>
  }

  if (isLoading) {
    return <p>data is loading</p>
  }

  const activeQuestion = questions[activeIndex]
  const {
    id: questionId,
    title,
    options_1,
    options_2,
    time_limit
  } = activeQuestion

  console.log('questions.length', questions.length)
  console.log('activeIndex', activeIndex)

  if (timeLimit === 0 && activeIndex + 1 === questions.length) {
    const data = {
      pin: quiz.pin,
      status: 'timeOut',
      answer: activeQuestion.answer,
      questionId: activeQuestion.id
    }
    socket.emit('question_time_out', data)
    // socket.emit('quiz_end', data)

    return (
      <div>
        <button
          className="px-2 py-1 bg-gray-300 shadow-md rounded ml-2 mt-2 relative"
          onClick={() => {
            history.push('/show-result')
          }}
        >
          let See the winner!
        </button>
        <ShowResultComp eachOptionCount={eachOptionCount} />
      </div>
    )
  }

  if (timeLimit === 0) {
    const data = {
      pin: quiz.pin,
      status: 'timeOut',
      answer: activeQuestion.answer,
      questionId: activeQuestion.id
    }
    socket.emit('question_time_out', data)

    return (
      <div>
        <button
          className="px-2 py-1 bg-gray-300 shadow-md rounded ml-2 mt-2 relative"
          onClick={handleNextQuestion}
        >
          Go to next question
        </button>
        <ShowResultComp eachOptionCount={eachOptionCount} />
      </div>
    )
  }

  return (
    <Layout>
      <Content>
        <div className="flex flex-col items-end">
          <div className="bg-white w-full py-8 shadow-md relative mb-2">
            <p className="text-3xl font-bold text-center">
              {activeQuestion.title}
            </p>
          </div>

          <button
            className="bg-yellow-300 mb-2 mr-4 px-4 py-1.5 rounded border-b-4 border-yellow-600 text-white text-lg font-bold"
            onClick={() => handleSkipButton()}
          >
            Skip
          </button>
        </div>

        <div className="flex flex-col items-center w-full mb-8">
          <div className="w-full flex items-center justify-between px-4">
            <p className="bg-red-300 p-6 rounded-full text-4xl font-bold text-white">
              {timeLimit}
            </p>
            {activeQuestion.questionImg ? (
              <img
                src={activeQuestion.questionImg}
                alt=""
                className="w-1/3 rounded shadow-md"
              />
            ) : (
              <img src={question} alt="" className="w-1/3 rounded shadow-md" />
            )}
            <div className="flex flex-col items-center font-bold">
              <p className="text-3xl">
                {count[questionId] ? count[questionId] : 0}
              </p>
              <p className="text-xl">Answers</p>
            </div>
          </div>
        </div>

        <div className="flex justify-evenly flex-wrap w-full text-left">
          <div className="w-5/12 pl-4 py-8 border shadow-md bg-red-700 rounded text-white font-semibold text-2xl">
            {activeQuestion.option1}
          </div>
          <div className="w-5/12 pl-4  py-8 border shadow-md bg-blue-700 rounded text-white font-semibold text-2xl">
            {activeQuestion.option2}
          </div>
          {activeQuestion.option3 ? (
            <div className="w-5/12 pl-4 py-8 border shadow-md bg-green-700 rounded text-white font-semibold text-2xl">
              {activeQuestion.option3}
            </div>
          ) : null}
          {activeQuestion.option4 ? (
            <div className="w-5/12 pl-4  py-8 border shadow-md bg-yellow-700 rounded text-white font-semibold text-2xl">
              {activeQuestion.option4}
            </div>
          ) : null}
        </div>
      </Content>
    </Layout>
  )
}

export default CreatorPlayQuizPage
