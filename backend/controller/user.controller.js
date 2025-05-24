const { sendEmail } = require('../service/email.service.js');
const { getAllUsersService, getUserByEmailOrPhoneNumberService, getUserByIdService, addUserService, deleteUserService, setLockService, updateUserService, getUserQuantityService, updatePasswordService, updateTokenService} = require('../service/user.service.js');

const getAllUsers = async (req, res) => {
  try {
    const users = await getAllUsersService();
    const filteredUsers = users.filter(user => user.id != req.user.id);
    return res.status(200).json({
      status: 'success',
      message: 'Get all users successfully',
      users: filteredUsers,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: error.message,
    });
  }
}

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getUserByIdService(id);
    return res.status(200).json({
      status: 'success',
      message: 'Get user successfully',
      data: user,
    });
  } catch (error) {
    if (error.code === 'USER_NOT_FOUND') {
      return res.status(404).json({
        status: 'fail',
        message: error.message,
      });
    }

    return res.status(500).json({
      status: 'fail',
      message: error.message,
    });
  }
}

const getUserByEmailOrPhoneNumber = async (req, res) => {
  try {
    const { q } = req.query;
    if(!q) {
      return getAllUsers(req, res);
    }
    const user = await getUserByEmailOrPhoneNumberService(q);
    return res.status(200).json({
      status: 'success',
      message: 'Get user successfully',
      data: user,
    });
  }
  catch (error) {
    if (error.code === 'USER_NOT_FOUND') {
      return res.status(404).json({
        status: 'fail',
        message: error.message,
      });
    }

    return res.status(500).json({
      status: 'fail',
      message: error.message,
    });
  }
}

const getUserQuantity = async (req, res) => {
  try {
    const result = await getUserQuantityService();
    res.status(200).json({
      status: 'success',
      data: result
    })
  }
  catch(err) {
    console.error(err);
    res.status(500).json({
      status: 'fail',
      message: 'Internal server error'
    })
  }
}

const addUser = async (req, res) => {
  try {
    const { firstname, lastname, email, phonenumber, role, gender } = req.body;
    // if (!firstname || !lastname || !email || !phonenumber) {
    //   return res.status(400).json({
    //     status: 'fail',
    //     message: 'Missing required fields',
    //   });
    // }

    const newAccount = await addUserService({
      firstname,
      lastname,
      email,
      phonenumber,
      role,
      gender
    });

    const mailOptions = {
      from: 'dangkkhoa10a8@gmail.com',
      to: newAccount.email,
      subject: 'CHÀO MỪNG NHÂN VIÊN MỚI',
      html: `
        <h3>Xin chào ${newAccount.firstname} ${newAccount.lastname},</h3>
        <p>Tài khoản của bạn đã được tạo, bấm vào <a href="localhost:5173/user/login" target="_blank">đây</a> để tiếp tục</p>
        <p><strong>Tên đăng nhập:</strong> ${newAccount.email}</p>
        <p><strong>Mật khẩu: </strong> ${newAccount.password}</p>
        <p style='font-size: 20px; color: red; font-style: italic'>Lưu ý: Hãy đổi mật khẩu ngay khi đăng nhập vào hệ thống. Bạn có thể đổi mật khẩu ở góc phải trên cùng sau khi đã đăng nhập</p>
      `
    }

    sendEmail(email, mailOptions);

    return res.status(201).json({
      status: 'success',
      message: 'User added successfully',
      data: newAccount,
    });

  }
  catch(err) {
    console.error(err);
    if(err.code === 'INPUT_MISSING') {
      return res.status(400).json({
        status: 'fail',
        message: err.message,
      });
    }

    if(err.code === 'ACCOUNT_EXISTS') {
      return res.status(400).json({
        status: 'fail',
        message: err.message,
      });
    }

    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
}

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const userToUpdate = req.body;
    
    if(req.file) {
      console.log(req.file);
      userToUpdate.image = req.file.filename;
    }

    const result = await updateUserService(id, userToUpdate);
    console.log(result);

    return res.status(200).json({
      status: 'success',
      message: 'Cập nhật thông tin thành công',
      data: userToUpdate
    })
  }
  catch(err) {
    console.error("Error: " + err.message);

    if(err.code === 'ERR_INVALID_ARG_TYPE') {
      return res.status(400).json({
        status: 'fail',
        message: 'Có lỗi xảy ra khi cập nhật. Vui lòng thử lại'
      })
    }
    if(err.code === 'ID_MISSING') {
      return res.status(400).json({
        status: 'fail',
        message: err.message
      })
    }

    if(err.code === 'INVALID_INPUT') {
      return res.status(400).json({
        status: 'fail',
        message: err.message
      })
    }

    if(err.code === 'EMAIL_EXISTS') {
      return res.status(409).json({
        status: 'fail',
        message: err.message
      })
    }

    if(err.code === 'PHONENUMBER_EXISTS') {
      return res.status(409).json({
        status: 'fail',
        message: err.message
      })
    }
    

    return res.status(500).json({
      status: 'fail',
      message: err.message || 'Internal server error'
    })
  }
}

