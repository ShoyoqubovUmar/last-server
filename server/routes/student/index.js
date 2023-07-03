const{Router} = require('express');

const {
    index, profileSt
} = require('../../controllers/student/index')
const router = Router()

router.get('/', index)
router.get('/prof', profileSt)

module.exports = router