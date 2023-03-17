
import Table from './Table'
import React, { useState, useEffect } from 'react'

function ShopOrder({ sid }) {
  const [orderList, setOrderList] = useState([])

  const getOrderData = () => {
    const url = `http://localhost:3000/members/getOrderData/${sid}`
    fetch(url)
      .then((res) => res.json())
      .then((rData) => {
        console.log(url, rData)
        setOrderList(rData)
      })
  }

  useEffect(() => {
    getOrderData()
  }, [])


  orderList3 = orderList3.filter((order) => {
    return order.sid === sid
  })

  return (
    <>
      <Table

        orderList={orderList}
        header={[
          ['訂單編號', 's_order_id'],
          ['訂購日期', 's_order_date'],
          ['訂購金額', 's_order_total'],
          ['付款方式', 's_order_pay'],
          ['出貨狀態', 's_order_ship'],

        ]}
        sid={sid}
      ></Table>
    </>
  )
}

export default ShopOrder