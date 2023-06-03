using Lasmart_TestTask.Data;
using Lasmart_TestTask.Data.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Lasmart_TestTask.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DotsController : ControllerBase
    {
        private readonly ApiContext _context;

        public DotsController(ApiContext context)
        {
            _context = context;
        }

        [HttpPost]
        public JsonResult CreateDot(Dot dot)
        {
            if (dot.Id == 0)
            {
                _context.Dots.Add(dot);
            }
            else
            {
                Dot dotInDb = _context.Dots.Find(dot.Id);

                if (dotInDb == null)
                {
                    return new JsonResult(NotFound());
                }
            }

            _context.SaveChanges();

            return new JsonResult(Ok(dot));
        }

        [HttpGet("{id}")]
        public JsonResult GetDot(int id)
        {
            Dot result = _context.Dots.Find(id);

            if (result == null)
            {
                return new JsonResult(NotFound());
            }

            return new JsonResult(Ok(result));
        }

        [HttpGet]
        public JsonResult GetAll()
        {
            List<Dot> result = _context.Dots.ToList();

            return new JsonResult(Ok(result));
        }

        [HttpDelete]
        public JsonResult DeleteDot(int id)
        {
            Dot dot = _context.Dots.Find(id);

            if (dot == null)
            {
                return new JsonResult(NotFound());
            }

            _context.Dots.Remove(dot);
            _context.SaveChanges();

            return new JsonResult(NoContent());
        }
    }
}
