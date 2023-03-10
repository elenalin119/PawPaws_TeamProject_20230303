const express = require('express')
const router = express.Router()
const db = require('../models/myconnection')
const { v4: uuid4 } = require('uuid')

router.get('/', async (req, res) => {
  // console.log(process.env.DB_Password);
  // res.send('shop page');
  const sql = 'SELECT * FROM `shop`'
  const [rows, fields] = await db.query(sql)

  // ES6 解構賦值
  // const [rows, fields] = await db.query(sql) //['result1', 'result2']

  // const {light} = {shade:'xxxxx', light:'xxxxxx'}

  // ES5
  // const dbResult = ['result1', 'result2']
  // const rows = dbResult[0]
  // const fields = dbResult[1]

  res.json(rows)
})

router.post('/checkout', async (req, res) => {
  // console.log('req', req.body.cart)
  // console.log('req', req.body.user)
  // console.log('uuid', Date.now())
  const timestamp = Date.now() + ''
  const randomNum = Math.floor(Math.random() * 99)
  // console.log('uuid', randomNum < 10 ? '0' + randomNum : randomNum)

  const orderId = timestamp + randomNum
  // console.log('orderId', orderId)

  const totalAmount = req.body.cart.reduce((acc, cur) => {
    return acc + +cur.itemTotal
  }, 0)

  //有req要有res
  // res.json(req.body)
  //資料console.log成功後加入以下程式
  // const { email, password, name } = req.body
  const sql =
    'INSERT INTO `s_order`(`s_order_id`, `s_order_total`,`s_order_user_id` , `s_order_status`, `s_order_pay`, `s_order_ship`) VALUES (?,?,?,"訂單成立","貨到付款","尚未出貨")'
  const createOrder = await db.query(sql, [
    orderId,
    totalAmount,
    req.body.user.sid,
  ])

  //如果create為True則回傳成功資訊
  if (createOrder) {
    const sql2 =
      'INSERT INTO `s_order_detail`( `s_order_id`, `s_order_detail_name`, `s_order_detail_img`, `s_order_detail_quantity`, `s_order_detail_itemtotal`) VALUES (?,?,?,?,?)'

    req.body.cart.map(async (v) => {
      try {
        const createDetail = await db.query(sql2, [
          orderId,
          v.name2,
          v.image,
          v.quantity,
          v.itemTotal,
        ])
      } catch (err) {
        console.log('err')
      }
    })

    res.json({
      state: true,
      message: `訂單成功！`,
    })
  } else {
    res.json({
      state: false,
      message: `訂單失敗！`,
    })
  }
})

module.exports = router
