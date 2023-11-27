import { TStudent } from './student.interface';
import { Student } from './student.model';

const createStudentIntoDB = async (studentData: TStudent) => {
  //custom static
  if (await Student.isExistsStudent(studentData.id)) {
    throw new Error('This student is already exist');
  }

  const result = await Student.create(studentData);

  //custom instance method
  // const student = new Student(studentData);
  // if (await student.isUserExists(studentData.id)) {
  //   throw Error('User is already exists');
  // }
  // const result = await student.save();
  return result;
};

const getAllStudentsFromBD = async () => {
  const result = await Student.find();
  return result;
};
const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id });
  return result;
};

export const studentService = {
  createStudentIntoDB,
  getAllStudentsFromBD,
  getSingleStudentFromDB,
};
