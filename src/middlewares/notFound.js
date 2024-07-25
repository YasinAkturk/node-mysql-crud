const notFound = (req, res) =>
    res.status(404).send("Url bulunamadı!");

module.exports = notFound