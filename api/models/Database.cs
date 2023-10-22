namespace api.models
{
    public class Database
    {
        private string host {get; set;}
        private string database {get; set;}
        private string username {get; set;}
        private string port {get; set;}
        private string password {get; set;}

        public string cs {get; set;}

        public Database() {
            host = "pfw0ltdr46khxib3.cbetxkdyhwsb.us-east-1.rds.amazonaws.com";
            database = "mi7pjb0nug48amtt";
            username = "x8fp8uyuw7gua0zv";
            port = "3306";
            password = "o6b0heh4zs5ahg9i";

            cs = $"server = {host}; user = {username}; database = {database}; port = {port}; password = {password};";
        }
    }
}