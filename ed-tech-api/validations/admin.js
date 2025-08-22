const Joi = require('joi');

const examNameSchema = Joi.object({
  name: Joi.string().required()
});

const rubericsNameSchema = Joi.object({
  name: Joi.string().required()
});


const createExamSchema = Joi.object({
  exam_name: Joi.string().required(),
  exam_id: Joi.number().required(),
  class_id: Joi.number().required(),
  class: Joi.string().required(),
  exam_date: Joi.string().required(),
  subject: Joi.string().required(),
  evaluator_id: Joi.number().required(),
  question_details: Joi.array().items(
    Joi.object({
      question_number: Joi.number().required(),
      question: Joi.string().required(),
      answer: Joi.string().required(),
      marks: Joi.number().precision(2).required(),
      question_type: Joi.string().required(),
      ruberics: Joi.string().allow('').optional()
    })
  ).required()
});

const questionPaperUpdateSchema = Joi.object({
  id: Joi.number().required(),
  question_number: Joi.number().optional(),
  question: Joi.string().optional(),
  answer: Joi.string().optional(),
  marks: Joi.number().optional(),
  question_type: Joi.string().optional(),
  ruberics: Joi.string().optional()
});


module.exports = { examNameSchema,rubericsNameSchema,createExamSchema,questionPaperUpdateSchema };
