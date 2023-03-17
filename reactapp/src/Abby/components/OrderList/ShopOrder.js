import React, { useState, useEffect } from 'react'
import TableShop from '../../../Amy/components/Cart/TableShop'
import axios from 'axios'

function ShopOrder({ sid }) {
  // 使用 useEffect鉤子從後端取得訂單列表，並將其存放在 orderList 狀態
  const [orderList, setOrderList] = useState([])
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/shop/getOrder/${sid}`
        )
        setOrderList(response.data.orders)
      } catch (error) {
        console.error(error)
      }
    }
    fetchOrders()
  }, [sid])

  // const orderList3 = [
  //   {
  //     s_order_id: 167895101280613,
  //     s_order_status: '訂單成立',
  //     s_order_date: '2023-03-16',
  //     s_order_total: '760',
  //     s_order_pay: '貨到付款',
  //     s_order_ship: '尚未出貨',
  //   },
  // ]

  // const taipeiTime = new Date(order.s_order_date).toLocaleString('zh-TW', {
  //   timeZone: 'Asia/Taipei',
  //   dateStyle: 'short',
  // });

  return (
    <>
      {/* <TableShop
        orderList={orderList3}
        header={['s_order_id', 's_order_status', 's_order_date', 's_order_total','s_order_pay','s_order_ship']}
        sid={sid}
      ></TableShop> */}
      {/* 將 orderList 傳遞給 TableShop 元件和訂單細節 */}
      <TableShop
        orderList={orderList}
        header={[
          's_order_id',
          's_order_status',
          's_order_date',
          's_order_total',
          's_order_pay',
          's_order_ship',
        ]}
        sid={sid}
      ></TableShop>
      {orderList.map((order) => (
        <div key={order.s_order_id}>
          <h3>訂單編號：{order.s_order_id}</h3>
          <p>訂單狀態：{order.s_order_status}</p>
          {/* <p>訂購日期：{order.s_order_date.substring(0, 10)}</p> */}
          <p>
            訂購日期：
            {new Date(order.s_order_date).toLocaleString('zh-TW', {
              timeZone: 'Asia/Taipei',
              dateStyle: 'short',
            })}
          </p>
          <p>訂購金額：{order.s_order_total}</p>
          <p>付款方式：{order.s_order_pay}</p>
          <p>出貨狀態：{order.s_order_ship}</p>
        </div>
      ))}
    </>
  )
}

export default ShopOrder

//TODO

// 訂單編號-訂單狀態-訂購日期-訂單金額-付款方式-出貨狀態-會員ID >>>訂單查詢（指定會員id）
// SELECT * FROM `s_order` WHERE `s_order_user_id` = 1076;
// http://localhost:3000/shop/getOrder/:id

// 商品流水號-訂單編號-商品名-商品圖片-商品數量-商品合計 >>>訂單明細（指定訂單編號id）
// SELECT * FROM `s_order_detail` WHERE `s_order_id`='167872153862858';
//http://localhost:3000/shop/getOrderDetail/:id

// 訂單編號-會員名稱-信箱-手機-地址-訂單金額 >>>訂購人資料(全部訂單)
// SELECT o.s_order_id,m.name,m.email,m.mobile,m.address,o.s_order_total FROM `s_order` AS o JOIN `members` AS m ON o.`s_order_user_id` = m.`sid` WHERE o.`s_order_user_id`;
