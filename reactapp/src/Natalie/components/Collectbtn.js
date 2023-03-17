import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

function Collectbtn(props) {
  const sid = JSON.parse(localStorage.getItem('user')).sid
  console.log('aid', props.activity)
  const [favorite, setFavorite] = useState(false)

  useEffect(() => {
    const getFavorite = () => {
      const url = `http://localhost:3000/activity/alikes/${sid}`
      fetch(url, {
        method: 'get',
      })
        .then((r) => r.json())
        .then((rData) => {
          console.log('rdata', rData)
          if (rData.find((d) => d.activity_id === props.activity)) {
            setFavorite(true)
          }
        })
    }
    getFavorite()
  }, [])
  // localStorage.getItem('itemId') === 'true'
  const itemId = props
  const handleClick = async () => {
    console.log(itemId.activity)
    try {
      // 發送POST請求到服務器
      const res = await fetch(
        `http://localhost:3000/activity/collection/${itemId.activity}/${sid}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      if (res.ok) {
        // 更新收藏狀態
        setFavorite(!favorite)
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Btn>
      <button
        onClick={handleClick}
        style={{ backgroundColor: favorite ? '#b5b5b5' : '#8dd9ce' }}
      >
        {favorite ? '已收藏' : '我要收藏'}
      </button>
    </Btn>
  )
}

const Btn = styled.div`
  button {
    padding: 1rem;
    margin: 1rem;
    border: 5px #8dd9ce;
    border-radius: 15px;
    background-color: #8dd9ce;
    font-weight: 600;
    color: #fff;
    text-align: center;
  }
`

export default Collectbtn
