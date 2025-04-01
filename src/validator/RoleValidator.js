// validator/RoleValidator.js
const Joi = require('joi');
const httpStatus = require('http-status');
const ApiError = require('../helper/ApiError');

class RoleValidator {
    async createRoleValidator(req, res, next) {
        const schema = Joi.object({
            name: Joi.string().min(3).required(),
            description: Joi.string().optional(),
            status:Joi.bool(),
        });

        const options = {
            abortEarly: false,
            allowUnknown: true,
            stripUnknown: true,
        };

        const { error, value } = schema.validate(req.body, options);

        if (error) {
            const errorMessage = error.details
                .map((details) => details.message)
                .join(', ');
            next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
        } else {
            req.body = value;
            return next();
        }
    }

    async updateRoleValidator(req, res, next) {
        const schema = Joi.object({
            name: Joi.string().min(3).optional(),
            description: Joi.string().optional(),
        });

        const options = {
            abortEarly: false,
            allowUnknown: true,
            stripUnknown: true,
        };

        const { error, value } = schema.validate(req.body, options);

        if (error) {
            const errorMessage = error.details
                .map((details) => details.message)
                .join(', ');
            next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
        } else {
            req.body = value;
            return next();
        }
    }
}

module.exports = RoleValidator;
