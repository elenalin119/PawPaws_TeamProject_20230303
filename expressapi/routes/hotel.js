const express = require('express')
const router = express.Router()
const db = require('../models/myconnection')

// GET ALL
// 讀出所有hotel的資料
// http://localhost:3000/hotel/
router.get('/', async (req, res) => {
  // console.log(process.env.DB_Password);
  // res.send('hotel page');
  const sql = 'SELECT * FROM `hotel`'
  const [rows] = await db.query(sql)
  res.json(rows)
})
router.get('/:city', async (req, res) => {
  // console.log(process.env.DB_Password);
  // res.send('hotel page');
  const { city } = req.params
  const sql = 'SELECT * FROM `hotel` WHERE h_city = ?'
  const [rows] = await db.query(sql, [city])
  res.json(rows)
})

// GET
// 讀出某一個id hotel的資料
// http://localhost:3000/hotel/byid/:h_id
router.get('/byid/:h_id', async (req, res) => {
  const hotelId = req.params.h_id
  const sql = 'SELECT * FROM hotel WHERE `h_id`=?'
  const [rows] = await db.query(sql, [hotelId])
  res.json(rows[0])
})

// // 新增
// router.post('/', createHotel)

// // 修改
// router.put('/:h_id', updateHotel)

// // 刪除
// router.delete('/:h_id', deleteHotel)

module.exports = router
