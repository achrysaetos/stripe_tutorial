var express = require('express');
const { route } = require('../app');
var router = express.Router();

//Require controller modules
var goto = require("../controllers/goto");

//Routes
router.get("/", goto.home);
router.get("/login", goto.login);
router.get("/signup", goto.signup);

router.post("/login", goto.signup_post);
router.post("/dashboard", goto.login_post);
router.post("/logout", goto.logout);

router.get("/dashboard", goto.dashboard);
router.get("/logout", goto.logout);

router.post("/payments", goto.login_post);
router.get("/payments", goto.payments);
router.post("/history", goto.login_post);
router.get("/history", goto.history);

module.exports = router;