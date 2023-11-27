import { Model } from 'mongoose';

export type TStudentName = {
  firstName: string;
  middleName: string;
  lastName: string;
};
export type TStudentGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};
export type TLocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};
export type TStudent = {
  id: string;
  name: TStudentName;
  gender: 'male' | 'female' | 'other';
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  guardian: TStudentGuardian;
  localGuardian: TLocalGuardian;
  profileImg?: string;
  isActive: 'active' | 'blocked';
};
//custom statics
export interface studentModel extends Model<TStudent> {
  isExistsStudent(id: string): Promise<TStudent | null>;
}

//custom instance method
// export type StudentMethods = {
//   isUserExists(id: string): Promise<TStudent | null>; //this is an async function which will return an student type promise;
// };
// export type studentModel = Model<
//   TStudent,
//   Record<string, never>,
//   StudentMethods
// >;
