const testUserController = (req, res) => {
  try {
    return res.status(200).send({
      success: true,
      message: 'test user api data',
    });
  } catch (error) {
    console.log('error on test user api', error);
  }
};

module.exports = { testUserController };
