

const { examNameSchema ,rubericsNameSchema,createExamSchema,questionPaperUpdateSchema,questionPaperAddSchema,evaluationUpdateSchema,userInfoSchema,evaluationSchema} = require('../validations/admin');
const {createExam,examList,createRuberics,rubericsList,classesList,registerExam,studentListByClass,getExamCodeDetails,getScheduledExamsDetails,getScheduledExamPapers,updateQuestionPapers,getAllSubjects,getGoldenCodeOfExam,getStudentSubjectResult,addQuestionPaper,getEvaluationResultsByGoldenCode,updateEvaluationResults,saveUserInformation,getAllUsers,getEvaluationRecords}= require('../services/admin')

const addExam = async (req, res) => {
  const { error } = examNameSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
  console.log(`>>>>req.body${JSON.stringify(req.body)}`)

    const examDetails = await createExam(req.body);

    res.status(200).json({ message: 'Exam Name Created successfully', data: examDetails });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getExam = async (req, res) => {
  try {
  console.log(`>>>>req.body${JSON.stringify(req.body)}`)

    const data = await examList();

    res.status(200).json({ message: 'Exam List Fetched successfully', data: data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



const getSubjects = async (req, res) => {
  try {
  console.log(`>>>>req.body${JSON.stringify(req.body)}`)

    const data = await getAllSubjects();

    res.status(200).json({ message: 'Subject List Fetched successfully', data: data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const addRuberics = async (req, res) => {
  const { error } = rubericsNameSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
  console.log(`>>>>req.body${JSON.stringify(req.body)}`)

    const rubericsDetails = await createRuberics(req.body);

    res.status(200).json({ message: 'Ruberics Created successfully', data: rubericsDetails });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getRuberics = async (req, res) => {
  try {
  console.log(`>>>>req.body${JSON.stringify(req.body)}`)

    const data = await rubericsList();

    res.status(200).json({ message: 'Ruberics Fetched successfully', data: data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getClasses = async (req, res) => {
  try {
  console.log(`>>>>req.body${JSON.stringify(req.body)}`)

    const data = await classesList();

    res.status(200).json({ message: 'Classes Fetched successfully', data: data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const createExamDetails = async (req, res) => {
  const { error } = createExamSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    console.log(`>>>>req.body ${JSON.stringify(req.body)}`);

    const examDetails = await registerExam(req.body);

    res.status(200).json({ message: 'Exam scheduled successfully', data: examDetails });
  } catch (err) {
    res.status(400).json({ error: err.message }); // 400 so Postman shows error clearly
  }
};

const getGoldenCode = async (req, res) => {

  const examinationCode=req.query.examination_code
  const classNumber=req.query.class
  const subjectCode=req.query.subject_code
  const studentId=req.query.student_id

  if (!examinationCode) {
    return res.status(400).json({ error: "examinationCode Not found" });
  }
  if (!classNumber) {
    return res.status(400).json({ error: "classNumber Not found" });
  }
  if (!subjectCode) {
    return res.status(400).json({ error: "subjectCode Not found" });
  }
  if (!studentId) {
    return res.status(400).json({ error: "studentId Not found" });
  }
  
  try {

    const code = await getGoldenCodeOfExam(examinationCode,classNumber,subjectCode,studentId);

    res.status(200).json({ message: 'Exam scheduled successfully', data: code });
  } catch (err) {
    res.status(400).json({ error: err.message }); // 400 so Postman shows error clearly
  }
};


const getStudentByClass = async (req, res) => {
  try {
    const classNumber = req.query.class;
    if (!classNumber) {
      return res.status(400).json({ error: "classNumber Not found" });
    }

    const data = await studentListByClass(classNumber);

    res.status(200).json({ 
      message: 'Student Details Fetched successfully', 
      data 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getExamCode = async (req, res) => {
  try {
    const examCodeDetails = await getExamCodeDetails();
    res.status(200).json({ message: 'Exam Code Fetched successfully', data: examCodeDetails });
  } catch (err) {
    res.status(400).json({ error: err.message }); // 400 so Postman shows error clearly
  }
};

const getScheduledExams = async (req, res) => {
  try {
    const examinationCode=req.query.examination_code
    if (!examinationCode) {
      return res.status(400).json({ error: "examinationCode Not found" });
    }
    const examDetails = await getScheduledExamsDetails(examinationCode);
    res.status(200).json({ message: 'Scheduled Exam Fetched successfully', data: examDetails });
  } catch (err) {
    res.status(400).json({ error: err.message }); // 400 so Postman shows error clearly
  }
};

const getScheduledQuestionPapers = async (req, res) => {
  try {
    const goldenCode=req.query.golden_code
    if (!goldenCode) {
      return res.status(400).json({ error: "goldenCode Not found" });
    }
    const examDetails = await getScheduledExamPapers(goldenCode);
    res.status(200).json({ message: 'Scheduled Question Paper Fetched successfully', data: examDetails });
  } catch (err) {
    res.status(400).json({ error: err.message }); // 400 so Postman shows error clearly
  }
};

const updateQuestionPaper = async (req, res) => {
  const { error } = questionPaperUpdateSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
  console.log(`>>>>req.body${JSON.stringify(req.body)}`)

    const questionDetails = await updateQuestionPapers(req.body);

    res.status(200).json({ message: 'Question Paper Updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getStudentResult = async (req, res) => {
  try {
    const studentId=req.query.student_id
    const goldenCode=req.query.golden_code
    if (!goldenCode) {
      return res.status(400).json({ error: "goldenCode Not found" });
    }
    if (!studentId) {
      return res.status(400).json({ error: "studentId Not found" });
    }
    const result = await getStudentSubjectResult(studentId,goldenCode);
    res.status(200).json({ message: 'Student Result Fetched successfully', data: result });
  } catch (err) {
    res.status(400).json({ error: err.message }); // 400 so Postman shows error clearly
  }
};

const addQuestions = async (req, res) => {
  const { error } = questionPaperAddSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
  console.log(`>>>>req.body${JSON.stringify(req.body)}`)

    const questionDetails = await addQuestionPaper(req.body);

    res.status(200).json({ message: 'Question Paper Created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const getEvaluationResults = async (req, res) => {
  const goldenCode =req.query.golden_code
  if (!goldenCode) {
    return res.status(400).json({ error: "goldenCode Not found" });
  }
  try {
    const evaluationResults = await getEvaluationResultsByGoldenCode(goldenCode);
    res.status(200).json({ message: 'Evaluation Result Fetched successfully',evaluationResults });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};




const updateEvaluationResult = async (req, res) => {
  const { error } = evaluationUpdateSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
     await updateEvaluationResults(req.body);
    res.status(200).json({ message: 'Result Updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const saveUserInfo = async (req, res) => {
  const { error } = userInfoSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    console.log(`>>>>req.body${JSON.stringify(req.body)}`);

    const result = await saveUserInformation(req.body);

    res.status(200).json({ message: 'User information saved successfully', data: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getUsers = async (req, res) => {
  try {
    console.log(`>>>>Getting all users`);

    const users = await getAllUsers();

    res.status(200).json({ 
      message: 'Users fetched successfully', 
      data: users 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getEvaluationAnswers = async (req, res) => {
  const { error } = evaluationSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    console.log(`>>>>req.body${JSON.stringify(req.body)}`);

    const result = await getEvaluationRecords(req.body,req.user.id);

    res.status(200).json({ message: 'User information saved successfully', data: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};




















module.exports = { addExam ,getExam,addRuberics,getRuberics,getClasses,createExamDetails,getStudentByClass,getExamCode,getScheduledExams,getScheduledQuestionPapers,updateQuestionPaper,getSubjects,getGoldenCode,getStudentResult,addQuestions,getEvaluationResults,updateEvaluationResult,saveUserInfo,getUsers,getEvaluationAnswers};
