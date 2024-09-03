export default (req, res, next) => {
    if (
        (req.headers.authorization &&
            req.headers.authorization.split(" ")[1]) ||
        req.user
    )
        return res.status(403).send({
            msg: "You are already logged in and cannot register again.",
        });

    next();
};
