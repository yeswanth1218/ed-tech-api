const { User,Student } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const sequelize = require('../config/db');


const login = async (username, password, res) => {
  const user = await User.findOne({ where: { username } });
  if (!user) throw new Error('User not found');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid password');
  let data={id: user.id, role: user.role ,username:user.username,student_id:'',class:''}

  if(user.role==="STUDENT"){
    const studentDetails = await Student.findOne({ where: { user_id:user.id } });
    if(!studentDetails){
      throw new Error('User not found');
    }
    data={...data,student_id:studentDetails.student_id,class:studentDetails.class}
  }



  const token = jwt.sign(data, process.env.JWT_SECRET, {
    expiresIn: '5h',
  });



  return {
    message: 'Login successful',
    user: { ...data ,token:token},
  };
};

const register = async (username, password, role, classNumber,name) => {
  const existingUser = await User.findOne({ where: { username } });
  if (existingUser) throw new Error("Username already exists");

  const hashedPassword = await bcrypt.hash(password, 10);

  // ✅ For STUDENT use transaction
  if (role === "STUDENT") {
    return await sequelize.transaction(async (t) => {
      const newUser = await User.create(
        {
          username,
          password: hashedPassword,
          role,
          class: classNumber ? classNumber : null,
          name:name
        },
        { transaction: t }
      );

      // find last roll number for that class
      const lastStudent = await Student.findOne({
        where: { class: classNumber },
        order: [["created_at", "DESC"]],
        transaction: t,
      });

      let nextRollNo = 1;
      if (lastStudent) {
        const lastRoll = parseInt(
          lastStudent.student_id.split("-")[1],
          10
        );
        nextRollNo = lastRoll + 1;
      }

      const studentId = `${classNumber}-${nextRollNo}`;

      await Student.create(
        {
          user_id: newUser.id,
          student_id: studentId,
          class: classNumber,
          dob: null,
          admission_date: null,
          parent_name: null,
          address: null,
          name:name
        },
        { transaction: t }
      );

      return {
        id: newUser.id,
        username: newUser.username,
        role: newUser.role,
      };
    });
  }

  // ✅ For NON-STUDENT roles (no transaction)
  const newUser = await User.create({
    username,
    password: hashedPassword,
    role,
    class: classNumber ? classNumber : null,
    name:name
  });

  return { id: newUser.id, username: newUser.username, role: newUser.role };
};



module.exports = { login, register };
