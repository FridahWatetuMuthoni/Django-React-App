import * as  yup from 'yup';
//password
//minimum 5 charaters,1 uppercase letter, 1 lowercase letter, 1 numeric digit
//const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

//SignUp Form
export const registerSchema = yup.object().shape({
    username: yup.string().max(15, 'Must be 15 charaters or less').required(),
    email: yup.string().email('Please Enter a Valid Email').required(),
    gender: yup.string('Please choose your gender').required(),
    phone_number: yup.number().required(),
    password1:yup.string().min(5,'You password must be more than 5 characters').required(),
    //password1: yup.string().min(5).matches(passwordRules, "message:'Your password has to have a minimum 5 charaters,1 uppercase letter, 1 lowercase letter, 1 numeric digit'").required(),
    password2: yup.string().oneOf([yup.ref('password1'), null], 'Passwords Must Match').required()
})

//Password Reset Form
export const resetSchema = yup.object().shape({
    password1:yup.string().min(5,'You password must be more than 5 characters').required(),
    //password1: yup.string().min(5).matches(passwordRules, "message:'Your password has to have a minimum 5 charaters,1 uppercase letter, 1 lowercase letter, 1 numeric digit'").required(),
    password2: yup.string().oneOf([yup.ref('password1'), null], 'Passwords Must Match').required()
})
