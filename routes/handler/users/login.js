const bcrypt = require('bcrypt');
const { User } = require('../../../models');
const Validator = require('fastest-validator');
const v = new Validator;

module.exports = async (req, res) => {
    // Menetapkan input schema untuk login
    const schema = {
        email: 'email|empty:false',
        password: 'string|min:6',
    }

    /*
    * Memvalidasi panjang input yang diberikan pada form,
    * apakah sesuai denga schema atau tidak.
    */
    const validate = v.validate(req.body, schema);
    if(validate.length) {
        return res.status(400).json({
            status: 'error',
            message: validate
        });
    }

    // Cek apakah email terdaftar di database atau tidak
    const user = await User.findOne({
        where: { email: req.body.email }
    });

    if(!user) {
        return res.status(404).json({
            status: 'error',
            message: 'User not found'
        });
    }

    // Cek apakah password sama dengan yg terdaftar atau tidak
    const isValidPassword = await bcrypt.compare(req.body.password, user.password);
    if(!isValidPassword) {
        return res.status(404).json({
            status: 'error',
            message: 'User not found'
        });
    }


    // Respon jika validasi berhasil
    res.json({
        status: 'success',
        data: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
            profession: user.profession
        }
    });
}