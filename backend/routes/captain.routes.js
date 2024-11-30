const express = require('express')
const router = express.Router();
const {body} = require('express-validator');
const captainController = require('../controllers/captain.controller');
const { authCaptain, authUser } = require('../middlewares/auth.middleware');

router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min: 6}).withMessage('First name must be at least 6 charaters long'),
    body('password').isLength({min: 6}).withMessage('password must be at least 6 characters long'),
    body('vehicle.color').isLength({min: 3}).withMessage('Color must be at least 3 characters long'),
    body('vehicle.plate').isLength({min: 9}).withMessage('plate must be at least 9 characters long'),
    body('vehicle.capacity').isInt({min: 1}).withMessage('Capacity must be at least of 1'),
    body('vehicle.vehicleType').isIn(['car', 'motorcycle', 'auto']).withMessage('Invalid Vehicle')
],
    captainController.registerCaptain
)

router.post('/login', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long')
],
    captainController.loginCaptain
)

router.get('/profile', authCaptain, captainController.getCaptainProfile);

router.get('/logout', authUser, captainController.logoutCaptain)




module.exports = router;