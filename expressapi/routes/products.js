const express = require('express');
const router = express.Router();
// const db = require('../models/mysqlconnect');
const db = require('../models/myconnection');


router.get('/',async(req, res)=>{
    //res.send('讀取所有商品資料');
    const sql ="SELECT `product_id`, `product_name`, `category`, `price`, `side_pic1`, `side_pic2`, `side_pic3` FROM `products` WHERE 1";
    const [rows, fields] = await db.query(sql);
    res.json(rows);
})

router.get('/:product_id',async(req, res)=>{
    //res.send('讀取單一商品資料');
    const sql ="SELECT `product_id`, `product_name`, `category`, `price`, `side_pic1`, `side_pic2`, `side_pic3` FROM `products` WHERE product_id = ?";
    const [rows, fields] = await db.query(sql, [req.params.product_id]);
    res.json(rows[0]);
})

router.post('/',async(req, res) => {
    const { product_name, category, price, side_pic1, side_pic2, side_pic3 } = req.body;
    const sql = "INSERT INTO products(product_name, category, price, side_pic1, side_pic2, side_pic3) VALUES(?, ?, ?, ?, ?, ?)";
    const [result] = await db.execute(sql, [product_name, category, price, side_pic1, side_pic2, side_pic3]);
    let message = '新增發生了錯誤';
    if (result.affectedRows) {
        message = '新增成功';
    }
    res.send(message);
})

router.put('/:product_id', async(req, res) => {
    const { product_name, category, price, side_pic1, side_pic2, side_pic3 } = req.body;
    const sql = "UPDATE products SET product_name=?, category=?, price=?, side_pic1=?, side_pic2=?, side_pic3=? WHERE product_id=?";
    const [result] = await db.execute(sql,[product_name, category, price, side_pic1, side_pic2, side_pic3, req.params.product_id]);
    let message = '修改沒有成功';
    if(result.affectedRows) {
        message = '修改成功';
    }
    res.send(message);
})

router.delete('/:product_id', async (req, res) =>{
    const sql = "DELETE FROM products WHERE product_id=?";
    const [result] = await db.execute(sql, [req.params.product_id]);
    let message = '刪除發生了錯誤';
    if(result.affectedRows) {
        message = '刪除成功';
    }
    res.send(message);
});

module.exports = router;