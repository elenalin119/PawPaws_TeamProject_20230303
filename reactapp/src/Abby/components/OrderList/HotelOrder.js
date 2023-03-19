import React from 'react'
import Table from './Table'

function HotelOrder({ sid }) {
  let orderList2 = [
    // {
    //   id: 1,
    //   customerName: 'Hotel',
    //   orderDate: '2023-03-10',
    //   product: 'apple10',
    //   orderStatus: 'Processing',
    //   sid: 1009,
    // },
    // {
    //   id: 2,
    //   customerName: 'Jane Smith',
    //   orderDate: '2023-03-11',
    //   product: 'apple11',
    //   orderStatus: 'Shipped',
    //   sid: 1085,
    // },
    // {
    //   id: 3,
    //   customerName: 'Bob Johnson',
    //   orderDate: '2023-03-12',
    //   product: 'apple12',
    //   orderStatus: 'Delivered',
    //   sid: 1085,
    // },
  ]

  // orderList2 = orderList2.filter((order) => {
  //   return order.sid === sid
  // })

  return (
    <>
      <Table
        orderList={orderList2}
        header={[
          ['姓名', 'a_name'],
          ['飯店名稱', 'title'],
          ['飯店地點', 'place'],
          ['日期', 'deadline'],
          ['內容', 'content'],
        ]}
        sid={sid}
      ></Table>
    </>
  )
}

export default HotelOrder
