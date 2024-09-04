export default {
    firstName: {
        notEmpty: {
            errorMessage: "Must be not empty.",
        },
        isString: {
            errorMessage: "Must be a string.",
        },
    },
    lastName: {
        notEmpty: {
            errorMessage: "Must be not empty.",
        },
        isString: {
            errorMessage: "Must be a string.",
        },
    },
    streetAddress: {
        notEmpty: {
            errorMessage: "Must be not empty.",
        },
        isString: {
            errorMessage: "Must be a string.",
        },
    },
    city: {
        notEmpty: {
            errorMessage: "Must be not empty.",
        },
        isString: {
            errorMessage: "Must be a string.",
        },
    },
    state: {
        notEmpty: {
            errorMessage: "Must be not empty.",
        },
        isString: {
            errorMessage: "Must be a string.",
        },
    },
    postalCode: {
        notEmpty: {
            errorMessage: "Must be not empty.",
        },
        isString: {
            errorMessage: "Must be a string.",
        },
    },
    country: {
        notEmpty: {
            errorMessage: "Must be not empty.",
        },
        isString: {
            errorMessage: "Must be a string.",
        },
    },
    phoneNumber: {
        notEmpty: {
            errorMessage: "Must be not empty.",
        },
        isString: {
            errorMessage: "Must be a string.",
        },
    },
    addressType: {
        isString: {
            errorMessage: "Must be a string.",
        },
    },
    isDefault: {
        isBoolean: {
            errorMessage: "Must be a boolean.",
        },
    },
};
