const inputbox = document.getElementById("input-box");
const idList = document.getElementById("list-container");
const buttonid = document.querySelector('button').addEventListener('click', addTask); 

const date= document.getElementById("datebox")

const time=document.getElementById('timebox')


const reminderDate = new Date(date + "T" + time);


task=idList.value
if ("Notification" in window) {
    Notification.requestPermission().then(function (permission) {
        if (permission !== 'granted') {
            alert("Please allow notifications for reminders.");
        }
    });
}


console.log(`Reminder set for ${task} at ${reminderDate}`);




function setReminder(task, date, time) {
    const now = new Date();
    const reminderDate = new Date(`${date}T${time}`);

    // Log to debug
    console.log(`Reminder scheduled for: ${reminderDate}`);

    if (reminderDate > now) {
        const timeUntilReminder = reminderDate - now;

        // Using setTimeout to create the reminder
        setTimeout(() => {
            if (Notification.permission === "granted") {
                showNotification(task);
            } else if (Notification.permission !== "denied") {
                requestNotificationPermission(task);
            }
        }, timeUntilReminder);
    } else {
        console.log("The reminder date/time is in the past.");
    }
}




let count = 0;
count = idList.getElementsByTagName('li').length;

function addTask() { 
    if (inputbox.value === '' ) {
        alert("Please add something you need to do!");
        return;
    }
    
    if (count >= 9) {
        alert("You've reached the maximum limit of 9 tasks!");
        inputbox.value = "";
        return;
    }
    
    createList();
    inputbox.value = "";
    // storeData();
}

function createList() {
    let li = document.createElement('li');
    li.innerHTML = inputbox.value;
    idList.appendChild(li);


    let dateElement=document.createElement('label')
    dateElement.textContent=formatDateTime(date.value,time.value)
    dateElement.setAttribute('id','Datebox')
    li.appendChild(dateElement)

    // let dateTimeElement = document.createElement('label');
    // dateTimeElement.textContent = formatDateTime(date.value, time.value);
    // dateTimeElement.setAttribute('id', 'DateTimeBox');
    // li.appendChild(dateTimeElement);
    
    
    let span = document.createElement('span');
    span.innerHTML = "\u00d7";
    li.appendChild(span);
    count++;

    function formatDateTime(date, time) {
        const dateObj = new Date(`${date}T${time}`);
        return dateObj.toLocaleString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric', 
            hour: 'numeric', 
            minute: 'numeric', 
            hour12: true 
        });
    }
    
    setReminder(inputbox.value, date.value, time.value);
}


idList.addEventListener('click', function(ev) { 
    if (ev.target.tagName === "LI") {
        ev.target.classList.toggle("checked");
        // storeData(); 
    }
    else if (ev.target.tagName === "SPAN") {
        ev.target.parentElement.remove();
        count--;
        // storeData(); 
    }
});

function storeData() {
            localStorage.setItem('data', idList.innerHTML)
        }
    
function displayTASK() {
            idList.innerHTML = localStorage.getItem("data")
        }

displayTASK();


