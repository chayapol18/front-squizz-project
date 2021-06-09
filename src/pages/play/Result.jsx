import React, { useEffect } from 'react'
import Layout, { Content, Footer } from '../../components/Layout'
import './Result.postcss'
import { Text } from '@chakra-ui/react'
import CorrectAnswer from '../../components/resultComp/CorrectAnswer'
import InCorrectAnswer from '../../components/resultComp/InCorrectAnswer'
import TimesUp from '../../components/resultComp/TimesUp'
import { useHistory } from 'react-router-dom'
import ShowResultComp from '../../components/resultComp/ShowResultComp'

const contentHeight = 'calc(100vh - var(--footer-height))'

function Result({ statusAnswer, socketId, questionId }) {
  const history = useHistory()

  // useEffect(() => {
  //   setTimeout(() => {
  //     history.push('/play/ranking')
  //   }, 5000)
  // })

  console.log(statusAnswer)
  return (
    <Layout>
      <Content
        style={{
          height: contentHeight,

          minHeight: contentHeight
        }}
        className="user-player-result-wrapper"
      >
        {statusAnswer[socketId][questionId] === 'correct' ? (
          <CorrectAnswer />
        ) : (
          <InCorrectAnswer />
        )}
        {/* <TimesUp /> */}
      </Content>
      <Footer>
        <div className="footer-bar">
          <Text m="10px" fontWeight="bold" fontSize="20px">
            Nickname
          </Text>
          <div
            style={{
              width: 60,
              height: 35,
              backgroundColor: 'black',
              borderRadius: 5,
              marginRight: 10,
              color: 'white',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            10
          </div>
        </div>
      </Footer>
    </Layout>
  )
}

export default Result
