import React from 'react'
import { FaCircle } from 'react-icons/fa'
import { BsFillTriangleFill, BsSquareFill } from 'react-icons/bs'
import { FaStar } from 'react-icons/fa'

function ShowResultComp({ eachOptionCount }) {
  const allOptions =
    Number(eachOptionCount.option1) +
    Number(eachOptionCount.option2) +
    Number(eachOptionCount.option3) +
    Number(eachOptionCount.option4)

  let heightOption1 = `${(eachOptionCount.option1 / allOptions) * 100}%`
  let heightOption2 = `${(eachOptionCount.option2 / allOptions) * 100}%`
  let heightOption3 = `${(eachOptionCount.option3 / allOptions) * 100}%`
  let heightOption4 = `${(eachOptionCount.option4 / allOptions) * 100}%`

  console.log(heightOption1)
  console.log(heightOption2)
  return (
    <div
      style={{
        width: 700,
        height: 300,
        backgroundColor: 'white',
        position: 'relative',
        display: 'flex',
        justifyContent: 'space-around'
      }}
    >
      <div
        style={{
          width: 165,
          height: 250,
          position: 'absolute',
          bottom: 7,
          right: 530
        }}
      >
        <div
          style={{
            height: '20%',
            width: '100%',
            color: '#e21b3c',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: 36,
            fontWeight: 'bold'
          }}
        >
          {' '}
          {eachOptionCount.option1}
        </div>

        <div
          style={{
            height: heightOption1,
            width: '100%',
            backgroundColor: '#e21b3c',
            marginTop: 5,
            marginBottom: 5
          }}
        ></div>
        <div
          style={{
            height: '19%',
            width: '100%',
            backgroundColor: '#e21b3c',
            color: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: 25
          }}
        >
          <BsFillTriangleFill />
        </div>
      </div>
      <div
        style={{
          width: 165,
          height: 250,
          position: 'absolute',
          bottom: 7,
          right: 355
        }}
      >
        <div
          style={{
            height: '20%',
            width: '100%',
            color: '#1368ce',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: 36,
            fontWeight: 'bold'
          }}
        >
          {' '}
          {eachOptionCount.option2}
        </div>
        <div
          style={{
            height: heightOption2,
            width: '100%',
            backgroundColor: '#1368ce',
            marginTop: 5,
            marginBottom: 5
          }}
        ></div>
        <div
          style={{
            height: '19%',
            width: '100%',
            backgroundColor: '#1368ce',
            color: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: 20
          }}
        >
          <FaStar />
        </div>
      </div>
      <div
        style={{
          width: 165,
          height: 250,
          position: 'absolute',
          bottom: 7,

          left: 355
        }}
      >
        <div
          style={{
            height: '20%',
            width: '100%',
            color: '#d89e00',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: 36,
            fontWeight: 'bold'
          }}
        >
          {' '}
          {eachOptionCount.option3}
        </div>
        <div
          style={{
            height: heightOption3,
            width: '100%',
            backgroundColor: '#d89e00',
            marginTop: 5,
            marginBottom: 5
          }}
        ></div>
        <div
          style={{
            height: '19%',
            width: '100%',
            backgroundColor: '#d89e00',
            color: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: 20
          }}
        >
          <FaCircle />
        </div>
      </div>
      <div
        style={{
          width: 165,
          height: 250,
          position: 'absolute',
          bottom: 7,

          left: 530
        }}
      >
        <div
          style={{
            height: '20%',
            width: '100%',
            color: '#26890c',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: 36,
            fontWeight: 'bold'
          }}
        >
          {' '}
          {eachOptionCount.option4}
        </div>
        <div
          style={{
            height: heightOption4,
            width: '100%',
            backgroundColor: '#26890c',
            marginTop: 5,
            marginBottom: 5
          }}
        ></div>
        <div
          style={{
            height: '19%',
            width: '100%',
            backgroundColor: '#26890c',
            color: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: 18
          }}
        >
          <BsSquareFill />
        </div>
      </div>
    </div>
  )
}

export default ShowResultComp
