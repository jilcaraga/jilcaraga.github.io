$(document).ready(function() {
    $('#example').DataTable({
      responsive: true,
      autoFitColumns: true
    });
});

let api_a = "https://script.google.com/macros/s/AKfycbyovOM2JY93SfazQWw79I7ydNKNV64wX2GHOxHglO6ni6EvGjK216_E00k7gkHlEO1DRQ/exec";
let tbody = document.querySelector("tbody");
let selectService = document.querySelector('#selectService');
let selectNetwork = document.querySelector('#selectNetwork');
let selectDate = document.querySelector('#selectDate');

async function getDates(data) {
    fetch(api_a)
    .then((response) => response.json())
    .then((data) => displayDates(data));
}

async function displayDates(info) {
    
    var cnt = 0;
    var arr_dates = [];
    arr_dates.push("All Dates");
    // Add the new data to the table.
    for (var i = 1 ; i < info.length ; i++) {
        arr_dates.push(info[i][7]);
    }

    const uniqueArray = new Set(arr_dates);

    uniqueArray.forEach((item) => {

        const now = new Date(item);
        const pstDate = new Date(now.getTime() + 8 * 60 * 60 * 1000);
        const dayOfWeekNumber = pstDate.getDay();
        const dayOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][dayOfWeekNumber];

        const optionElement = document.createElement('option');
        if(cnt == 0){
            optionElement.textContent = item;
            cnt++;
        } else {
            optionElement.textContent = item + " (" + dayOfWeek + ")";
        }
        optionElement.value = item;
        selectDate.appendChild(optionElement);
    });
}

async function getData(data) {
    fetch(api_a)
    .then((response) => response.json())
    .then((data) => toDisplay(data));
}

async function toDisplay(data) {
    // Get the DataTables object.
    const dataTable = $('#example').DataTable().responsive(!$('#example').DataTable().responsive());

    // Clear the table.
    dataTable.clear();

    const serviceValue = selectService.value;
    const networkValue = selectNetwork.value;
    const dateValue = selectDate.value;
    let ageRangeStart = 0;
    let ageRangeEnd = 200;
    let status = "Single";
    let isFemale = "Female";
    let isMale = "Male";
    let checker = 0;

    if(networkValue == "men" || networkValue == "women" || networkValue == "ycouple" || networkValue == "allmen" || networkValue == "allwomen"){
        if(networkValue == "women"){
            isMale = "Female";
            ageRangeStart = 36;
            ageRangeEnd = 59;
            status = "Married";
        } 
        else if(networkValue == "men") {
            isFemale = "Male";
            ageRangeStart = 36;
            ageRangeEnd = 59;
            status = "Married";
        }
        else if(networkValue == "allmen") {
            isFemale = "Male";
            ageRangeStart = 36;
            ageRangeEnd = 200;
            status = "Married";
        }
        else if(networkValue == "allwomen") {
            isMale = "Female";
            ageRangeStart = 36;
            ageRangeEnd = 200;
            status = "Married";
        }
        else {
            ageRangeStart = 18;
            ageRangeEnd = 35;
            status = "Married";
            console.log("i am in young couples");
        }
    } else {
        if(networkValue == "youth"){
            ageRangeStart = 13;
            ageRangeEnd = 35;
            status = "Single";
            console.log("i am in youth");
        }
        else if(networkValue == "jr"){
            ageRangeStart = 13;
            ageRangeEnd = 17;
            status = "Single";
            console.log("i am in jr youth");
        }
        else if(networkValue == "sr"){
            ageRangeStart = 18;
            ageRangeEnd = 24;
            status = "Single";
            console.log("i am in sr youth");
        }
        else if(networkValue == "yan"){
            ageRangeStart = 25;
            ageRangeEnd = 35;
            status = "Single";
            console.log("i am in yan");
        }
        else if(networkValue == "srjr"){
            ageRangeStart = 13;
            ageRangeEnd = 24;
            status = "Single";
            console.log("i am in sr and jr youth");
        }
        else if(networkValue == "single"){
            ageRangeStart = 36;
            ageRangeEnd = 59;
            status = "Single";
            console.log("i am in singles");
        }
        else {
            ageRangeStart = "60";
            console.log("i am in senior");
        }
    }

    // Add the new data to the table.
    for (var i = 1 ; i < data.length ; i++) {

        const now = new Date(data[i][8]);
        const timeString = now.toLocaleTimeString("en-US");
        const timeStringWithoutSeconds = timeString.replace(/:\d\d /, ' ');

        var g = "Female";
        if(data[i][3] == 'M'){
            g = "Male";
        } else {
            g = "Female";
        }

        //console.log(dateValue + " => " + data) 

        if(networkValue == "all" || networkValue == "senior") {
            if(networkValue == "all"){
                ageRangeStart = 0;
            }

            if(serviceValue == "both"){
                if((data[i][4] >= ageRangeStart && data[i][4] <= ageRangeEnd) && (g == isFemale || g == isMale)){
                    if(dateValue == "All Dates"){
                        var name = data[i][2] +", " + data[i][1];
                        dataTable.row.add([name, g, data[i][4], data[i][7], data[i][6], timeStringWithoutSeconds]).draw(); 
                        checker++;
                    } else {
                        if(dateValue == data[i][7]){
                            var name = data[i][2] +", " + data[i][1];
                            dataTable.row.add([name, g, data[i][4], data[i][7], data[i][6], timeStringWithoutSeconds]).draw(); 
                            dataTable.columns(3).visible(false);
                            checker++;
                        }
                    }
                }
            } else {
                if((data[i][4] >= ageRangeStart && data[i][4] <= ageRangeEnd) && (g == isFemale || g == isMale) && (serviceValue == data[i][9])){
                    if(dateValue == "All Dates"){
                        var name = data[i][2] +", " + data[i][1];
                        dataTable.row.add([name, g, data[i][4], data[i][7], data[i][6], timeStringWithoutSeconds]).draw(); 
                        checker++;
                    } else {
                        if(dateValue == data[i][7]){
                            var name = data[i][2] +", " + data[i][1];
                            dataTable.row.add([name, g, data[i][4], data[i][7], data[i][6], timeStringWithoutSeconds]).draw(); 
                            dataTable.columns(3).visible(false);
                            checker++;
                        }
                    }
                }
            }
        }
        else {
            if(serviceValue == "both"){
                if((data[i][4] >= ageRangeStart && data[i][4] <= ageRangeEnd) && (g == isFemale || g == isMale) && (status == data[i][5])){
                    if(dateValue == "All Dates"){
                        var name = data[i][2] +", " + data[i][1];
                        dataTable.row.add([name, g, data[i][4], data[i][7], data[i][6], timeStringWithoutSeconds]).draw(); 
                        checker++;
                    } else {
                        if(dateValue == data[i][7]){
                            var name = data[i][2] +", " + data[i][1];
                            dataTable.row.add([name, g, data[i][4], data[i][7], data[i][6], timeStringWithoutSeconds]).draw(); 
                            dataTable.columns(3).visible(false);
                            checker++;
                        }
                    }
                }
            } else {
                if((data[i][4] >= ageRangeStart && data[i][4] <= ageRangeEnd) && (g == isFemale || g == isMale) && (status == data[i][5]) && (serviceValue == data[i][9])){
                    if(dateValue == "All Dates"){
                        var name = data[i][2] +", " + data[i][1];
                        dataTable.row.add([name, g, data[i][4], data[i][7], data[i][6],timeStringWithoutSeconds]).draw(); 
                        checker++;
                    } else {
                        if(dateValue == data[i][7]){
                            var name = data[i][2] +", " + data[i][1];
                            dataTable.row.add([name, g, data[i][4], data[i][7], data[i][6], timeStringWithoutSeconds]).draw(); 
                            dataTable.columns(3).visible(false);
                            checker++;
                        }
                    }
                }
            }
        }
    }

    if(checker == 0){
        dataTable.clear().draw(); 
        alert("Data not found!");
    }
}

