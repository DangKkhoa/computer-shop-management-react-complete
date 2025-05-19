const jwt = require("jsonwebtoken");
const { loginService } = require("../service/auth.service");
const { getUserById } = require("./user.controller");
const { getUserByIdService } = require("../service/user.service");

const JWT_SECRET = process.env.JWT_SECRET || "khoadeptraivl";

const accounts = [
  {
    firstname: "Nguyen",
    lastname: "Van A",
    phonenumber: "0123456789",
    email: "test@email.com",
    password: "123456",
    role: "ADMIN",
    image: "default.png",
  },
  {
    firstname: "Nguyen",
    lastname: "Van B",
    phonenumber: "0123456788",
    email: "abc@email.com",
    password: "abcxyz",
    role: "SALESPERSON",
    image: "default.png",
  }
]

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(username, password);

    // const account = accounts.find((account) => (account.email === username || account.phonenumber === username) && account.password === password);
    const account = await loginService(username, password);
    

    if(account) {
      // const  data = account;
      
      const payload = {
        id: account.id,
        role: account.role
      }
      
      const token = jwt.sign({
        data: payload
      }, JWT_SECRET, { expiresIn: '30m' });

      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "Strict",
        maxAge: 60 * 15 *  1000,
      })

      res.status(200).json({
        status: "success",
        message: "Login successfully",
        data: account,
        token: token
      })
    }
  }
  catch(err) {
    if(err.code === 'ACCOUNT_NOT_FOUND') {
      return res.status(404).json({
        status: "fail",
        message: "Tài khoản không tồn tại"
      })
    }

    if(err.code === 'INVALID_INPUT') {
      return res.status(400).json({
        status: "fail",
        message: "Hãy nhập các thông tin cần thiết"
      })
    }

    if(err.code === 'INVALID_PASSWORD') {
      return res.status(401).json({
        status: "fail",
        message: "Mật khẩu không chính xác"
      })
    }

    if(err.code === 'ACCOUNT_LOCKED') {
      return res.status(403).json({
        status: "fail",
        message: err.message || "Tài khoản đã bị khóa. Liên hệ admin để biết thêm"
      })
    }
    
    console.error(err);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    })
  }
}

const register = (req, res) => {
  try {
    const { firstname, lastname, email, phonenumber, password, confirmPassword } = req.body;
    if (!firstname || !lastname || !email || !phonenumber || !password || !confirmPassword) {
      return res.status(400).json({
        status: "fail",
        message: "Missing required fields",
      });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({
        status: "fail",
        message: "Password and confirm password do not match",
      });
    }
    const existingAccount = accounts.find((account) => account.email === email || account.phonenumber === phonenumber);
    if (existingAccount) {
      return res.status(400).json({
        status: "fail",
        message: "Email or phone number already exists",
      });
    }
    const newAccount = {
      firstname,
      lastname,
      email,
      phonenumber,
      password,
      role: "CUSTOMER",
    };
    accounts.push(newAccount);
    const data = { ...newAccount, password: undefined };
    const token = jwt.sign({
      data: data
    }, JWT_SECRET, { expiresIn: '1m' });
    res.status(201).json({
      status: "success",
      message: "Register successfully",
      data: data,
      token: token
    });

  }
  catch (err) {
    console.error(err);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
}

const logout = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      maxAge: 0,
    });
    //console.log("token: " + res.cookies);
    res.status(200).json({
      status: "success",
      message: "Logout successfully",
    })
  }
  catch(err) {
    console.error(err);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    })
  }
}

const getMe = async (req, res) => {
  try {
    const user = await getUserByIdService(req.user.id);
    if(user) {
      delete user.password;
      delete user.created_at;
      delete user.is_locked;

      res.status(200).json({
        status: "success",
        message: "Get user successfully",
        user: user,
      })
    }
    
  }
  catch(err) {
    console.error(err);
     res.status(500).json({
      status: "fail",
      message: "Internal server error",
      user: user,
    })
  }
  
}

module.exports = { login, register, getMe, logout };