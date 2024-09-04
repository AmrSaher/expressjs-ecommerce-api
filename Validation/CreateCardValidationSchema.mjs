export default {
    cardName: {
        notEmpty: {
            errorMessage: "Must be not empty.",
        },
        isString: {
            errorMessage: "Must be a string.",
        },
    },
    cardNumber: {
        isLength: {
            options: {
                min: 16,
                max: 16,
            },
            errorMessage: "Must contain 16 digits.",
        },
        notEmpty: {
            errorMessage: "Must be not empty.",
        },
        isString: {
            errorMessage: "Must be a string.",
        },
    },
    expiryDate: {
        isLength: {
            options: {
                min: 5,
                max: 5,
            },
            errorMessage: "Please enter a right expiry date.",
        },
        notEmpty: {
            errorMessage: "Must be not empty.",
        },
        isString: {
            errorMessage: "Must be a string.",
        },
    },
};
