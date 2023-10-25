let app = document.getElementById('app') // setting app variable to HTML app div
const url = 'http://localhost:5074/api/Workout';
// localStorage.clear()

// getting the message and button elements
const message = document.getElementById("message")
const addButton = document.getElementById("addBtn")

addButton.addEventListener("click", () => {
    message.style.display = "none" // hiding message after the add click 
})

async function handleOnLoad() {
    let response = await fetch (url);
    let data = await response.json();
    createTable(data) // table is created when page loads
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
        if (workout.deleted != 'true') { // if statement to not print a deleted worked
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
            pbtn.className = "myButtons pinButton"
            pbtn.id = `${workout.exerciseId}` // giving pin button id of workout so we know which is targeted
            pbtn.onclick = () => {
                handleUpdate(workout.exerciseId)
            }
            pbtn.appendChild(document.createTextNode('Pin'))
            tr.appendChild(pbtn)
    
            let td6 = document.createElement('TD')
            td6.appendChild(document.createTextNode(`${workout.pinned}`))
            tr.appendChild(td6)
    
            let dbtn = document.createElement('BUTTON')
            dbtn.className = "myButtons deleteButton"
            dbtn.id = `${workout.exerciseId}` // giving delete button id of workout so we know which is targeted
            dbtn.onclick = () => {
                deleteActivity(workouts, workout.exerciseId) // clicking button runs the deleteActivity function
            }
            dbtn.appendChild(document.createTextNode('Delete'))
            tr.appendChild(dbtn)
        }
    })
    app.appendChild(table) // adding entire table to end of app div
}

async function addActivity() {
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
    addForm.addEventListener('submit', async function (e) { // listening for the 'submit' event (save) then runing funtion to add
        e.preventDefault()

        var today = new Date(); // creating date
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();

        today = mm + '/' + dd + '/' + yyyy; // formatted date

        let workout = {
            activityType: document.getElementById("activityName").value,
            distanceMiles: document.getElementById("distanceMiles").value,
            dateCompleted: today,
            pinned: 'No', 
            deleted: 'false'
        }

        console.log(workout)

        await fetch(url, {
            method: 'POST', 
            headers: {
                accept: '*/*',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(workout),
        })

        location.reload()
    })
}
    
async function handleUpdate(exerciseId){
    let response = await fetch (url);
    let data = await response.json();
    pinActivity(data, exerciseId)
}

async function pinActivity(workouts, pickedID) {
    const newUrl = `${url}/${pickedID}`;

    const workoutToPin = workouts.find((data) => data.exerciseId == pickedID);
    workoutToPin.pinned = workoutToPin.pinned === 'Yes' ? 'No' : 'Yes';

    await fetch(newUrl, {
        method: 'PUT',
        headers: {
            accept: '*/*',
            'Content-type': 'application/json',
        },
        body: JSON.stringify(workoutToPin),
    })

    location.reload()
}
    
async function deleteActivity(workouts, pickedID) {
    const newUrl = `${url}/${pickedID}`;

    const workoutToPin = workouts.find((data) => data.exerciseId == pickedID);
    workoutToPin.deleted = workoutToPin.deleted === 'true' ? 'false' : 'true';

    await fetch(newUrl, {
        method: 'PUT',
        headers: {
            accept: '*/*',
            'Content-type': 'application/json',
        },
        body: JSON.stringify(workoutToPin),
    })

    location.reload()
}