"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUpClientSchemeValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const dateValidator = (value, helpers) => {
    const today = new Date();
    const birthDate = new Date(value);
    // Check if the date is in the future
    if (birthDate > today) {
        return helpers.error('date.future');
    }
    // Check if the age is greater than 18
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    if (age < 18) {
        return helpers.error('date.age');
    }
    return value; // Everything is fine
};
const signUpClientSchemeValidation = joi_1.default.object().keys({
    name: joi_1.default.string().required().min(2).max(50).messages({
        'string.base': 'name must be of type string',
        'string.min': 'Invalid name',
        'string.max': 'Invalid name',
    }),
    fatherSurname: joi_1.default.string().required().min(2).max(30).messages({
        'string.base': 'Father Surname must be of type string',
        'string.min': 'Invalid Father Surname',
        'string.max': 'Invalid Father Surname',
    }),
    motherSurname: joi_1.default.string().optional().max(50).messages({
        'string.min': 'Invalid Mother Surname',
        'string.max': 'Invalid Mother Surname',
    }),
    email: joi_1.default.string().email().messages({
        'string.base': 'email must be type email',
        'string.min': 'Invalid email',
        'string.max': 'Invalid email',
    }),
    bornDate: joi_1.default.date().required().custom(dateValidator).messages({
        'date.base': 'BornDate must be of type date',
        'date.future': 'BornDate must not be a future date',
        'date.age': 'Age must be greater than 18',
    }),
});
exports.signUpClientSchemeValidation = signUpClientSchemeValidation;
//# sourceMappingURL=signup.js.map