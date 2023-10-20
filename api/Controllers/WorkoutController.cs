using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using api.models;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorkoutController : ControllerBase
    {
        // GET: api/Workout
        [HttpGet]
        public List<Workout> Get()
        {
            WorkoutUtility utility = new WorkoutUtility();
            return utility.GetAllWorkouts();
        }

        // GET: api/Workout/5
        [HttpGet("{id}", Name = "Get")]
        public Workout Get(int exerciseId)
        {
            WorkoutUtility utility = new WorkoutUtility();
            List<Workout> myWorkouts = utility.GetAllWorkouts();
            foreach(Workout workout in myWorkouts) {
                if(workout.exerciseId == exerciseId) {
                    return workout;
                }
            }
            return new Workout();
        }

        // POST: api/Workout
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/Workout/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/Workout/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
