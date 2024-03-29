const express = require('express')
const router = express.Router()
const db = require('../models/myconnection')
const jwt = require('jsonwebtoken')

router.get('/', function (req, res) {
  res.send('這是我的members page')
})

//會員登入
router.post('/login', async function (req, res) {
  console.log('req', req.body.userEmail)
  console.log('req', req.body.userPassword)

  const sql = 'SELECT * FROM members WHERE email=? AND password=?'
  const [rows] = await db.query(sql, [
    req.body.userEmail,
    req.body.userPassword,
  ])
  if (rows.length < 1) {
    const output = {}
    output.error = '帳號或密碼錯誤'
    output.code = 410
    return res.json(output)
  } else {
    const row = rows[0]

    const output = {}
    output.state = true
    output.userInfo = row

    const token = jwt.sign(
      {
        sid: row.sid,
        account: row.email,
      },
      process.env.JWT_SECRET
    )

    output.token = token

    res.json(output)
  }
  // req.session.userId = result.sid
})

router.post('/checklogin', async (req, res, next) => {
  console.log(req.body.token)
  jwt.verify(req.body.token, process.env.JWT_SECRET, (error, decoded) => {
    if (error) {
      console.log({ error })
    }
    console.log(decoded)
  })
  if (req.body.token) {
    res.json({
      state: true,
      message: `成功！`,
    })
  } else {
    res.json({
      state: false,
      message: `失敗！`,
    })
  }
})

//會員註冊
router.post('/register', async (req, res, next) => {
  const { email, password } = req.body
  const sql = `INSERT INTO members ( email, password ) VALUES (?,?)`

  const checkSql = `SELECT * FROM members WHERE email = ?`
  try {
    const check = await db.query(checkSql, [email])

    if (check[0].length > 0) {
      res.json({
        state: false,
        message: `此信箱已註冊過了！`,
        user: check[0],
      })
    } else {
      const create = await db.query(sql, [email, password])
      if (create) {
        res.json({
          state: true,
          message: `註冊成功！`,
        })
      } else {
        res.json({
          state: false,
          message: `註冊失敗！`,
        })
      }
    }
  } catch (err) {
    next(err)
  }
})

//會員編輯頁面
router.put('/update', async function (req, res) {
  const output = {}

  const sql =
    'UPDATE `members` SET `name`=? ,`birthday`=?,`address`=?, `mobile`=? WHERE `email`=?'
  let { name, birthday, address, email, mobile } = req.body

  if (address === ',,') {
    address = ''
  }

  const [result] = await db.query(sql, [name, birthday, address, mobile, email])

  output.result = result
  output.success = !!result.changedRows

  if (result.changedRows) {
    res.json({
      state: true,
      message: `修改成功！`,
      userInfo: req.body,
    })
  } else {
    res.json({
      state: false,
      message: `修改已取消！`,
    })
  }

  // res.json(output)

  // req.session.userId = result.sid
})

//忘記密碼 token
router.post('/forgetPassword', async function (req, res) {
  const sql = 'SELECT * FROM members WHERE email=?'
  const [rows] = await db.query(sql, [req.body.email])
  if (rows.length < 1) {
    const output = {}
    output.error = '帳號或密碼錯誤'
    output.code = 410
    return res.json(output)
  } else {
    const row = rows[0]

    const output = {}
    output.error = ''
    output.state = true
    if (row.password === 'googleAuth') {
      output.state = false
      output.error = 'googleAuth'
    }

    output.userInfo = row

    const token = jwt.sign(
      {
        sid: row.sid,
        account: row.email,
      },
      process.env.JWT_SECRET
    )

    output.token = token

    res.json(output)
  }
  // req.session.userId = result.sid
})

// 修改新密碼

router.post('/changePassword', async function (req, res) {
  console.log('changePassword req', req.body.data)

  jwt.verify(
    req.body.data.token,
    process.env.JWT_SECRET,
    async (error, decoded) => {
      if (error) {
        console.log({ error })
      }

      const email = decoded.account

      if (req.body.data?.oldPassword) {
        const sql =
          'UPDATE `members` SET `password`=? WHERE `email`=? AND `password`=?'
        const { newPassword } = req.body.data
        const [result] = await db.query(sql, [
          newPassword,
          email,
          req.body.data.oldPassword,
        ])

        const output = {}
        output.result = result
        output.success = !!result.changedRows

        if (result.changedRows) {
          res.json({
            state: true,
            message: `修改為新密碼成功！`,
            userInfo: req.body,
          })
        } else {
          res.json({
            state: false,
            message: `舊密碼錯誤！`,
          })
        }
      } else {
        const sql = 'UPDATE `members` SET `password`=? WHERE `email`=?'
        const { newPassword } = req.body.data
        const [result] = await db.query(sql, [newPassword, email])

        const output = {}
        output.result = result
        output.success = !!result.changedRows

        if (result.changedRows) {
          res.json({
            state: true,
            message: `修改成功！`,
            userInfo: req.body,
          })
        } else {
          res.json({
            state: false,
            message: `修改失敗！`,
          })
        }
      }
    }
  )
})

//活動訂單
router.get('/getActivityData/:sid', async (req, res) => {
  const sid = req.params.sid

  const sql =
    'SELECT * FROM `participants` AS a JOIN activity AS b ON a.activity_id=b.activity_id WHERE sid=?;'
  const [rows] = await db.query(sql, [sid])

  return res.json(rows)
})

// 商城訂單
router.get('/getOrderData/:sid', async (req, res) => {
  const sid = req.params.sid

  const sql = 'SELECT * FROM s_order WHERE s_order_user_id =?'
  const [rows] = await db.query(sql, [sid])

  return res.json(rows)
})
// http://localhost:3000/members/getActivityData/2
module.exports = router
