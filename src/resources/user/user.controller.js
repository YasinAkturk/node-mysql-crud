const db = require("../../db/connection");
const APIError = require("../../utils/errors");
const Response = require("../../utils/response");
const nodemailer = require("nodemailer");
/* const Mailgen = require("mailgen"); */

const mailer = async function (req, res, next) {
  //TEST MAİL GÖNDERME İŞLEMİ BAŞLANGIÇ
  /* let testAccount = await nodemailer.createTestAccount();
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });
  let message = {
    from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
    to: "bar@example.com, baz@example.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Şifre değiştirme kodunuz: 123456753", // plain text body
    html: "<b>Şifre değiştirme kodunuz: 123456753</b>", // html body
  };
  transporter
    .sendMail(message)
    .then((info) => {
      return res
        .status(201)
        .json({
          message: "başarılı",
          info: info.messageId,
          preview: nodemailer.getTestMessageUrl(info),
        });
    })
    .catch((err) => {
      return res.status(201).json({ err });
    }); */
  //TEST MAİL GÖNDERME İŞLEMİ BİTİŞ
  const {email} = req.body
  console.log("🚀 ~ mailer ~ email:", email)
  //Google mail ayarları
  const config = {
    service: "gmail",
    auth: {
      user: "", //email
      pass: "", //app password
    },
  };
  let transporter = nodemailer.createTransport(config);

  /* let MailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Mailgen",
      link: "https://mailgen.js/",
    },
  });
  let response = {
    body: {
      name: "Name",
      intro: "Intro",
      table: {
        data: [
          {
            item: "Başlık",
            description: "açıklama",
            price: "10₺",
          },
        ],
        outro: "outro",
      },
    },
  }; 
  let mail = MailGenerator.generate(response);*/
  let message = {
    from: "", // config email
    to: email, // list of receivers
    subject: "Nodejs Mail Gönderme Denemesi", // Subject line
    html: '<b>Selam Bebişkom</b>', // html body
  };
  transporter
    .sendMail(message)
    .then(() => {
      return res
        .status(201)
        .json({
          message: "başarılı",
        });
    })
    .catch((err) => {
      return res.status(201).json({ err });
    });
};

async function getUser(id) {
  let sql = "SELECT * FROM user WHERE id = ?";
  const [rows] = await db.query(sql, [id]);
  return rows[0];
}

const getAllUser = async function (req, res, next) {
  let sql = "SELECT * from user";
  const [rows] = await db.query(sql);
  if (!rows.length)
    return new Response(rows, "Kullanıcı Bulunamadı").empty(res);

  return new Response(rows).success(res);
};

const getUserById = async function (req, res, next) {
  const { id } = req.params;

  const user = await getUser(id);
  if (!user) throw new APIError("Kullanıcı bulunamadı!", 404);

  return new Response(user).success(res);
};

const createUser = async function (req, res, next) {
  const { name, surname, age } = req.body;
  if (!name || !surname || !age)
    throw new APIError("Doldurulmamış alan bulunmaktadır", 400);

  let sql =
    "INSERT INTO user (id, name, surname, age) VALUES (UUID(), ?, ?, ?)";
  await db.query(sql, [name, surname, age]);
  return new Response(null, "Kullanıcı eklendi").created(res);
};

const updateUser = async function (req, res, next) {
  const { id, name, surname, age } = req.body;

  if (!id || !name || !surname || !age)
    throw new APIError("Doldurulmamış alan bulunmaktadır", 400);

  const user = await getUser(id);
  if (!user) throw new APIError("Kullanıcı bulunamadı!", 404);

  let sql = "UPDATE user SET name = ? , surname = ? , age = ? WHERE id = ?";
  await db.query(sql, [name, surname, age, id]);

  return new Response(null, "Kullanıcı güncellendi").created(res);
};

const deleteUser = async function (req, res, next) {
  const { id } = req.params;

  if (!id) throw new APIError("ID gereklidir!", 400);

  const user = await getUser(id);
  if (!user) throw new APIError("Kullanıcı bulunamadı!", 404);

  let sql = "DELETE FROM user WHERE id = ?";
  await db.query(sql, [id]);

  return new Response(null, "Kullanıcı silindi").success(res);
};

module.exports = {
  mailer,
  getAllUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
