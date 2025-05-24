const nodemailer = require('nodemailer');

const sendEmail = async (toEmail, mailOptions) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'dangkkhoa10a8@gmail.com',
      pass: 'mtjf dgjo vdwr zxoo',
    }
  })

  // const mailOptions = {
  //   from: 'dangkkhoa10a8@gmail.com',
  //   to: toEmail,
  //   subject: 'Xác nhận đơn hàng của bạn',
  //   html: `
  //     <h3>Xin chào ${order.name},</h3>
  //     <p>Bạn vừa đặt hàng thành công trên hệ thống của chúng tôi.</p>
  //     <p><strong>Mã đơn hàng:</strong> ${order.id}</p>
  //     <p><strong>Số lượng:</strong> ${order.total_quantity}</p>
  //     <p><strong>Tổng tiền:</strong> ${order.total_price.toLocaleString()} VND</p>
  //     <p><strong>Phương thức thanh toán:</strong> ${order.payment_method}</p>
  //     <br>
  //     <p>Chúng tôi sẽ xử lý đơn hàng và liên hệ lại sớm nhất.</p>
  //     <p>Cảm ơn bạn đã tin tưởng.</p>
  //   `
  // }

  try {
    await transporter.sendMail(mailOptions);
    console.log('Đã gửi email đến:', toEmail);
  } 
  catch (err) {
    console.error('Gửi email thất bại:', err);
  }
}


module.exports = {
  sendEmail
}