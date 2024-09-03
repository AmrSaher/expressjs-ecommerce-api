export default (req, res, next) => {
    if (!req.user.isAdmin)
        return res.status(403).send({ msg: "Access denied. Admins only." });

    next();
};
