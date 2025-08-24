const Joi = require('joi');

const examNameSchema = Joi.object({
  name: Joi.string().required()
});

const rubericsNameSchema = Joi.object({
  name: Joi.string().required()
});


const createExamSchema = Joi.object({
  examination_code: Joi.string().required(),
  class: Joi.number().required(),
  exam_date: Joi.string().required(),
  subject_code: Joi.string().required(),
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

const questionPaperAddSchema = Joi.object({
  golden_code: Joi.string().optional(),
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

const evaluationUpdateSchema = Joi.object({
  id: Joi.number().required(),
  marks_obtained: Joi.number().optional(),
  reason: Joi.string().optional(),
  strengths: Joi.string().optional(),
  areas_for_improvement: Joi.number().optional()
});

module.exports = { examNameSchema,rubericsNameSchema,createExamSchema,questionPaperUpdateSchema,questionPaperAddSchema,evaluationUpdateSchema };
