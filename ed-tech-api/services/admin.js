const { ExamName,Ruberics,Classes ,ExamDetails,QuestionPapers,User,Subject,SubjectResults, Student, Evaluations} = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sequelize = require('../config/db');
const {QueryTypes}=require('sequelize')
const { Op, fn, col, where } = require('sequelize');
const moment =require('moment')
require('dotenv').config();

const createExam = async (data) => {
  // Convert name to uppercase
  const upperName = data.name.toUpperCase();

  // Take first 2 letters of name
  const codePrefix = upperName.slice(0, 2);

  // Format date as YYMMDD (no dashes)
  const now = new Date();
  const yy = String(now.getFullYear()).slice(-2);
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  const datePart = `${yy}${mm}${dd}`;

  const examinationCode = `${codePrefix}_${datePart}`;

  await ExamName.create({
    name: upperName,
    examination_code: examinationCode
  });
};



const examList = async () => {
  return await sequelize.query(
    `
    SELECT 
    id,
        CONCAT(name, ' (', examination_code, ')')  as name,
        examination_code,
      created_at AS "createdAt",
      updated_at AS "updatedAt"
    FROM exam_name
    WHERE status = :status
    `,
    {
      replacements: { status: 1 }, // parameterized
      type: QueryTypes.SELECT
    }
  );};

const createRuberics = async (data) => {
    await Ruberics.create({name:data.name})
};

const rubericsList = async () => {
   return  await Ruberics.findAll({where:{status:1}})
};

const getAllSubjects = async () => {
  return await sequelize.query(
    `
    SELECT 
      id,
        CONCAT(name, ' (', subject_code, ')') AS name,
        subject_code
    FROM subjects
    WHERE status = :status
    `,
    {
      replacements: { status: 1 }, // parameterized
      type: QueryTypes.SELECT
    }
  );};


const classesList = async () => {
    return await sequelize.query(
      `
      SELECT 
        id,
        class,
        created_at AS "createdAt",
        updated_at AS "updatedAt"
      FROM classes
      WHERE status = :status
      `,
      {
        replacements: { status: 1 }, // parameterized
        type: QueryTypes.SELECT
      }
    );
};

