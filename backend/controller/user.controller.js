const { getAllUsersService, getUserByEmailOrPhoneNumberService, getUserByIdService, addUserService, deleteUserService, setLockService, updateUserService, getUserQuantityService} = require('../service/user.service.js');

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
    if (!firstname || !lastname || !email || !phonenumber) {
      return res.status(400).json({
        status: 'fail',
        message: 'Missing required fields',
      });
    }

    const result = await addUserService({
      firstname,
      lastname,
      email,
      phonenumber,
      role,
      gender
    });

    return res.status(201).json({
      status: 'success',
      message: 'User added successfully',
      data: result,
    });

  }
  catch(err) {
    console.error(err);
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
    console.error("Error: " + err.code);

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
      message: 'Internal server error'
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

module.exports = { 
  getAllUsers, 
  getUserById, 
  getUserByEmailOrPhoneNumber, 
  addUser,
  updateUser,
  deleteUser, 
  setAvailability,
  getUserQuantity 
};