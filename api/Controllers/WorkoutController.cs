using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using api.models;
using mis321_pa4_edockery1.database;

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
        [HttpGet("{exerciseId}", Name = "Get")]
        public Workout Get(int exerciseId)
        {
            WorkoutUtility utility = new WorkoutUtility();
            return utility.GetWorkout(exerciseId);
        }

        // POST: api/Workout
        [HttpPost]
        public void Post([FromBody] Workout value)
        {
            AddWorkout save = new AddWorkout();
            save.SaveWorkout(value);
        }

        // PUT: api/Workout/5
        [HttpPut("{exerciseId}")]
        public void Put(int exerciseId, [FromBody] Workout value)
        {
            AddWorkout save = new AddWorkout();
            save.updateWorkout(value);
        }

        // DELETE: api/Workout/5
        [HttpDelete("{id}")]
        public void Delete(int exerciseId)
        {
            System.Console.WriteLine(exerciseId);
        }
    }
}