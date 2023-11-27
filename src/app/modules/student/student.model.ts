import { Schema, model } from 'mongoose';
import {
  // StudentMethods,
  TLocalGuardian,
  TStudent,
  TStudentGuardian,
  TStudentName,
  studentModel,
} from './student.interface';

const nameSchema = new Schema<TStudentName>({
  firstName: {
    type: String,
    required: [true, 'First Name is required'],
    trim: true,
    maxlength: [20, 'First Name can not be more then 20 character'],
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'Last Name is required'],
    maxlength: [20, 'First Name can not be more then 20 character'],
  },
});
const guardianSchema = new Schema<TStudentGuardian>({
  fatherName: {
    type: String,
    trim: true,
    required: [true, 'Father Name is required'],
  },
  fatherOccupation: {
    type: String,
    trim: true,
    required: [true, 'Father occupation is required'],
  },
  fatherContactNo: {
    type: String,
    trim: true,
    required: [true, "Father's contact no is required"],
  },
  motherName: {
    type: String,
    trim: true,
    required: [true, 'Mother Name is required'],
  },
  motherOccupation: {
    type: String,
    trim: true,
    required: [true, 'Mother occupation is required'],
  },
  motherContactNo: {
    type: String,
    trim: true,
    required: [true, 'Mother contact no is required'],
  },
});
const LocalGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    trim: true,
    required: [true, 'Name is required'],
  },
  occupation: {
    type: String,
    trim: true,
    required: [true, 'Occupation is required'],
  },
  contactNo: {
    type: String,
    trim: true,
    required: [true, 'Contact no is required'],
  },
  address: {
    type: String,
    trim: true,
    required: [true, 'address is required'],
  },
});
//custom instance methods
// const studentSchema = new Schema<TStudent, studentModel, StudentMethods>({
//custom static
const studentSchema = new Schema<TStudent, studentModel>({
  id: {
    type: String,
    required: [true, 'Id is required'],
    unique: true,
  },
  name: {
    type: nameSchema,
    required: [true, 'Name is required'],
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'other'],
      message: '{VALUE} is not valid gender',
    },
    required: [true, 'gender is required'],
  },
  dateOfBirth: { type: String },
  email: {
    type: String,
    required: [true, 'email is required'],
    unique: true,
  },
  contactNo: {
    type: String,
    required: [true, 'Contact number is required'],
  },
  emergencyContactNo: {
    type: String,
    required: [true, 'Id is required'],
  },
  bloodGroup: {
    type: String,
    enum: {
      values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      message: '{VALUE} is not a valid blood group',
    },
  },
  presentAddress: {
    type: String,
    required: [true, 'Present Address is required'],
  },
  permanentAddress: {
    type: String,
    required: [true, 'Present Address is required'],
  },
  guardian: {
    type: guardianSchema,
    required: [true, 'Guardian info is required'],
  },
  localGuardian: {
    type: LocalGuardianSchema,
    required: [true, 'Local Guardian info is required'],
  },
  profileImg: { type: String },
  isActive: {
    type: String,
    enum: {
      values: ['active', 'blocked'],
      message: '{VALUE} is not a valid status',
    },
    default: 'active',
  },
});
//custom static
studentSchema.statics.isExistsStudent = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

//custom instance method
// studentSchema.methods.isUserExists = async function (id: string) {
//   const existingUser = await Student.findOne({ id });
//   return existingUser;
// };

export const Student = model<TStudent, studentModel>('Student', studentSchema);
