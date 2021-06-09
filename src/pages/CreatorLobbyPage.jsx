import React, { useEffect, useState } from 'react'
import Layout, { HeaderCreator, Content, Footer } from '../components/Layout'
import './CreatorLobbyPage.postcss'
import { Box, Icon } from '@chakra-ui/react'
import { FiChevronRight, FiUser } from 'react-icons/fi'
import { useHistory, useParams } from 'react-router-dom'
import axios from '../config/axios'
import { socket } from '../contexts/SocketContextProvider'

function CreatorLobbyPage() {
  const { id } = useParams()
  const history = useHistory()
  const [squizz, setSquizz] = useState('')
  const [players, setPlayers] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const getSquizz = async () => {
    try {
      const res = await axios.get(`/quiz/each-quiz/${id}`)
      console.log(res)
      if (res) setSquizz(res.data.quiz)
      setIsLoading(false)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getSquizz()
  }, [])

  useEffect(() => {
    socket.on('show_players', (player) => {
      setPlayers([...players, player])
      console.log(player, 'joined')
      console.log(players)
    })
  }, [players])

  console.log(players)

  const handleSkipButton = () => {}

  const handleStartButton = () => {
    const data = {
      status: 'start',
      pin: squizz.pin,
      question: squizz.Questions[0]
    }
    socket.emit('start_quiz', data)
    history.push(`/creator-play/${id}`)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen background-loading flex flex-col items-center">
        <p className="text-4xl font-extrabold mt-28 text-white">
          Get Ready to join
        </p>
        <p className="mt-32 ml-36 bg-white rounded-t px-2 font-semibold">
          Game PIN:
        </p>
        <div className="px-4 py-2 bg-white w-2/5 rounded flex items-center justify-between text-left">
          <div>
            <p className="text-lg">
              Join at <span className="font-bold">www.squizz.it</span>
            </p>
            <p className="text-lg">
              or with the <span className="font-bold">Squizz! app</span>
            </p>
          </div>

          <Icon as={FiChevronRight} color="#864cbf" w={12} h={12} />
          <div className="py-2 px-4 bg-gray-700">
            <p className="font-bold text-lg text-white">Loaing Game PIN...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <Layout>
      <div className="background-header px-2 pt-4 pb-6 flex flex-col items-center">
        <p className="ml-44 w-28 bg-white rounded-t px-2 font-bold text-lg">
          Game PIN:
        </p>
        <div className="px-3 py-2 bg-white w-2/5 rounded flex items-center justify-between text-left">
          <div>
            <p className="text-xl">
              Join at <span className="font-bold">www.squizz.it</span>
            </p>
            <p className="text-xl">
              or with the <span className="font-bold">Squizz! app</span>
            </p>
          </div>

          <Icon as={FiChevronRight} color="#25076b" w={12} h={12} />
          <div className="py-2 px-4">
            <p className="font-extrabold text-6xl">{squizz.pin}</p>
          </div>
        </div>
      </div>
      <Content className="background-content pb-4 flex flex-col items-center">
        <div className="flex justify-between px-4 w-full mt-2 mb-40">
          <div className="background-detail text-white h-full px-2 flex items-center rounded">
            <Icon as={FiUser} w={6} h={6} />
            <p className="ml-2 text-2xl font-bold">
              {players ? players.length : 0}
            </p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-4xl text-white font-bold mb-0.5">Squizz!</p>
            <p className="text-white text-lg font-bold">at home</p>
          </div>
          <button
            onClick={handleStartButton}
            className="px-4 py-1 h-full bg-gray-300 rounded border-b-4 border-gray-400 font-semibold text-xl"
          >
            Start
          </button>
        </div>

        <div className="flex flex-wrap">
          {players ? (
            players.map((item, index) => (
              <p
                className="text-white text-xl font-bold m-1 py-1 px-4 rounded background-detail"
                key={index}
              >
                {item.name}
              </p>
            ))
          ) : (
            <div className="background-detail px-6 py-1 rounded flex flex-wrap">
              <p className="text-white text-3xl font-bold">
                Waiting for players...
              </p>
            </div>
          )}
        </div>
      </Content>
    </Layout>
  )
}

export default CreatorLobbyPage
