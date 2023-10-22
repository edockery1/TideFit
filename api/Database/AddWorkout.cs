using mis321_pa4_edockery1;
using System.Data;
using MySql.Data;
using MySql.Data.MySqlClient;
using api.models;
 
namespace mis321_pa4_edockery1.database 
{
    public class AddWorkout
    {
        public void SaveWorkout(Workout newWorkout)
        {
            Database db = new Database();

            using var con = new MySqlConnection(db.cs);
            con.Open();

            string stm = "INSERT INTO workout(activityType, distanceMiles, dateCompleted, pinned, deleted) VALUES(@activityType, @distanceMiles, @dateCompleted, @pinned, @deleted)";
            using var cmd = new MySqlCommand(stm, con);

            cmd.Parameters.AddWithValue("@exerciseId", newWorkout.exerciseId);
            cmd.Parameters.AddWithValue("@activityType", newWorkout.activityType);
            cmd.Parameters.AddWithValue("@distanceMiles", newWorkout.distanceMiles);
            cmd.Parameters.AddWithValue("@dateCompleted", newWorkout.dateCompleted);
            cmd.Parameters.AddWithValue("@pinned", newWorkout.pinned);
            cmd.Parameters.AddWithValue("@deleted", newWorkout.deleted);

            cmd.ExecuteNonQuery();
            con.Close();
        }

        public void updateWorkout(Workout updatedWorkout){
            Database db = new Database();

            using var con = new MySqlConnection(db.cs);
            con.Open();

            string stm = @$"Update workout SET exerciseId=@exerciseId, pinned=@pinned, deleted=@deleted WHERE exerciseId=@exerciseId";

            using var cmd = new MySqlCommand(stm, con);

            cmd.Parameters.AddWithValue("@exerciseId", updatedWorkout.exerciseId);
            cmd.Parameters.AddWithValue("@pinned", updatedWorkout.pinned);
            cmd.Parameters.AddWithValue("@deleted", updatedWorkout.deleted);

            cmd.ExecuteNonQuery();
            con.Close();
        }
    }    
}