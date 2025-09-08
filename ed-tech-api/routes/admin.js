const express = require('express');
const router = express.Router();
const { addExam,getExam,addRuberics,getRuberics,getClasses,createExamDetails,getStudentByClass,getExamCode,getScheduledExams,getScheduledQuestionPapers,updateQuestionPaper,getSubjects,getGoldenCode,getStudentResult,addQuestions,getEvaluationResults,updateEvaluationResult } = require('../controllers/admin');
const auth =require('../middleware/auth/authJwt')
router.post('/add_exam_name',[auth.verifyToken], addExam);
router.get('/exams',[auth.verifyToken], getExam);
router.get('/subjects',[auth.verifyToken], getSubjects);
router.post('/add_ruberics',[auth.verifyToken], addRuberics);
router.get('/ruberics',[auth.verifyToken], getRuberics);
router.get('/classes',[auth.verifyToken], getClasses);
router.get('/golden_code',[auth.verifyToken], getGoldenCode);
router.post('/schedule_exam',[auth.verifyToken], createExamDetails);
router.get('/students_by_class',[auth.verifyToken], getStudentByClass);
router.get('/exam_codes',[auth.verifyToken], getExamCode); 
router.get('/scheduled_exam_details',[auth.verifyToken], getScheduledExams);
router.get('/scheduled_question_papers',[auth.verifyToken], getScheduledQuestionPapers);
router.post('/update_question_paper', [auth.verifyToken],updateQuestionPaper);
router.get('/students_by_class',[auth.verifyToken], getStudentByClass);
router.get('/student_result',[auth.verifyToken], getStudentResult);
router.post('/add_questions', [auth.verifyToken],addQuestions);
router.get('/evaluation_results',[auth.verifyToken], getEvaluationResults);
router.post('/update_evaluation_result',[auth.verifyToken], updateEvaluationResult);






module.exports = router;
