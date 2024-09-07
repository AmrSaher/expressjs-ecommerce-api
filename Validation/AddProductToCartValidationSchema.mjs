export default {
    product: {
        isString: {
            errorMessage: "Must be a string.",
        },
        notEmpty: {
            errorMessage: "Must be not empty.",
        },
    },
    quantity: {
        isNumber: {
            options: {
                min: 1,
            },
            errorMessage: "Must be a number",
        },
        notEmpty: {
            errorMessage: "Must be not empty.",
        },
    },
};
