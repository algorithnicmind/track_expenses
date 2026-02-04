const express = require('express');
const router = express.Router();
const {
  getProfile,
  updateProfile,
  changePassword,
  deleteAccount
} = require('../controllers/userController');
const { protect } = require('../middleware/auth');
const { updateProfileValidator, changePasswordValidator } = require('../middleware/validators');

// All routes require authentication
router.use(protect);

router
  .route('/profile')
  .get(getProfile)
  .put(updateProfileValidator, updateProfile);

router.put('/change-password', changePasswordValidator, changePassword);
router.delete('/account', deleteAccount);

module.exports = router;
