
const { check, validationResult } = require("express-validator");//after we npm install express-validator
const bcrypt = require("bcryptjs");//after we npm install bcryptjs

var api_key = "pk_f83525dace814340bdc3798e1a01e265";//remove this and set as environment variable instead!
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;//in order to get json from http url

var User = require("../models/user");

/*-------------------------------------------------------------------------------------------------*/

exports.home = function (req, res) {
    if (req.session.userID)
        res.redirect("dashboard");
    res.render("index");
};
exports.signup = function (req, res) {
    if (req.session.userID)
        res.redirect("dashboard");
    res.render("signup");
};
exports.login = function (req, res) {
    if (req.session.userID)
        res.redirect("dashboard");
    res.render("login");
};

/*-------------------------------------------------------------------------------------------------*/

exports.dashboard = function (req, res) {
    if (!req.session.userID) {
        res.redirect("login");
    } else {
        res.render("dashboard");
    }
};
exports.logout = function (req, res) {
    req.session.destroy(err => {
        if (err) {
            res.redirect("index");
        }
        res.clearCookie("session");
        res.redirect("login");
    });
};

/*-------------------------------------------------------------------------------------------------*/

exports.login_post = async (req, res) => {
    const { uname, pword } = req.body;
    try {
        let user = await User.findOne({
            uname
        });

        if (!user) {
            var message= "User does not exist.";
            return res.render("login", {message: message});
        }

        const isMatch = await bcrypt.compare(pword, user.pword);

        if (!isMatch) {
            var message= "Incorrect password.";
            return res.render("login", {message: message});
        }

        req.session.userID = user.uname;
        try {
            let endowmenthelper = await Portfolio_current.findOne({
                client: uname
            });
            endowment = endowmenthelper.totalCash;
        } catch {
            endowment = 10000;
        }
        await res.redirect("dashboard");

    } catch (e) {
        console.error(e);
        res.status(500).json({
            message: "Server Error"
        });
    }
};

exports.signup_post = async (req, res) => {
    const { uname, fname, lname, pword } = req.body;
    try {
        let user = await User.findOne({
            uname
        });

        if (user) {
            var message= "User already exists.";
            return res.render("signup", {message: message});
        }

        user = new User({ uname, fname, lname, pword });

        const salt = await bcrypt.genSalt(10);
        user.pword = await bcrypt.hash(pword, salt);

        await user.save(function (err) {
            if (err) { return next(err); }
            res.redirect("login");
        });

    } catch (err) {
        console.log(err.message);
        res.status(500).send("Error in Saving");
    }
};
