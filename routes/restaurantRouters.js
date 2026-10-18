const express = require('express');
const authMiddleware = require('../middlewares/authMiddlewares');
const {
  createNewRestaurantController,
  getAllRestaurantController,
  getRestaurantByIdController,
  updateRestaurantProfileController,
  deleteRestaurantController,
} = require('../controllers/restaurantControllers');

const router = express.Router();
// routers

// create new Restaurant
router.post('', authMiddleware, createNewRestaurantController);

// getAllRestaurant
router.get('/getAllRestaurant', getAllRestaurantController);

// getRestaurantById
router.get('/:id', getRestaurantByIdController);

// updateRestaurantProfile
router.patch('/:id', authMiddleware, updateRestaurantProfileController);

// deleteRestaurant
router.delete('/:id', authMiddleware, deleteRestaurantController);

module.exports = router;