const registerExam = async (data) => {
    const transaction = await sequelize.transaction();
    try {
      // Validate Exam Name
      const examName = await ExamName.findOne({ where: { examination_code:data.examination_code } });
      if (!examName) {
        throw new Error('Invalid Examination Code');
      }
  
      // Validate Class
      const className = await Classes.findOne({ where: { class: Number(data.class) } });
      if (!className) {
        throw new Error('Invalid Class');
      }

      const subjectName = await Subject.findOne({ where: { subject_code: (data.subject_code) } });
      if (!subjectName) {
        throw new Error('Invalid Subject Code');
      }
  
      // Check if exam already scheduled
      const isExamAlreadyScheduled = await ExamDetails.findOne({
        where: {
          examination_code: (data.examination_code),
          class: Number(data.class),
          exam_date: data.exam_date,
          status: 1,
          subject_code:data.subject_code
        },
        transaction
      });
  
      if (isExamAlreadyScheduled) {
        throw new Error('This exam is already scheduled.');
      }
  
      // 🔹 Generate professional exam_code
      // const formattedDate = moment(data.exam_date).format('YYYYMMDD');
      // const subjectCode = data.subject.toUpperCase().replace(/\s+/g, '_');
      // const classCode = String(className.class).toUpperCase().replace(/\s+/g, '_');
      // const sectionCode = String(className.section).toUpperCase().replace(/\s+/g, '_');
  
      data.golden_code = `${data.class}-${data.subject_code}-${data.examination_code}`;
  
      // Create ExamDetails
      const newExam = await ExamDetails.create(data, { transaction });
  
      // Prepare question details for bulk insert
      const questionData = data.question_details.map(q => ({
        exam_detail_id: newExam.id,
        golden_code:newExam.golden_code,
        question_number: q.question_number,
        question: q.question,
        answer: q.answer,
        marks: q.marks,
        question_type: q.question_type,
        ruberics: q.ruberics || '',
        status: 1
      }));
  
      // Bulk insert question papers
      await QuestionPapers.bulkCreate(questionData, { transaction });
  
      // Commit if everything succeeds
      await transaction.commit();
      return newExam;
  
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
};

const getGoldenCodeOfExam = async (examinationCode,classNumber,subjectCode,studentId) => {
  try{
    const examDetails= await ExamDetails.findOne({where:{examination_code:examinationCode,subject_code:subjectCode,class:classNumber}})
    if(!examDetails){
      throw new Error('Invalid Exam');
    }
    const studentDetails= await Student.findOne({where:{student_id:studentId}})
    if(!studentDetails){
      throw new Error('student Not found');
    }
    const subjectResults= await SubjectResults.findOne({where:{student_id:studentId,subject_code:subjectCode,class:classNumber,golden_code:examDetails.golden_code}})
    return {golden_code:examDetails.golden_code,is_evaluation_completed:subjectResults ? 1 : 0}
  }catch(err){
    throw err;
  }
};


const studentListByClass = async (classNumber) => {
    const classDetails = await Classes.findOne({ where: { class: classNumber, status: 1 } });
    if (!classDetails) {
      throw new Error('Class Not Found');
    }
  
    const studentDetails = await sequelize.query(
      `
      SELECT 
        id,
        CONCAT(name, ' (', student_id, ')') AS name,
        student_id
      FROM students
      WHERE status = :status 
        AND class = :class
      `,
      {
        replacements: {
          status: 1,
          class: classNumber
        },
        type: QueryTypes.SELECT
      }
    );
  
    return studentDetails;
};

const getExamCodeDetails = async () => {
  return  await ExamDetails.findAll({})
};

const getScheduledExamsDetails = async (examinationCode) => {
  const examScheduledDetails = await sequelize.query(
    `
    SELECT 
      e.examination_code,
      e.class,
      e.exam_date,
      e.subject_code,
      e.golden_code
    FROM exam_details e 
    WHERE e.status = :status 
      AND e.examination_code = :examinationCode
    `,
    {
      replacements: {
        status: 1,
        examinationCode: examinationCode,
      },
      type: QueryTypes.SELECT,
    }
  );

  return examScheduledDetails;
};

const getScheduledExamPapers = async (goldenCode) => {
  return  await QuestionPapers.findAll({where:{golden_code:goldenCode,status:1}})
};

const updateQuestionPapers = async (data) => {
  const questionPaper= await QuestionPapers.findOne({where:{id:data.id}})
  if(!questionPaper){
    throw new Error('Invalid Question');
  }
  await QuestionPapers.update({question_number:data.question_number,question:data.question,answer:data.answer,marks:data.marks,question_type:data.question_type,ruberics:data.ruberics},{where:{id:data.id}})
};

const getStudentSubjectResult = async (studentId,goldenCode) => {
  const isValidStudent= await Student.findOne({where:{student_id:studentId}})
  if(!isValidStudent){
    throw new Error('Student not found');
  }
  const isGoldenCodeExist=await ExamDetails.findOne({where:{golden_code:goldenCode}})
  if(!isGoldenCodeExist){
    throw new Error('Invalid Golden Code');
  }
  const result= await SubjectResults.findOne({where:{student_id:studentId,golden_code:goldenCode}})
  return result
};

const addQuestionPaper = async (data) => {
  try {
    const {  golden_code, question_details } = data;

    // ✅ Get the latest exam detail
    const latestExamDetail = await ExamDetails.findOne({
      where: { golden_code: golden_code },
      order: [['id', 'DESC']]
    });

    if (!latestExamDetail) {
      throw new Error('Golden code not found');
    }

    // ✅ Find the last question_number for this exam_detail_id
    // const lastQuestion = await QuestionPapers.findOne({
    //   where: { exam_detail_id: latestExamDetail.id },
    //   order: [['question_number', 'DESC']]
    // });

    // let startNumber = lastQuestion ? lastQuestion.question_number + 1 : 1;

    // ✅ Assign incremental question_number automatically
    const rows = question_details.map((q, index) => ({
      exam_detail_id: latestExamDetail.id, // use latest exam_detail_id
      golden_code,
      question_number: q.question_number,
      question: q.question,
      answer: q.answer,
      marks: q.marks,
      question_type: q.question_type,
      ruberics: q.ruberics || null
    }));

    // ✅ Bulk insert
    await QuestionPapers.bulkCreate(rows);

    return { success: true, message: "Question paper added successfully" };

  } catch (error) {
    console.error("Error adding question paper:", error);
    throw error;
  }
};

const getEvaluationResultsByGoldenCode =async(goldenCode)=>{
  try{
    return await Evaluations.findAll({where:{golden_code:goldenCode,status:1}})
  }catch(err){
    throw err;
  }
}


const updateEvaluationResults = async (data) => {
  const evaluation= await Evaluations.findOne({where:{id:data.id}})
  if(!evaluation){
    throw new Error('Invalid Id');
  }
  await Evaluations.update({marks_obtained:data.marks_obtained,reason:data.reason,strengths:data.strengths,areas_for_improvement:data.areas_for_improvement},{where:{id:data.id}})
};


  





module.exports = { createExam,examList,createRuberics,rubericsList,classesList,registerExam,studentListByClass,getExamCodeDetails,getScheduledExamsDetails,getScheduledExamPapers,updateQuestionPapers,getAllSubjects,getGoldenCodeOfExam,getStudentSubjectResult,addQuestionPaper,getEvaluationResultsByGoldenCode,updateEvaluationResults };
