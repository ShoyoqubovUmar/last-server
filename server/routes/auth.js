const {Router} = require("express");
const { checkLogin } = require("../middleware/checkLogin");
const { signUp, signIn } = require("../controllers/auth");
const router = Router()

router.route("/")
    .get(checkLogin,signUp)
    .post(checkLogin,signIn)
module.exports = router