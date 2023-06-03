using Lasmart_TestTask.Data;
using Lasmart_TestTask.Data.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Lasmart_TestTask.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentsController : ControllerBase
    {
        private readonly ApiContext _context;

        public CommentsController(ApiContext context)
        {
            _context = context;
        }

        [HttpPost]
        public JsonResult CreateComment(Comment comment)
        {
            if (comment.Id == 0)
            {
                _context.Comments.Add(comment);
            }
            else
            {
                Comment commentInDb = _context.Comments.Find(comment.Id);

                if (commentInDb == null)
                {
                    return new JsonResult(NotFound());
                }
            }

            _context.SaveChanges();

            return new JsonResult(Ok(comment));
        }

        [HttpGet("{dotId}")]
        public JsonResult GetAllByDot(int dotId)
        {
            List<Comment> result = _context.Comments.Where(c => c.DotId == dotId).ToList();

            return new JsonResult(Ok(result));
        }

        [HttpDelete("{dotId}")]
        public JsonResult DeleteComment(int dotId)
        {
            List<Comment> result = _context.Comments.Where(c => c.DotId == dotId).ToList();

            foreach (Comment comment in result)
            {
                _context.Comments.Remove(comment);
                _context.SaveChanges();
            }  

            return new JsonResult(NoContent());
        }
    }
}