function testFunc(w){
    var c = w;
    alert(c);
}

function editData(id,fn,ln,g,dob,status,type){

    const today = new Date();
    const birthDate = new Date(dob);
    // Calculate the difference between the birth date and the current date in days.
    const daysSinceBirth = Math.floor((today - birthDate) / (1000 * 60 * 60 * 24));  
    // Calculate the age in years.
    const age = Math.floor(daysSinceBirth / 365);

    const d = new Date();
    const month = d.getMonth() + 1;
    const day = d.getDate();
    const year = d.getFullYear();
    const t = `${month}/${day}/${year}`;

    const now = new Date();
    const timeString = now.toLocaleTimeString("en-US");
    const timeStringWithoutSeconds = timeString.replace(/:\d\d /, ' ');

    const activeTab = document.querySelector('.nav-link.active');
    const activeTabId = removeHash(activeTab.getAttribute('href'));

    let obj = {
        id: id,
        fname: fn,
        lname: ln,
        gen: g,
        age: age,
        cstatus: status,
        type: type,
        date: "'"+t,
        time: timeStringWithoutSeconds,
        service: activeTabId
    }
    
    fetch(api_a,{
        method:"POST",
        body:JSON.stringify(obj)
    })
    .then(res => res.text())
    .then(data => {
        alert(data);
        beforeLoading();
    });

    /*fetch('https://sheetdb.io/api/v1/3b3bpqaqdr0he', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        data: [
                {
                    'id': id,
                    'fname': fn,
                    'lname': ln,
                    'gender': gen,
                    'age': age,
                    'cstatus': status,
                    'type': type,
                    'date': "'"+t,
                    'time': timeStringWithoutSeconds,
                    'service': activeTabId
                }
            ]
        })
    })
  .then((response) => response.json())
  .then((data) => alertSuccess());*/

}

function checkData(id,fn,ln,gen,dob,status,type){
    
}

function alertSuccess(){
    beforeLoading();
    alert("Succesfully Checked");
}

function removeHash(string) {
    // Check if the string starts with the `#` symbol.
    if (string.charAt(0) === '#') {
      // Remove the `#` symbol and return the remaining string.
      return string.substring(1);
    } else {
      // Return the string unchanged.
      return string;
    }
  }