namespace api.models
{
    public class WorkoutUtility
    {
        public List<Workout> GetAllWorkouts() {
            List<Workout> myWorkouts = new List<Workout>();
            myWorkouts.Add(new Workout(){exerciseId = 1, activityType = "Running", distanceMiles = "13", dateCompleted = "5/10/23", pinned = true, deleted = false});
            myWorkouts.Add(new Workout(){exerciseId = 2, activityType = "Rollerblading", distanceMiles = "5", dateCompleted = "12/25/23", pinned = true, deleted = false});
            return myWorkouts;
        }
    }
}