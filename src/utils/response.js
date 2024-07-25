class Response {
  constructor(data = null, message = null) {
    this.data = data;
    this.message = message;
  }

  success(res) {
    return res.status(200).json({
      success: true,
      data: this.data,
      message: this.message ?? "İşlem Başarılı",
    });
  }
  created(res) {
    return res.status(201).json({
      success: true,
      data: this.data,
      message: this.message ?? "İşlem Başarılı",
    });
  }
  empty(res) {
    return res.status(204).json({
      success: true,
      data: this.data,
      message: this.message ?? "Boş",
    });
  }
}

module.exports = Response;
