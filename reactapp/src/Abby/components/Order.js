import React, { useState, useEffect } from 'react'
import AuthService from '../auth.service'

const orderListArea = {
  margin: 'auto',
  border: '1px solid #8DD9CE',
  borderRadius: '0px 10px 10px 10px',
  overflow: 'hidden',
  background: '#fff',
  paddingBottom: '30px',
  width: '1200px',
}

const orderContainer = {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  padding: '1rem',
}

const orderTable = {
  borderCollapse: 'collapse',
  width: '100%',
}

const ThTdTable = {
  border: '1px solid #ffffff',
  textAlign: 'left',
  padding: '8px',
  textAlign: 'center',
}
const th = {
  backgroundColor: '#E2E2E2',
  color: '#000',
}

const td = {
  backgroundColor: '#FFF5EA',
  color: '#000',
}

const orderForm = {
  fontSize: '18px',
}


function Order() {
  const [orders, setOrders] = useState([])

  const orderList = [
    {
      id: 1,
      customerName: 'John Doe',
      orderDate: '2023-03-10',
      product: 'apple10',
      orderStatus: 'Processing',
    },
    {
      id: 2,
      customerName: 'Jane Smith',
      orderDate: '2023-03-11',
      product: 'apple11',
      orderStatus: 'Shipped',
    },
    {
      id: 3,
      customerName: 'Bob Johnson',
      orderDate: '2023-03-12',
      product: 'apple12',
      orderStatus: 'Delivered',
    },
  ]

  return (
    <>
      <form style={orderForm}>
        <div style={orderListArea}>
          <div className="form-body">
            <div style={orderContainer}>
              <table style={orderTable}>
                <thead>
                  <tr>
                    <th style={{ ...ThTdTable, ...th }}>訂單編號</th>
                    <th style={{ ...ThTdTable, ...th }}>客戶姓名</th>
                    <th style={{ ...ThTdTable, ...th }}>訂購日期</th>
                    <th style={{ ...ThTdTable, ...th }}>訂購商品</th>
                    <th style={{ ...ThTdTable, ...th }}>訂單狀態</th>
                  </tr>
                </thead>
                <tbody>
                  {orderList.map((order) => (
                    <tr key={order.id}>
                      <td style={{ ...ThTdTable, ...td }}>{order.id}</td>
                      <td style={{ ...ThTdTable, ...td }}>
                        {order.customerName}
                      </td>
                      <td style={{ ...ThTdTable, ...td }}>{order.orderDate}</td>
                      <td style={{ ...ThTdTable, ...td }}>{order.product}</td>
                      <td style={{ ...ThTdTable, ...td }}>
                        {order.orderStatus}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}

export default Order