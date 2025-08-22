const { ExamName,Ruberics,Classes ,ExamDetails,QuestionPapers,User} = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sequelize = require('../config/db');
const {QueryTypes}=require('sequelize')
const { Op, fn, col, where } = require('sequelize');
const moment =require('moment')
require('dotenv').config();

const createExam = async (data) => {
    await ExamName.create({name:data.name})
};

const examList = async () => {
   return  await ExamName.findAll({where:{status:1}})
};

const createRuberics = async (data) => {
    await Ruberics.create({name:data.name})
};

const rubericsList = async () => {
   return  await Ruberics.findAll({where:{status:1}})
};

const classesList = async () => {
    return await sequelize.query(
      `
      SELECT 
        id,
        CONCAT(class, '-', section) AS class_section,
        status,
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
      const examName = await ExamName.findOne({ where: { id: Number(data.exam_id) } });
      if (!examName) {
        throw new Error('Invalid Exam Name');
      }
  
      // Validate Class
      const className = await Classes.findOne({ where: { id: Number(data.class_id) } });
      if (!className) {
        throw new Error('Invalid Class Name');
      }
  
      // Check if exam already scheduled
      const isExamAlreadyScheduled = await ExamDetails.findOne({
        where: {
          exam_id: Number(data.exam_id),
          class_id: Number(data.class_id),
          exam_date: data.exam_date,
          status: 1,
          [Op.and]: [
            where(fn('UPPER', col('subject')), data.subject.toUpperCase())
          ]
        },
        transaction
      });
  
      if (isExamAlreadyScheduled) {
        throw new Error('This exam is already scheduled.');
      }
  
      // 🔹 Generate professional exam_code
      const formattedDate = moment(data.exam_date).format('YYYYMMDD');
      const subjectCode = data.subject.toUpperCase().replace(/\s+/g, '_');
      const classCode = String(className.class).toUpperCase().replace(/\s+/g, '_');
      const sectionCode = String(className.section).toUpperCase().replace(/\s+/g, '_');
  
      data.exam_code = `${subjectCode}_${formattedDate}_${classCode}_${sectionCode}`;
  
      // Create ExamDetails
      const newExam = await ExamDetails.create(data, { transaction });
  
      // Prepare question details for bulk insert
      const questionData = data.question_details.map(q => ({
        exam_detail_id: newExam.id,
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

const studentListByClass = async (classId) => {
    const classDetails = await Classes.findOne({ where: { id: classId, status: 1 } });
    if (!classDetails) {
      throw new Error('Class Not Found');
    }
  
    const userDetails = await sequelize.query(
      `
      SELECT 
        id,
        CONCAT(name, '-', username) AS name
      FROM users
      WHERE status = :status 
        AND class = :class
        AND section = :section and role='STUDENT'
      `,
      {
        replacements: {
          status: 1,
          class: classDetails.class,
          section: classDetails.section
        },
        type: QueryTypes.SELECT
      }
    );
  
    return userDetails;
};

const getExamCodeDetails = async () => {
  return  await ExamDetails.findAll({})
};

const getScheduledExamsDetails = async (examId) => {
  const examScheduledDetails = await sequelize.query(
    `
    SELECT 
      e.exam_name,
      e.exam_id,
      e.class,
      e.exam_date,
      e.subject,
      e.exam_code
    FROM exam_details e 
    WHERE e.status = :status 
      AND e.exam_id = :examId
    `,
    {
      replacements: {
        status: 1,
        examId: examId,
      },
      type: QueryTypes.SELECT,
    }
  );

  return examScheduledDetails;
};

const getScheduledExamPapers = async (examDetailId) => {
  return  await QuestionPapers.findAll({where:{exam_detail_id:examDetailId,status:1}})
};

const updateQuestionPapers = async (data) => {
  const questionPaper= await QuestionPapers.findOne({where:{id:data.id}})
  if(!questionPaper){
    throw new Error('Invalid Question');
  }
  await QuestionPapers.update({question_number:data.question_number,question:data.question,answer:data.answer,marks:data.marks,question_type:data.question_type,ruberics:data.ruberics},{where:{id:data.id}})
};




  





module.exports = { createExam,examList,createRuberics,rubericsList,classesList,registerExam,studentListByClass,getExamCodeDetails,getScheduledExamsDetails,getScheduledExamPapers,updateQuestionPapers };
