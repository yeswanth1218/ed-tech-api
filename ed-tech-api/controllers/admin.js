

const { examNameSchema ,rubericsNameSchema,createExamSchema,questionPaperUpdateSchema} = require('../validations/admin');
const {createExam,examList,createRuberics,rubericsList,classesList,registerExam,studentListByClass,getExamCodeDetails,getScheduledExamsDetails,getScheduledExamPapers,updateQuestionPapers,getAllSubjects,getGoldenCodeOfExam,getStudentSubjectResult}= require('../services/admin')

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
  if (!examinationCode) {
    return res.status(400).json({ error: "examinationCode Not found" });
  }
  if (!classNumber) {
    return res.status(400).json({ error: "classNumber Not found" });
  }
  if (!subjectCode) {
    return res.status(400).json({ error: "subjectCode Not found" });
  }
  try {

    const code = await getGoldenCodeOfExam(examinationCode,classNumber,subjectCode);

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
    const examDetailId=req.query.exam_detail_id
    const examDetails = await getScheduledExamPapers(examDetailId);
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
    const result = await getStudentSubjectResult(studentId,goldenCode);
    res.status(200).json({ message: 'Student Result Fetched successfully', data: result });
  } catch (err) {
    res.status(400).json({ error: err.message }); // 400 so Postman shows error clearly
  }
};


















module.exports = { addExam ,getExam,addRuberics,getRuberics,getClasses,createExamDetails,getStudentByClass,getExamCode,getScheduledExams,getScheduledQuestionPapers,updateQuestionPaper,getSubjects,getGoldenCode,getStudentResult};
