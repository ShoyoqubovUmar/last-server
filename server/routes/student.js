const{Router} = require('express');

const router = Router()

router.use('/',require("./student/index"))

module.exports = router