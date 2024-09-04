export default {
    name: {
        notEmpty: {
            errorMessage: "Must be not empty.",
        },
        isString: {
            errorMessage: "Must be a string.",
        },
    },
    description: {
        notEmpty: {
            errorMessage: "Must be not empty.",
        },
        isString: {
            errorMessage: "Must be a string.",
        },
    },
    price: {
        notEmpty: {
            errorMessage: "Must be not empty.",
        },
        isNumber: {
            errorMessage: "Must be a number.",
        },
    },
    brand: {
        isString: {
            errorMessage: "Must be a string.",
        },
    },
    stock: {
        isNumber: {
            errorMessage: "Must be a number.",
        },
        notEmpty: {
            errorMessage: "Must be not empty.",
        },
    },
    images: {
        isArray: {
            errorMessage: "Must be an array of images.",
        },
        notEmpty: {
            errorMessage: "Must be not empty.",
        },
    },
};
