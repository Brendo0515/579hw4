document.getElementById("add_task").addEventListener("click", addTask);
document.getElementById("task_description_input").addEventListener('keydown', function(event) {
    if (event.code == 'Enter') {      //help from https://javascript.info/keyboard-events
      addTask()
    }
  });

function addTask(description, dueTime){
    description = document.getElementById("task_description_input").value; 
    document.getElementById("task_description_input").value = " ";
    date = document.getElementById("duedate_input"); 
    time = document.getElementById("duetime_input"); 
    d = dateAndTimeToTimestamp(date, time);
    dueTime = new Date(d).toLocaleString("en-US"); //help from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString
    
    if(d === false){
        const newListElement = document.createElement('li');
        newListElement.id = description;
        newListElement.textContent = description;
        const doneButtonElement = document.createElement('button');
        doneButtonElement.className = "btn btn-sm btn-outline-danger done";
        doneButtonElement.id = "btn" + description;
        doneButtonElement.textContent = "Done";
        newListElement.append(doneButtonElement);
        document.getElementById("task_list").appendChild(newListElement);
        document.getElementById("btn" + description).addEventListener("click", function taskRemoval (){document.getElementById(description).remove();
        });
    }
    else{
        const newListElement = document.createElement('li');
        newListElement.id = description;
        newListElement.textContent = description;
        const spanElement = document.createElement('span');
        spanElement.textContent = "Due " + dueTime;
        spanElement.className = "due";
        const doneButtonElement = document.createElement('button');
        doneButtonElement.className = "btn btn-sm btn-outline-danger done";
        doneButtonElement.id = "btn" + description;
        doneButtonElement.textContent = "Done";
        newListElement.append(spanElement);
        newListElement.append(doneButtonElement);
        document.getElementById("task_list").appendChild(newListElement);
        document.getElementById("btn" + description).addEventListener("click", function taskRemoval() {document.getElementById(description).remove();
        });
    }
}

function dateAndTimeToTimestamp(dateInputElement, timeInputElement) {
    const dueDate = dateInputElement.valueAsNumber; // Returns the timestamp at midnight for the given date
    const dueTime = timeInputElement.valueAsNumber; // Returns the number of milliseconds from midnight to the time

    if(dueDate && dueTime) { // The user specified both a due date & due time
        //Add the timezone offset to account for the fact that timestamps are specified by UTC
        const timezoneOffset =  (new Date()).getTimezoneOffset() * 60 * 1000;
        return dueDate + dueTime + timezoneOffset;
    } else {
        // if the user did not specify both a due date and due time, return false
        return false;
    }
}

