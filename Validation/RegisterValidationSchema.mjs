export default {
    username: {
        notEmpty: {
            errorMessage: "Must be not empty.",
        },
        isString: {
            errorMessage: "Must be string.",
        },
    },
    email: {
        notEmpty: {
            errorMessage: "Must be not empty.",
        },
        isString: {
            errorMessage: "Must be a string.",
        },
    },
    password: {
        isLength: {
            options: {
                min: 6,
                max: 20,
            },
        },
        notEmpty: {
            errorMessage: "Must be not empty.",
        },
        isString: {
            errorMessage: "Must be a string.",
        },
    },
    password_confirmation: {
        notEmpty: {
            errorMessage: "Must be not empty.",
        },
        isString: {
            errorMessage: "Must be a string.",
        },
    },
};
