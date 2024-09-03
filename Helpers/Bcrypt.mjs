import bcrypt from "bcrypt";

export const hashPassword = (password) => {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(password, salt);
};

export const comparePassword = (plain, hashed) =>
    bcrypt.compareSync(plain, hashed);
