import { z } from 'zod';

// Define sub-schemas for reusability
const nameSchema = z.object({
  firstName: z
    .string({ required_error: 'First Name is required' })
    .max(20, { message: 'First Name can not be more than 20 characters' }),
  middleName: z
    .string()
    .max(20, { message: 'Middle Name can not be more than 20 characters' }),
  lastName: z
    .string({ required_error: 'Last Name is required' })
    .max(20, { message: 'Last Name can not be more than 20 characters' }),
});

const guardianValidateSchema = z.object({
  fatherName: z.string({ required_error: 'Father Name is required' }),
  fatherOccupation: z.string({
    required_error: 'Father occupation is required',
  }),
  fatherContactNo: z.string({
    required_error: "Father's contact no is required",
  }),
  motherName: z.string({ required_error: 'Mother Name is required' }),
  motherOccupation: z.string({
    required_error: 'Mother occupation is required',
  }),
  motherContactNo: z.string({
    required_error: 'Mother contact no is required',
  }),
});

const localGuardianValidateSchema = z.object({
  name: z.string({ required_error: 'Name is required' }),
  occupation: z.string({ required_error: 'Occupation is required' }),
  contactNo: z.string({ required_error: 'Contact no is required' }),
  address: z.string({ required_error: 'Address is required' }),
});

// Define the main student schema using the sub-schemas
export const studentValidateSchema = z.object({
  id: z.string({ required_error: 'Id is required' }),
  password: z.string({ required_error: 'Password is required' }),
  name: nameSchema,
  gender: z.enum(['male', 'female', 'other'], {
    required_error: 'Gender is required',
  }),
  dateOfBirth: z.string(),
  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Invalid email address' }),
  contactNo: z.string({ required_error: 'Contact number is required' }),
  emergencyContactNo: z.string({
    required_error: 'Emergency contact number is required',
  }),
  bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
  presentAddress: z.string({ required_error: 'Present Address is required' }),
  permanentAddress: z.string({
    required_error: 'Permanent Address is required',
  }),
  guardian: guardianValidateSchema,
  localGuardian: localGuardianValidateSchema,
  profileImg: z.string(),
  isActive: z.enum(['active', 'blocked']).default('active'),
  isDeleted: z.boolean(),
});

export default studentValidateSchema;
