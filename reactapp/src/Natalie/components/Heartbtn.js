import React, { useEffect, useState } from 'react'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { useNavigate } from 'react-router-dom'

function Heartbtn(props) {
  const sid = JSON.parse(localStorage.getItem('user'))?.sid // 使用三元運算子判斷是否有找到sid
  // const sid = JSON.parse(localStorage.getItem('user')).sid
  const navigate = useNavigate()
  console.log('act', props.activity)
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
    if (!sid) {
      alert('請先登入')
      navigate('/members')
      return
    }
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
    <div>
      {sid ? ( // 如果 sid 存在就顯示按鈕，否則不顯示
        <button onClick={handleClick}>
          {favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </button>
      ) : (
        <button onClick={handleClick}>
          <FavoriteBorderIcon />
        </button>
      )}
    </div>
  )
}

export default Heartbtn
