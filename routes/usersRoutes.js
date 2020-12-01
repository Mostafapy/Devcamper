const express = require('express');

const userModel = require('../models/User');

const advancedResults = require('../middlewares/advancedResults');
const authProtect = require('../middlewares/authProtect');
const roleAuthorization = require('../middlewares/roleAuthorization');

const router = express.Router({ mergeParams: true });

const {
   getAllUsers,
   getUser,
   createUser,
   updateUser,
   deleteUser,
} = require('../controllers/userController');

router.use(authProtect);

router.use(roleAuthorization('admin'));

router
   .route('/')
   .get(advancedResults(userModel), getAllUsers)
   .post(createUser);

router
   .route('/:id')
   .get(getUser)
   .put(updateUser)
   .delete(deleteUser);

module.exports = router;
