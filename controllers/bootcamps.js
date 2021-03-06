const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const Bootcamp = require('../models/Bootcamp');
const { Error } = require('mongoose');

// @desc        Get all bootcamps
// @route       GET /api/v1/bootcamps
// @access      Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  
  const bootcamps = await Bootcamp.find();

  return res.status(200).json({ sucess: true, data: bootcamps });  
    
});

// @desc        Get single bootcamps
// @route       GET /api/v1/bootcamps/:id
// @access      Public
exports.getBootcamp = asyncHandler(async (req, res, next) => {
 
  const bootcamp = await Bootcamp.findById(req.params.id);

  if(!bootcamp){
    return next(new ErrorResponse(`Resource not found with id of ${req.params.id}`, 404))
  }

  return res.status(200).json({ sucess: true, data: bootcamp }) 
  
});

// @desc        Create new bootcamp
// @route       POST /api/v1/bootcamps
// @access      Private
exports.createBootcamp = async (req, res, next) => {
  
  const bootcamp = await Bootcamp.create(req.body);

  return res.status(201).json({
    sucess: true,
    data: bootcamp,
  })  
}

// @desc        Update bootcamp
// @route       POST /api/v1/bootcamps/:id
// @access      Private
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
  
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })

  if(!bootcamp){
    return next(new ErrorResponse(`Resource not found with id of ${req.params.id}`, 404))
  }

  return res.status(200).json({ sucess: true, data: bootcamp }) 
  
});

// @desc        Delete bootcamp
// @route       POST /api/v1/bootcamps/:id
// @access      Private
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
  
  const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

  if(!bootcamp){
    return next(new ErrorResponse(`Resource not found with id of ${req.params.id}`, 404))
  }
  return res.status(200).json({ sucess: true, data: {}})  
  
});







