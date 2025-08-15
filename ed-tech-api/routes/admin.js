const express = require('express');
const router = express.Router();
const { addExam,getExam,addRuberics,getRuberics,getClasses,createExamDetails,getStudentByClass,getExamCode } = require('../controllers/admin');

router.post('/add_exam_name', addExam);
router.get('/exams', getExam);
router.post('/add_ruberics', addRuberics);
router.get('/ruberics', getRuberics);
router.get('/classes', getClasses);
router.post('/schedule_exam', createExamDetails);
router.get('/students_by_class/:id', getStudentByClass);
router.get('/exam_codes', getExamCode);






module.exports = router;
