

const { examNameSchema ,rubericsNameSchema,createExamSchema} = require('../validations/admin');
const {createExam,examList,createRuberics,rubericsList,classesList,registerExam,studentListByClass,getExamCodeDetails}= require('../services/admin')

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

const getStudentByClass = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ error: "Class ID Not found" });
    }

    const data = await studentListByClass(id);

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














module.exports = { addExam ,getExam,addRuberics,getRuberics,getClasses,createExamDetails,getStudentByClass,getExamCode};
