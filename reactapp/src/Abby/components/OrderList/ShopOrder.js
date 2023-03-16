import React from 'react'
import Table from './Table'

function ShopOrder({ sid }) {
  let orderList3 = [
    {
      id: 1,
      customerName: 'John Doe',
      orderDate: '2023-03-10',
      product: 'Iphone8',
      orderStatus: 'Processing',
      sid: 1111,
    },
    {
      id: 2,
      customerName: 'Jane Smith',
      orderDate: '2023-03-11',
      product: 'Iphone9',
      orderStatus: 'Shipped',
      sid: 1085,
    },
    {
      id: 3,
      customerName: 'Bob Johnson',
      orderDate: '2023-03-12',
      product: 'IphoneXS',
      orderStatus: 'Delivered',
      sid: 1085,
    },
  ]

  orderList3 = orderList3.filter((order) => {
    return order.sid === sid
  })

  return (
    <>
      <Table
        orderList={orderList3}
        header={[
          ['姓名', 'a_name'],
          ['活動名稱', 'title'],
          ['活動地點', 'place'],
          ['截止日期', 'deadline'],
          ['活動內容', 'content'],
        ]}
        sid={sid}
      ></Table>
    </>
  )
}

export default ShopOrder
