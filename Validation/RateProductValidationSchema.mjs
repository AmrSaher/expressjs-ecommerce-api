export default {
    rating: {
        isNumber: {
            options: {
                min: 1,
                max: 5,
            },
            errorMessage: "Must be a number between 1 and 5.",
        },
        notEmpty: {
            errorMessage: "Must be not empty.",
        },
    },
    review: {
        isString: {
            errorMessage: "Must be a string.",
        },
        isLength: {
            options: {
                min: 1,
                max: 250,
            },
            errorMessage: "Must be between 1-250 characters.",
        },
        optional: true,
    },
};
