import React, { useEffect, useState } from 'react'
import Layout, { Content } from '../components/Layout'
import './GameBlock.postcss'
import PlayButton from '../components/PlayButton'
import { FaCircle } from 'react-icons/fa'
import { BsFillTriangleFill, BsSquareFill } from 'react-icons/bs'
import { FaStar } from 'react-icons/fa'
import { useHistory, useParams } from 'react-router-dom'
import { Flex, Text, Grid } from '@chakra-ui/react'
import { socket } from '../contexts/SocketContextProvider'
import UserPlayerNextQuestion from '../pages/play/UserPlayerNextQueition'
import Result from '../pages/play/Result'
import RankingPage from '../pages/play/RankingPage'

function Play() {
  const history = useHistory()
  const [isLoading, setIsLoading] = useState(true)
  const [showAnswer, setShowAnswer] = useState(false)
  const [statusAnswer, setStatusAnswer] = useState(null)
  const statusAnswerPlayer = {}
  const [endQuestion, setEndQuestion] = useState(false)
  const [endQuiz, setEndQuiz] = useState(false)
  const [question, setQuestion] = useState([])

  useEffect(() => {
    socket.on('question_to_player', (question) => {
      setQuestion(question)
      console.log(question)
      statusAnswerPlayer[socket.id] = {
        [question.questionId]: ''
      }
      setStatusAnswer(statusAnswerPlayer)
    })
    setIsLoading(false)
    // getSocket()
  }, [])

  useEffect(() => {
    socket.on('new_question_to_player', (question) => {
      setQuestion(question)
      console.log(question)
      statusAnswerPlayer[socket.id] = {
        [question.questionId]: ''
      }
      setStatusAnswer(statusAnswerPlayer)
    })
    setShowAnswer(false)
    setEndQuestion(false)
  }, [question])

  console.log(question)

  useEffect(() => {
    socket.on('check_answer', (answer) => {
      setShowAnswer(true)
    })
    setEndQuestion(false)
  }, [showAnswer])

  useEffect(() => {
    socket.on('player_end_quiz', () => {
      setEndQuiz(true)
    })
    setEndQuestion(false)
    setShowAnswer(false)
  }, [endQuiz])

  const handleAnswerButton = (option) => {
    const data = {
      option,
      question,
      id: socket.id
    }
    socket.emit('answer_question', data)

    socket.on('is_correct_answer', (player) => {
      statusAnswerPlayer[socket.id] = {
        [question.questionId]: ''
      }
      setStatusAnswer(statusAnswerPlayer)
      console.log('player', player)

      if (player[socket.id][question.questionId].status === 'correct') {
        statusAnswerPlayer[socket.id] = {
          ...statusAnswerPlayer[socket.id],
          [question.questionId]: 'correct'
        }
        console.log('correct', statusAnswerPlayer)
      } else if (
        player[socket.id][question.questionId].status === 'incorrect'
      ) {
        statusAnswerPlayer[socket.id] = {
          ...statusAnswerPlayer[socket.id],
          [question.questionId]: 'incorrect'
        }
        console.log('incorrect', statusAnswerPlayer)
      }
      setStatusAnswer(statusAnswerPlayer)

      // setStatusAnswer(player)
      console.log(statusAnswer)
    })

    setEndQuestion(true)
  }

  console.log(statusAnswer)
  console.log('statusAnswerPlayer', statusAnswerPlayer)

  if (isLoading) return <p>data is loading</p>

  if (endQuestion)
    return (
      <>
        <UserPlayerNextQuestion />
      </>
    )

  if (showAnswer) {
    socket.on('check_answer', (player) => {
      if (player[socket.id][question.questionId].status === 'correct') {
        statusAnswerPlayer[socket.id] = {
          ...statusAnswerPlayer[socket.id],
          [question.questionId]: 'correct'
        }
        console.log('correct', statusAnswerPlayer)
      } else if (
        player[socket.id][question.questionId].status === 'incorrect'
      ) {
        statusAnswerPlayer[socket.id] = {
          ...statusAnswerPlayer[socket.id],
          [question.questionId]: 'incorrect'
        }
        console.log('incorrect', statusAnswerPlayer)
      }
      setStatusAnswer(statusAnswerPlayer)
      console.log(statusAnswer)
    })

    return (
      <>
        <Result
          statusAnswer={statusAnswer}
          socketId={socket.id}
          questionId={question.questionId}
        />
      </>
    )
  }

  if (endQuiz) {
    return (
      <>
        <RankingPage />
      </>
    )
  }

  return (
    <Layout>
      <Content className="play-page">
        <Flex
          pl="5px"
          justifyContent="space-between"
          alignItems="center"
          className="player-header"
        >
          <div style={{ width: 150 }}>
            <Text fontSize="xl">Page of ?</Text>
          </div>
          <div style={{ width: 100 }}>
            <Text fontSize="2xl">Quiz</Text>
          </div>
          <div style={{ width: 100 }}></div>
        </Flex>
        {question ? (
          <Grid ml="5px" mr="5px" templateColumns="repeat(2, 1fr)" gap={2}>
            {question.countOptions >= 1 ? (
              <PlayButton
                onClick={() => {
                  handleAnswerButton('option1')
                  // history.push('/play/result')
                }}
                htmlType="button"
                type="danger"
                className="choice-button"
              >
                <BsFillTriangleFill className="icon-size" />
              </PlayButton>
            ) : null}

            {question.countOptions >= 2 ? (
              <PlayButton
                onClick={() => {
                  handleAnswerButton('option2')
                  // history.push('/play/result')
                }}
                htmlType="button"
                type="primary"
                className="choice-button"
              >
                <FaStar size="60px" />
              </PlayButton>
            ) : null}

            {question.countOptions >= 3 ? (
              <PlayButton
                onClick={() => {
                  handleAnswerButton('option3')
                  // history.push('/play/result')
                }}
                htmlType="button"
                type="success"
                className="choice-button"
              >
                <FaCircle size="70px" />
              </PlayButton>
            ) : null}

            {question.countOptions >= 4 ? (
              <PlayButton
                onClick={() => {
                  handleAnswerButton('option4')
                  // history.push('/play/result')
                }}
                htmlType="button"
                type="warning"
                className="choice-button"
              >
                <BsSquareFill size="50px" />
              </PlayButton>
            ) : null}
          </Grid>
        ) : (
          <Grid ml="5px" mr="5px" templateColumns="repeat(2, 1fr)" gap={2}>
            <PlayButton
              onClick={() => {
                history.push('/play/result')
              }}
              htmlType="button"
              type="danger"
              className="choice-button"
            >
              <BsFillTriangleFill className="icon-size" />
            </PlayButton>

            <PlayButton
              onClick={() => {
                history.push('/play/result')
              }}
              htmlType="button"
              type="primary"
              className="choice-button"
            >
              <FaStar size="60px" />
            </PlayButton>

            <PlayButton
              onClick={() => {
                history.push('/play/result')
              }}
              htmlType="button"
              type="success"
              className="choice-button"
            >
              <FaCircle size="70px" />
            </PlayButton>

            <PlayButton
              onClick={() => {
                history.push('/play/result')
              }}
              htmlType="button"
              type="warning"
              className="choice-button"
            >
              <BsSquareFill size="50px" />
            </PlayButton>
          </Grid>
        )}

        <div className="user-header">
          {' '}
          <Text ml="5px" fontSize="2xl">
            Username
          </Text>
        </div>
      </Content>
    </Layout>
  )
}

export default Play
