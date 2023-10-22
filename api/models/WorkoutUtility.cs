using Microsoft.AspNetCore.Cors;
using MySql.Data.MySqlClient;
namespace api.models
{
    public class WorkoutUtility
    {
        public List<Workout> GetAllWorkouts() {
            List<Workout> myWorkouts = new List<Workout>();
            Database db = new Database();

            using var con = new MySqlConnection(db.cs);
            con.Open();
            string stm = "SELECT * from workout ORDER BY dateCompleted desc;"; // check this 
            using var cmd = new MySqlCommand(stm, con);
            using MySqlDataReader rdr = cmd.ExecuteReader();
            while(rdr.Read())
            {
                Workout temp = new Workout(){exerciseId = rdr.GetInt32(0), activityType = rdr.GetString(1), distanceMiles = rdr.GetString(2), dateCompleted = rdr.GetString(3), pinned = rdr.GetString(4), deleted = rdr.GetString(5)};
                myWorkouts.Insert(0, temp);
            }
            con.Close();
            // myWorkouts.Add(new Workout(){exerciseId = 1, activityType = "Running", distanceMiles = "13", dateCompleted = "5/10/23", pinned = true, deleted = false});
            // myWorkouts.Add(new Workout(){exerciseId = 2, activityType = "Rollerblading", distanceMiles = "5", dateCompleted = "12/25/23", pinned = true, deleted = false});
            return myWorkouts;
        }

        public Workout GetWorkout(int exerciseId)
        {
            Database db = new Database();

            using var con = new MySqlConnection(db.cs);
            con.Open();

            string stm = @"SELECT * FROM workout WHERE exerciseId = @exerciseId;";
            using var cmd = new MySqlCommand(stm, con);
            cmd.Parameters.AddWithValue("@exerciseId", exerciseId);
            
            using MySqlDataReader rdr = cmd.ExecuteReader();
    
            if (rdr.Read())
            {
                return new Workout()
                {
                    exerciseId = rdr.GetInt32("exerciseId"),
                    activityType = rdr.GetString("activityType"),
                    distanceMiles = rdr.GetString("distanceMiles"),
                    dateCompleted = rdr.GetString("dateCompleted"),
                    pinned = rdr.GetString("pinned"),
                    deleted = rdr.GetString("deleted") 
                };
            }
            
            return null;  // handle the case where no workout is found
        }

    }
}
