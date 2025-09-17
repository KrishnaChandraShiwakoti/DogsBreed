const Dog = require('../models/dogs');

exports.getBreed = async (req, res) => {
  // console.log(req.query);
  try {
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 10;
    skip = limit * (page - 1);
    // Total number of documents
    const totalDocs = await Dog.countDocuments();

    // Calculate max pages
    const maxPage = Math.ceil(totalDocs / limit);

    const response = await Dog.find().skip(skip).limit(limit);
    if (response.length == 0 && page > 1) {
      throw new Error("This page doesn't have any data. Try lower page number");
    }
    res.status(200).json({
      status: 'success',
      maxPage,
      result: response.length,
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: error.message,
    });
  }
};
exports.getSingleBreed = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await Dog.find({
      name: { $regex: `^${id}`, $options: 'i' },
    });
    res.status(200).json({
      status: 'success',
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: error.message,
    });
  }
};
exports.addBreed = async (req, res) => {
  try {
    const {
      name,
      description,
      life,
      male_weight,
      female_weight,
      hypoallergenic,
    } = req.body;
    await Dog.create({
      name,
      description,
      life,
      male_weight,
      female_weight,
      hypoallergenic,
    });
    res.status(201).json({
      status: 'success',
      message: 'added a dog breed successfully',
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: error.message,
    });
  }
};
exports.updateBreed = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await Dog.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!response) throw new Error('No dogBreed with the id');
    const updatedResponse = await Dog.findById(id);
    res.status(200).json({
      status: 'success',
      data: updatedResponse,
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: error.message,
    });
  }
};
exports.deleteBreed = async (req, res) => {
  console.log(req.params.id);
  try {
    await Dog.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: 'success',
      message: 'breed deleted successfully',
    });
  } catch (error) {
    await Dog.findByIdAndDelete(req.params.id);
    res.status(500).json({
      status: 'fail',
      message: error.message,
    });
  }
};
