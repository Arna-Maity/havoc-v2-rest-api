const express = require('express') ;
const router = express.Router() ;

router.get('/update', (req,res) => {
    res.status(200).json({message: 'Hey pigeon.'}) ;
}) ;

module.exports = router ;