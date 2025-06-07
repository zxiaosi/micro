package com.zxiaosi.user;

import cn.dev33.satoken.secure.SaSecureUtil;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCrypt;

@SpringBootTest
class UserApplicationTests {

    @Test
    void contextLoads() {
        // 定义明文
        String text = "123456";

        // md5加密 (前端使用md5加密)
        String md5 = SaSecureUtil.md5(text);
        System.out.println("md5加密：" + md5); // e10adc3949ba59abbe56e057f20f883e

        // BCrypt加密 (后端使用BCrypt二次加密)
        String pw_hash = BCrypt.hashpw(md5, BCrypt.gensalt());
        System.out.println("加密后：" + pw_hash);

        boolean checkpw = BCrypt.checkpw(md5, pw_hash);
        System.out.println("验证：" + checkpw);
    }

}
