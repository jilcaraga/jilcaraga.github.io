$(document).ready(function() {
    $('#example').DataTable({
      responsive: true,
      autoFitColumns: true
    });
});

const tabLinks = document.querySelectorAll('.nav-link');

tabLinks.forEach(tabLink => {
  tabLink.addEventListener('click', event => {
    const bot = document.querySelector(".row");
    bot.style.display = 'block';
    beforeLoading();
  });
});

let api_m = "https://script.google.com/macros/s/AKfycbxHZLNmHhfJbfWLx7QG04dehJcsLRWux2XB13wEwv_ZdyYzYHHwZ9GPZBiZdyKzCtTHDg/exec";
let api_a = "https://script.google.com/macros/s/AKfycbyovOM2JY93SfazQWw79I7ydNKNV64wX2GHOxHglO6ni6EvGjK216_E00k7gkHlEO1DRQ/exec";
let tbody = document.querySelector("tbody");
let form = document.querySelector("form");

function beforeLoading(){
    const activeTab = document.querySelector('.nav-link.active');
    const activeTabId = removeHash(activeTab.getAttribute('href'));
    const addb = document.querySelector('#addmodal');
    const title_home = document.querySelector('#titlehome');
    const top = document.querySelector("#DisableDiv");
    const bot = document.querySelector(".row");
    //$('#addmodal').prop('disabled', true);
   

    var today = new Date();
    var day = today.getDay(); 

    if((day == 0 && activeTabId == "1st") || (day == 0 && activeTabId == "2nd")) {
        top.style.display = 'none';
        addb.disabled = false;
        if(activeTabId == "1st"){
            title_home.textContent = "1st Service";
        } else {
            title_home.textContent = "2nd Service";
        }
        getData();
    } else if(day == 5 && activeTabId == "3rd") {
        top.style.display = 'none';
        addb.disabled = false;
        title_home.textContent = "Night of Power";
        getData();
    }
    else {
        top.textContent = "This section is not available for today!";
        title_home.textContent = " ";
        addb.disabled = true;
        bot.style.display = 'none';
        top.style.display = 'block';
    }
}

function getForm(){
    const contact = document.getElementById('cnuma').value;
    const fname = document.getElementById('fnamea').value;
    const lname = document.getElementById('lnamea').value;

    const gender = document.getElementById('gendera');
    const selectedGender = gender.options[gender.selectedIndex].value;

    const dob = document.getElementById('bdate').value;

    const status = document.getElementById('civila');
    const selectedStatus= status.options[status.selectedIndex].value;

    const type = document.getElementById('statusa');
    const selectedType= type.options[type.selectedIndex].value;

    editData(contact,fname,lname,selectedGender,dob,selectedStatus,selectedType);
}

async function getData() {
    fetch(api_m)
    .then((response) => response.json())
    .then((info) => getFilter(info));
}

async function getFilter(info) {
    fetch(api_a)
    .then((response) => response.json())
    .then((data) => toDisplay(data,info));
}

async function toDisplay(att,mem,tab) {
    // Get the DataTables object.
    const dataTable = $('#example').DataTable().responsive(!$('#example').DataTable().responsive());

    let data = mem.sheet1;
    // Clear the table.
    dataTable.clear();

    const activeTab = document.querySelector('.nav-link.active');
    const activeTabId = removeHash(activeTab.getAttribute('href'));

    const d = new Date();
    const month = d.getMonth() + 1;
    const day = d.getDate();
    const year = d.getFullYear();
    const t = `${month}/${day}/${year}`;

    // Add the new data to the table.
    for (var i = 1 ; i < data.length ; i++) {
        var bool = "false";
       for (var j = 1 ; j < att.length ; j++) {
            if(data[i][0] == att[j][0] && att[j][7] == t && att[j][9] == activeTabId){
                bool = "true";
            }
        }

        var g = "Female";
        if(data[i][4] == 'M'){
            g = "Male";
        } else {
            g = "Female";
        }

        console.log(data[i][1]);

        if(bool == "true"){
           var name = data[i][3] +", " + data[i][1] + " " + data[i][2];
            var pislit =`<button type='button' class='btn btn-info' disabled>Present</button>`;
            dataTable.row.add([name, g, pislit]).draw();
        } else {
           var name = data[i][3] +", " + data[i][1] + " " + data[i][2];
           var fname = data[i][1];
            var pislit =`<button type='button' onclick='editData("`+data[i][0]+`","`+data[i][1]+`","`+data[i][3]+`","`+data[i][4]+`","`+data[i][5]+`","`+data[i][9]+`","member")' class='btn btn-primary'>Check</button>`;
            //var pislit = `<button type='button' onclick='testFunc("`+data[i][1]+`")' class='btn btn-primary'>Check</button>`;
            dataTable.row.add([name, g, pislit]).draw();
        }
    }


    
}

beforeLoading();

function testFunc(w){
    var c = w;
    alert(c);
}

function editData(id,fn,ln,g,dob,status,type){

    //alert(id + fn + ln + g + dob + status + type);

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
        form.reset();
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

function closeDisplay() {
    $('#myModal').modal('hide');
    form.reset();
}