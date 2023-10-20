let app = document.getElementById('app') // setting app variable to HTML app div
// localStorage.clear()

let workouts = JSON.parse(localStorage.getItem('myWorkouts')) 
if (!workouts) {
    workouts = []
}

// getting the message and button elements
const message = document.getElementById("message")
const addButton = document.getElementById("addBtn")

addButton.addEventListener("click", () => {
    message.style.display = "none" // hiding message after the add click 
})

async function handleOnLoad(workouts) {
    createTable(workouts) // table is created when page loads
    let response = await fetch ('http://localhost:5074/api/Workout');
    let data = await response.json();
    console.log(data);
}

function createTable(workouts) {
    let table = document.createElement('TABLE') // buncha code for creating HTML table in JavaScript to be dynamic
    table.id = 'workoutsTable'
    table.className = 'table'
    let tableBody = document.createElement('TBODY')
    tableBody.id = 'workoutTableBody'
    table.appendChild(tableBody)

    let tr = document.createElement('TR')
    tr.id = 'tb-headers'
    tableBody.appendChild(tr)

    let th2 = document.createElement('TH')
    th2.appendChild(document.createTextNode('Activity Type'))
    tr.appendChild(th2)

    let th3 = document.createElement('TH')
    th3.appendChild(document.createTextNode('Distance in Miles'))
    tr.appendChild(th3)

    let th4 = document.createElement('TH')
    th4.appendChild(document.createTextNode('Date Completed'))
    tr.appendChild(th4)

    let th5 = document.createElement('TH')
    th5.appendChild(document.createTextNode('Pin'))
    tr.appendChild(th5)

    let th6 = document.createElement('TH')
    th6.appendChild(document.createTextNode('Pinned'))
    tr.appendChild(th6)

    let th7 = document.createElement('TH')
    th7.appendChild(document.createTextNode('Delete'))
    tr.appendChild(th7)

    workouts.forEach((workout) => { // for loop to run through entire workouts array and make rows for each workout
        if (workout.deleted != true) { // if statement to not print a deleted worked
            let tr = document.createElement('TR')
            tableBody.appendChild(tr)
    
            let td2 = document.createElement('TD')
            td2.appendChild(document.createTextNode(`${workout.activityType}`))
            tr.appendChild(td2)
    
            let td3 = document.createElement('TD')
            td3.appendChild(document.createTextNode(`${workout.distanceMiles}`))
            tr.appendChild(td3)
    
            let td4 = document.createElement('TD')
            td4.appendChild(document.createTextNode(`${workout.dateCompleted}`))
            tr.appendChild(td4)
    
            let pbtn = document.createElement('BUTTON')
            pbtn.className = "myButtons"
            pbtn.id = `${workout.id}` // giving pin button id of workout so we know which is targeted
            pbtn.onclick = () => {
                pinActivity(workouts, workout.id) // clicking button runs the pinActivity function
            }
            pbtn.appendChild(document.createTextNode('Pin'))
            tr.appendChild(pbtn)
    
            let td6 = document.createElement('TD')
            td6.appendChild(document.createTextNode(`${workout.pinned}`))
            tr.appendChild(td6)
    
            let dbtn = document.createElement('BUTTON')
            dbtn.className = "myButtons"
            dbtn.id = `${workout.id}` // giving delete button id of workout so we know which is targeted
            dbtn.onclick = () => {
                deleteActivity(workouts, workout.id) // clicking button runs the deleteActivity function
            }
            dbtn.appendChild(document.createTextNode('Delete'))
            tr.appendChild(dbtn)
        }
    })
    app.appendChild(table) // adding entire table to end of app div
}

async function addActivity(workouts) {
    document.getElementById("addDIV").innerHTML = // targets the addDiv element and sets the button HTML to display the forms for a new workout
    `
        <form id = "addActivity">
        <label for = "activityName">Activity Name:</label>
        <input type = "text" id = "activityName" placeholder = "Enter Activity Name"><br/><br/>
        <label for = "distance">Distance in Miles:</label>
        <input type = "distance" id = "distanceMiles" placeholder = "Enter Distance"><br/><br/>
        <button id="saveBtn" type="submit" onclick="saveActivity()">Save Activity</button>      
        </form>
    `
    }

// save activity 
async function saveActivity() {
    let addForm = document.getElementById('addDIV') // targeting addDiv to get values for new workout forms
    addForm.addEventListener('submit', function (e) { // listening for the 'submit' event (save) then runing funtion to add
        e.preventDefault()

        var today = new Date(); // creating date
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();

        today = mm + '/' + dd + '/' + yyyy; // formatted date

        let newActivity = document.getElementById("activityName").value
        let newDistance = document.getElementById("distanceMiles").value
        let newDate = today
        let workout = { // making new workout object
            activityType: newActivity,
            distanceMiles: newDistance,
            dateCompleted: newDate,
            pinned: "No",
            deleted: false
        }
        workouts.unshift(workout) // adding new workout to beginning of array so its displayed at top
        localStorage.setItem('myWorkouts', JSON.stringify(workouts)) // saving to local storage
    })

    location.reload() // reloading page to get updated table
}
    
function pinActivity(workouts, pickedID) {
    let finding = workouts.find((workout) => workout.id == pickedID) // finding all info for workout based on id passed from button click
    let index = workouts.findIndex((workout) => workout.id === pickedID) // finding index of workout in workouts array

    if (finding.pinned == "Yes") {
       workouts[index].pinned = "No" // if pinned unpin it
    } else {
        workouts[index].pinned = "Yes" // if not pinned pin it
    }

    localStorage.setItem('myWorkouts', JSON.stringify(workouts)) // save updated workouts to local storage
    location.reload() // reloading page to see pinned/unpinned workout(s)

}
    
function deleteActivity(workouts, pickedID) {
    let index = workouts.findIndex(x => x.id === pickedID) // getting index of workout from ID of the workout clicked to delete
    workouts[index].deleted = true // setting workouts deleted to true
    localStorage.setItem('myWorkouts', JSON.stringify(workouts)) // saving updated workouts to local storage
    location.reload() // reloading page to see removed workout is gone
}