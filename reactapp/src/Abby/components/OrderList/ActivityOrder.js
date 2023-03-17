import React, { useState, useEffect } from 'react'
import Table from './Table'

function ActivityOrder({ sid }) {
  const [orderList, setOrderList] = useState([])

  const getActivityData = () => {
    const url = `http://localhost:3000/members/getActivityData/${sid}` //
    fetch(url)
      .then((res) => res.json())
      .then((rData) => {
        console.log(url, rData)
        setOrderList(rData)
      })
  }

  useEffect(() => {
    getActivityData()
  }, [])

  return (
    <>
      <Table
        orderList={orderList}
        header={[
          ['姓名', 'a_name'],
          ['截止日期', 'deadline'],
          ['活動名稱', 'title'],
          ['活動地點', 'place'],
          ['活動內容', 'content'],
        ]} //
        sid={sid}
      ></Table>
    </>
  )
}

export default ActivityOrder
