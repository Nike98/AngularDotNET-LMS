using API.Entity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LibraryController : ControllerBase
    {
        public LibraryController(Context context)
        {
            Context = context;
        }

        public Context Context { get; }

        [HttpPost]
        public ActionResult Register(User user)
        {
            user.AccountStatus = AccountStatus.ACTIVE;
            user.UserType = UserType.STUDENT;
            user.CreatedOn = DateTime.Now;

            Context.Users.Add(user);
            Context.SaveChanges();

            return Ok(@"Thank you for registering.
                        Your Account has been sent for approval.
                        Once it is Approved, you will get an email.");
        }
    }
}
