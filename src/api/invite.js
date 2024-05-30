// invite.js

const express = require('express');
const router = express.Router();

// 데이터베이스나 다른 스토리지에서 사용자 정보를 관리하는 로직을 포함할 수 있습니다.
const users = require('./users'); // 가상의 사용자 모듈

// 초대 토큰으로 사용자 정보를 가져오는 API 엔드포인트
router.get('/:inviteToken', (req, res) => {
    const { inviteToken } = req.params;
    // 데이터베이스에서 inviteToken을 검색하여 해당하는 사용자 정보를 찾습니다.
    const invitedUser = users.findUserByInviteToken(inviteToken);

    if (invitedUser) {
        res.json({
            email: invitedUser.email,
            name: invitedUser.name,
            status: 'success'
        });
    } else {
        res.status(404).json({
            message: 'Invalid invite token',
            status: 'error'
        });
    }
});

module.exports = router;
