import React from 'react'
import Layout, { Content } from '../components/Layout'
import './CreatorShowResult.postcss'
import { Input, FormControl, Button, Text, Link } from '@chakra-ui/react'
import { useHistory } from 'react-router-dom'

function CreatorShowResult() {
  const history = useHistory()
  return (
    <Layout>
      <Content
        style={{
          backgroundColor: '#26086c',
          color: 'white',
          position: 'relative',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <div
          style={{
            width: 100,
            height: 45,
            backgroundColor: 'white',
            position: 'absolute',
            top: 50,
            borderRadius: 5,
            color: 'black',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontWeight: 'bold'
          }}
        >
          Animal Quiz
        </div>

        <div
          style={{
            width: 550,
            height: 350,
            position: 'absolute',
            bottom: 0,
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <div
            style={{
              backgroundColor: '#864cbf',
              width: 140,
              height: 350,
              position: 'absolute',
              bottom: 0,
              right: 360,
              display: 'flex',
              justifyContent: 'center',
              borderRadius: ' 5px 5px 0px 0px'
            }}
          >
            <div>
              <div
                style={{
                  backgroundColor: 'grey',
                  width: 80,
                  height: 80,
                  marginTop: 10,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: 35,
                  fontWeight: 'bold'
                }}
                className="place"
              >
                2
              </div>
            </div>
          </div>

          <div
            style={{
              backgroundColor: '#864cbf',
              width: 160,
              height: 420,
              position: 'absolute',
              bottom: 0,
              border: '1px solid grey',
              boxShadow: '10px 10px 10px 10px grey;',
              display: 'flex',
              justifyContent: 'center',
              borderRadius: ' 5px 5px 0px 0px'
            }}
          >
            <div
              style={{
                backgroundColor: 'orange',
                width: 80,
                height: 80,
                marginTop: 10,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: 35,
                fontWeight: 'bold'
              }}
              className="place"
            >
              1
            </div>
          </div>
          <div
            style={{
              backgroundColor: '#864cbf',
              width: 140,
              height: 310,
              position: 'absolute',
              bottom: 0,
              left: 360,
              display: 'flex',
              justifyContent: 'center',
              borderRadius: ' 5px 5px 0px 0px'
            }}
          >
            <div>
              {' '}
              <div
                style={{
                  backgroundColor: '#e24000',
                  width: 80,
                  height: 80,
                  marginTop: 10,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: 35,
                  fontWeight: 'bold'
                }}
                className="place"
              >
                3
              </div>
            </div>
          </div>
        </div>
      </Content>
    </Layout>
  )
}

export default CreatorShowResult
