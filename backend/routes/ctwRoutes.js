const express = require('express')
const {createCTW,
    getAllCTWs,
    getCTWById,
    updateCTW,
    deleteCTW,} = require('../controllers/CtwController')

const router = express.Router()

router.post('/createctw', createCTW)
router.get('/getallctw', getAllCTWs)
router.get('/getctwbyid/:id', getCTWById)
router.patch('/updatectw/:id', updateCTW)
router.delete('/deletectw', deleteCTW)

module.exports = router