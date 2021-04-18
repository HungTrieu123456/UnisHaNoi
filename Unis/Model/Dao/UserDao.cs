using Microsoft.IdentityModel.Tokens;
using Model.EF;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Model.Dao
{
    public class UserDao
    {
        UnisContext db = null;

        public UserDao()
        {
            db = new UnisContext();
        }

        public AuthenticateResponse Login(string userName, string password, string key)
        {
            var user = db.Users.SingleOrDefault(x => x.UserName == userName);
            if (user == null)
            {
                return null;
            }
            if (user.IsActive != true)
            {
                return null;
            }
            else
            {
                if (user.Password != password)
                    return null;
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenKey = Encoding.ASCII.GetBytes(key);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim(ClaimTypes.Name, userName) }),
                Expires = DateTime.UtcNow.AddDays(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(tokenKey), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return new AuthenticateResponse(new User()
            {
                UserName = userName,
                Password = password
            }, tokenHandler.WriteToken(token));
        }

        public int Insert(User entity)
        {
            var user = db.Users.SingleOrDefault(x => x.UserName == entity.UserName);
            if (user != null)
            {
                return -100;
            }

            db.Users.Add(entity);
            db.SaveChanges();
            return entity.Id;
        }

        public bool CheckUserName(string userName)
        {
            return db.Users.Count(x => x.UserName == userName) > 0;
        }
    }
}
