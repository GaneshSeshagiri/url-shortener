const {nanoid} = require('nanoid')
const express = require('express')
const router = express.Router()
const pool = require('../db')


router.post('/shorten',async(req,res)=>{
    const {long_url} = req.body
    try {
        try {
            new URL(long_url) 
        }
        catch {
            return res.status(400).json({ msg: 'Invalid URL' })
        }
        const short_id = nanoid(7)
        const result = await pool.query(`insert into urls(short_code,long_url) values($1,$2) returning *`,[short_id,long_url])

        res.json({
        msg : `url shortened`,
        data : result.rows[0]
     })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error : `Something went wrong`})
        
    }
})

router.get('/:shortId',async(req,res) => {
    
    const shortId = req.params.shortId;
    
    try {

        const result = await pool.query(`select * from urls where short_code = ($1)`,[shortId])
        const updateCount = await pool.query(`update urls set clicks = clicks+1 where short_code = $1`,[shortId])

        if(result.rowCount === 0){
            return res.status(404).json({msg : `url not found`})
        }

        res.redirect(result.rows[0].long_url)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({msg : `Something went wrong`})
    }
})

router.get('/stats/:shortId',async(req,res) => {

    const shortId = req.params.shortId;
    try {
        
        const result = await pool.query
        (`select * from urls where short_code = $1 `,[shortId])
        if(result.rowCount === 0){
            return res.status(404).json({msg : `url not found`})
        }

        res.status(200).json({
            id : result.rows[0].id,
            short_url : result.rows[0].short_code,
            long_url : result.rows[0].long_url,
            clicks : result.rows[0].clicks
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({msg : `Something went wrong`})
    }

})

router.get('/all',async(req,res)=>{

    try {
        
        const result = await pool.query(`select id,short_code,long_url,created_at,clicks from urls`)
        
        res.json({
            msg : 'success',
            data : result.rows
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({msg : `Something went wrong`})
    }
})

router.delete('/delete/:shortId',async(req,res)=>{

    const shortId = req.params.shortId;
    try {
        
        const result = await pool.query
        (`delete from urls where short_code = $1 returning id,short_code,long_url`,[shortId])
        
        res.json({
            msg : 'deleted url',
            data : result.rows
        })
    } catch (error) {
        console.log(error)
        res.status(404).json({msg : `url not found`})
    }
})



module.exports = router;