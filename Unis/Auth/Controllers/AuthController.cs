
using Auth.Common;
using Auth.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Model.Dao;
using Model.EF;
using System;

namespace Auth.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {

        public AuthController()
        {

        }

        [AllowAnonymous]
        [HttpPost("Login")]
        public IActionResult Login([FromBody] User user)
        {
            var userDao = new UserDao();
            string key = "this is my custom Secret key for authnetication";

            AuthenticateResponse authenticateResponse = userDao.Login(user.UserName, Encryptor.MD5Hash(user.Password), key);

            //AuthenticateResponse authenticateResponse = _jwtAuthenticationManager.Login(user.UserName, user.Password);
            if (authenticateResponse == null || string.IsNullOrEmpty(authenticateResponse.Token))
            {
                return Unauthorized();
            }
            return Ok(authenticateResponse);
        }

        [AllowAnonymous]
        [HttpPost("Register")]
        public IActionResult Register(RegisterModel model)
        {

            var dao = new UserDao();
            if (dao.CheckUserName(model.UserName))
            {
                return Ok("Tài khoản đã tồn tại");
            }
            else
            {
                var user = new User();
                user.UserName = model.UserName;

                user.Password = Encryptor.MD5Hash(model.Password);
                user.IsActive = true;
                user.CreatedDate = DateTime.Now;
                user.ModifiedDate = DateTime.Now;

                var result = dao.Insert(user);
                if (result > 0)
                {
                    model = new RegisterModel();
                    return Ok("Đăng ký thành công.");
                }
                else
                {
                    return Ok("Đăng ký không thành công.");
                }
            }
            return Ok();
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(new string[] { "test", "ok" });
        }
    }
}
