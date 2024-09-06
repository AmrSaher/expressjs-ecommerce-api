export default {
    firstName: {
        in: ["body"],
        isString: {
            errorMessage: "Must be a string.",
        },
    },
    lastName: {
        in: ["body"],
        isString: {
            errorMessage: "Must be a string.",
        },
    },
    birthDate: {
        in: ["body"],
        // isDate: {
        //     errorMessage: "Must be a date.",
        // },
        isString: {
            errorMessage: "Must be a string.",
        },
    },
    // image: {
    //     notEmpty: {
    //         errorMessage: "Must be not empty.",
    //     },
    // },
};
