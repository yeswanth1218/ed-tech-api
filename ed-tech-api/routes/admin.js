const express = require('express');
const router = express.Router();
const { addExam,getExam,addRuberics,getRuberics,getClasses,createExamDetails,getStudentByClass,getExamCode,getScheduledExams,getScheduledQuestionPapers,updateQuestionPaper,getSubjects } = require('../controllers/admin');

router.post('/add_exam_name', addExam);
router.get('/exams', getExam);
router.get('/subjects', getSubjects);
router.post('/add_ruberics', addRuberics);
router.get('/ruberics', getRuberics);
router.get('/classes', getClasses);
router.post('/schedule_exam', createExamDetails);
router.get('/students_by_class', getStudentByClass);
router.get('/exam_codes', getExamCode); 
router.get('/scheduled_exam_details', getScheduledExams);
router.get('/scheduled_question_papers', getScheduledQuestionPapers);
router.post('/update_question_paper', updateQuestionPaper);







module.exports = router;