const deleteUser = async (req, res) => {
  // Implement delete user logic here
  try {
    const { id } = req.params;
    const userToBeDeleted = await deleteUserService(id);

    return res.status(200).json({
      status: 'success',
      message: 'User deleted successfully',
      data: userToBeDeleted,
    });
  }
  catch(err) {
    if (err.code === 'USER_NOT_FOUND') {
      return res.status(404).json({
        status: 'fail',
        message: err.message,
      });
    }

    //console.error(err);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
}


const setAvailability = async (req, res, locked) => {
  try {
    const { id } = req.params;

    const userAvailability = await setLockService(id, locked);
    return res.status(200).json({
      status: 'success',
      message: 'User availability updated successfully',
      data: userAvailability,
    });

  }
  catch (error) {
    if (error.code === 'USER_NOT_FOUND') {
      return res.status(404).json({
        status: 'fail',
        message: error.message,
      });
    }

    return res.status(500).json({
      status: 'fail',
      message: error.message,
    });
  }
}

const updatePassword = async (req, res) => {
  try {
    const id = req.user.id;
    const { password, newPassword, confirmedPassword } = req.body;
    const result = await updatePasswordService(password, newPassword, confirmedPassword, id);

    return res.status(200).json({
      message: 'Mật khẩu cập nhật thành công'
    })
  }
  catch(err) {
    console.error(err);
    if(err.code === 'USER_NOT_FOUND') {
      return res.status(404).json({
        message: err.message
      })
    }

    if(err.code === 'INVALID_INPUT') {
      return res.status(400).json({
        message: err.message
      })
    }

    if(err.code === 'TOO_SHORT_PASSWROD') {
      return res.status(404).json({
        message: err.message
      })
    }

    if(err.code === 'PASSWORD_CONFIRM_MISSMATCH') {
      return res.status(404).json({
        message: err.message
      })
    }

    if(err.code === 'WRONG_PASSWORD') {
      return res.status(404).json({
        message: err.message
      })
    }

    if(err.code === 'SAME_PASSWORD') {
      return res.status(404).json({
        message: err.message
      })
    }

    return res.status(500).json({
      message: 'Internal server error'
    }) 
  }

}

const updateToken = async (req, res) => {
  const email = req.body;
  const code = await updateTokenService(email);

  const mailOptions = {
      from: 'l00nie@futilesandilata.net',
      to: email,
      subject: 'ĐẶT LẠI MẬT KHẨU',
      html: `
        Mã xác nhận của bạn là: ${code}
      `
    }
  sendEmail(email, mailOptions)
  res.status(200).json({
    message: 'Code sent',
    code: code
  })
}



module.exports = { 
  getAllUsers, 
  getUserById, 
  getUserByEmailOrPhoneNumber, 
  addUser,
  updateUser,
  deleteUser, 
  setAvailability,
  getUserQuantity,
  updatePassword,
  updateToken
};