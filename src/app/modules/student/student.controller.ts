import { Request, Response } from 'express';
import { studentService } from './student.service';
import studentValidateSchema from './student.validationSchema';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;
    const zodParsedData = studentValidateSchema.parse(studentData);

    const result = await studentService.createStudentIntoDB(zodParsedData);
    res.status(200).json({
      success: true,
      message: 'student created successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      data: err,
    });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await studentService.getAllStudentsFromBD();
    res.status(200).json({
      success: true,
      message: 'students retrieved successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};
const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await studentService.getSingleStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: 'students retrieved successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};
export const studentController = {
  createStudent,
  getAllStudents,
  getSingleStudent,
};
