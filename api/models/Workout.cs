namespace api.models
{
    public class Workout
    {
        public int exerciseId {get; set;}
        public string activityType {get; set;}
        public string distanceMiles {get; set;}
        public string dateCompleted {get; set;}
        public string pinned {get; set;}
        public string deleted {get; set;}
    }
}