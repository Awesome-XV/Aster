// To be used only when any maintenance is required and to send an alert to the user every 4 hours
let update = false;

// Function to show the alert
function showAlert() {
    if (update) {
        alert("Monday-Tuesday (CST) Aster is going down from Monday around 8PM till Tuesday 4:00 PM for maintenance and all times are in CST (This will appear every 4 hrs)");
    }
}

showAlert();

// Set an interval to show the alert every 4 hours (4 hours = 14400000 milliseconds)
setInterval(showAlert, 14400000);
