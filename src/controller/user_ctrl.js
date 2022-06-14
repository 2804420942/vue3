import db from '../db/index.js'

export async function getAllUsers(req, res) {
  try {
    const [rows] = await db.query('select account, name, password, xxx from account');
    res.send({
      status: 0,
      message: '获取用户列表成功',
      data: rows,
    });
  } catch(err) {
    res.send({
      status: 1,
      message: '获取用户列表失败',
      desc: err.message,
    });
  }
  
}
