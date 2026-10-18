const restaurantModel = require('../models/restaurantModel');

const createNewRestaurantController = async (req, res) => {
  try {
    const {
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      code,
      coords,
    } = req.body;

    if (!title || !coords) {
      return res.status(500).send({
        success: false,
        message: 'Please provide the title and coords address for restaurant',
      });
    }

    const newRestaurant = new restaurantModel({
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      code,
      coords,
    });

    await newRestaurant.save();

    return res.status(201).send({
      success: true,
      message: 'create new restaurant successfully',
      newRestaurant,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: 'Error in create new restaurant api',
    });
  }
};

const getAllRestaurantController = async (req, res) => {
  try {
    const restaurants = await restaurantModel.find({});

    if (!restaurants) {
      return res.status(404).send({
        success: false,
        message: 'Restaurant is empty',
      });
    }

    return res.status(200).send({
      success: true,
      message: 'Find all restaurant successfully',
      restaurants,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: 'Error in get all restaurant api',
    });
  }
};

const getRestaurantByIdController = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(500).send({
        success: false,
        message: 'Please provide the restaurant id',
      });
    }

    const restaurant = await restaurantModel.findById(id);
    if (!restaurant) {
      return res.status(404).send({
        success: false,
        message: 'restaurant not found',
      });
    }

    return res.status(200).send({
      success: true,
      message: 'find restaurant successfully',
      restaurant,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: 'Error in get restaurant by ip api',
    });
  }
};

const updateRestaurantProfileController = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(500).send({
        success: false,
        message: 'Please provide the restaurant id',
      });
    }

    const restaurant = await restaurantModel.findById(id);
    if (!restaurant) {
      return res.status(404).send({
        success: false,
        message: 'restaurant not found',
      });
    }

    const {
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      code,
      coords,
    } = req.body;

    if (title) {
      restaurant.title = title;
    }

    if (imageUrl) {
      restaurant.imageUrl = imageUrl;
    }

    if (foods) {
      restaurant.foods = foods;
    }

    if (time) {
      restaurant.time = time;
    }

    if (pickup) {
      restaurant.pickup = pickup;
    }

    if (delivery) {
      restaurant.delivery = delivery;
    }

    if (isOpen) {
      restaurant.isOpen = isOpen;
    }

    if (logoUrl) {
      restaurant.logoUrl = logoUrl;
    }

    if (rating) {
      restaurant.rating = rating;
    }

    if (code) {
      restaurant.code = code;
    }

    if (coords) {
      restaurant.coords = coords;
    }

    await restaurant.save();
    return res.status(200).send({
      success: true,
      message: 'update restaurant successfully',
      restaurant,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: 'Error in update restaurant api',
    });
  }
};

const deleteRestaurantController = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(500).send({
        success: false,
        message: 'Please provide restaurant id',
      });
    }

    await restaurantModel.findByIdAndDelete(id);
    return res.status(200).send({
      success: true,
      message: 'Delete restaurant successfully',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: 'Error in delete restaurant api',
    });
  }
};

module.exports = {
  createNewRestaurantController,
  getAllRestaurantController,
  getRestaurantByIdController,
  updateRestaurantProfileController,
  deleteRestaurantController,
};
