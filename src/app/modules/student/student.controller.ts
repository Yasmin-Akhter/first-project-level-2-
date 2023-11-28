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
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Students can not be retrieved;',
      data: err,
    });
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
    // if (result) {
    //   res.status(200).json({
    //     success: true,
    //     message: 'students retrieved successfully',
    //     data: result,
    //   });
    // }
    // res.json({
    //   success: false,
    //   message: 'student does not exist',
    // });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Student can not be retrieved;',
      data: err,
    });
  }
};
const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await studentService.deleteStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: 'student deleted successfully',
      data: result,
    });

    // if (result.modifiedCount == 0) {
    //   res.status(500).json({
    //     success: false,
    //     message: 'students does not exists',
    //   });
    // }
    // res.status(200).json({
    //   success: true,
    //   message: 'student deleted successfully',
    // });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Student can not be deleted;',
      data: err,
    });
  }
};
export const studentController = {
  createStudent,
  getAllStudents,
  getSingleStudent,
  deleteStudent,
};
