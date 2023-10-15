$(document).ready(function() {
    $('#example').DataTable({
        responsive: true,
        autoFitColumns: true,
        columnDefs: [
            {
                targets: 0,
                responsivePriority: 10,    
                width: 180
            },
            {
                targets: 10,
                responsivePriority: 9,    
            }
        ]
    });
});

 // Start of the script section
 let api = "https://script.google.com/macros/s/AKfycbxHZLNmHhfJbfWLx7QG04dehJcsLRWux2XB13wEwv_ZdyYzYHHwZ9GPZBiZdyKzCtTHDg/exec";
 // Set the API URL as a variable
 let form = document.querySelector("form");
 // Find the form element and set it as a variable
 let add = document.querySelector("#add");
 let modal_title = document.querySelector("#modtitle");


 
 function closeDisplay() {
    $('#myModal').modal('hide');
    add.textContent = "Add";
    modal_title.textContent = "Add Member";
    document.getElementById('target').value = "addingm";
    form.reset();
}

/*function addData() {

   const target = document.querySelector('#target');
   const targetValue = target.value;
   
   if(targetValue == "addingm") {
        const statusElement = document.querySelector('#status');
        const statusValue = statusElement.value;

        const provinceElement = document.querySelector('#province');
        const provinceValue = provinceElement.value;

        const radioButton = document.getElementById('value-1');
        const radioButton2 = document.getElementById('value-2');
        var gen = "char";

        if (radioButton.checked) {
        gen = "M";
        } else {
            if (radioButton2.checked) {
                gen = "F";
            } else {
                gen = "err";
            }
        }

        //alert(buttonText);
        // Change the text content of the add button to indicate that data is being added
        //add.textContent="Adding.."
        // Create an object with the todo value obtained from the form
        if(gen == "char" || gen == "err"){
            const randomNumber = generateRandom10DigitNumber();
            //alert(randomNumber);
        }
        else {

            const randomNumber = generateRandom10DigitNumber();

            let obj = {
                ops: "update",
                idnum: randomNumber,
                fname: form[0].value,
                mname: form[1].value,
                lname: form[2].value,
                gender: gen,
                bdate: form[5].value,
                email: form[6].value,
                contact: "'"+form[8].value,
                status: statusValue,
                occupation: form[9].value,
                school: form[10].value,
                brgy: form[11].value,
                city: form[12].value,
                province: provinceValue
            }
        
            fetch(api,{
                method:"POST",
                body:JSON.stringify(obj)
            })
            .then(res => res.text())
            .then(data => {
                Swal.fire(data);
                getResponse();
                form.reset();
            });
        }
   }
   else if (targetValue == "updatem") {
        
        const statusElement = document.querySelector('#status');
        const statusValue = statusElement.value;

        const provinceElement = document.querySelector('#province');
        const provinceValue = provinceElement.value;

        const radioButton = document.getElementById('value-1');
        const radioButton2 = document.getElementById('value-2');
        var gen = "char";

        if (radioButton.checked) {
        gen = "M";
        } else {
            if (radioButton2.checked) {
                gen = "F";
            } else {
                gen = "err";
            }
        }

        //alert(buttonText);
        // Change the text content of the add button to indicate that data is being added
        //add.textContent="Adding.."
        // Create an object with the todo value obtained from the form
        if(gen == "char" || gen == "err"){
            //const randomNumber = generateRandom10DigitNumber();
            //alert(randomNumber);
        }
        else {

            const idNumber = document.getElementById('userid');
            const idValue = idNumber.value;
            
            alert(gen);

            let obj = {
                ops: "update",
                idnum: idValue,
                fname: form[0].value,
                mname: form[1].value,
                lname: form[2].value,
                gender: gen,
                bdate: form[5].value,
                email: form[6].value,
                contact: "'"+form[8].value,
                status: statusValue,
                occupation: form[9].value,
                school: form[10].value,
                brgy: form[11].value,
                city: form[12].value,
                province: provinceValue
            }
        
            fetch(api,{
                method:"POST",
                body:JSON.stringify(obj)
            })
            .then(res => res.text())
            .then(data => {
                Swal.fire(data);
                getResponse();
                document.getElementById('target').value = "addingm";
                form.reset();
                closeDisplay();
            });
        }
   }
}*/      

function addData() {

    const target = document.querySelector('#target');
    const targetValue = target.value;
    
    if(targetValue == "addingm") {
    
        const statusElement = document.querySelector('#status');
        const statusValue = statusElement.value;

         const provinceElement = document.querySelector('#province');
         const provinceValue = provinceElement.value;

         const radioButton = document.getElementById('value-1');
         const radioButton2 = document.getElementById('value-2');
         var gen = "char";
 
         if (radioButton.checked) {
         gen = "M";
         } else {
             if (radioButton2.checked) {
                 gen = "F";
             } else {
                 gen = "err";
             }
         }

        //alert(buttonText);
         // Change the text content of the add button to indicate that data is being added
         //add.textContent="Adding.."
         // Create an object with the todo value obtained from the form
         if(gen == "char" || gen == "err"){
             alert("inChar");
         }
         else {
            
             const randomNumber = generateRandom10DigitNumber();
 
           
             let obj = {
                 ops: "add",
                 idnum: randomNumber,
                 fname: form[0].value,
                 mname: form[1].value,
                 lname: form[2].value,
                 gender: gen,
                 bdate: form[5].value,
                 email: form[6].value,
                 contact: "'"+form[8].value,
                 status: statusValue,
                 occupation: form[9].value,
                 school: form[10].value,
                 brgy: form[11].value,
                 city: form[12].value,
                 province: provinceValue
             }
             
            //alert(obj.fname);

             fetch(api,{
                 method:"POST",
                 body:JSON.stringify(obj)
             })
             .then(res => res.text())
             .then(data => {
                document.getElementById('target').value = "addingm";
                 Swal.fire(data);
                 getResponse();
                 form.reset();
             });
         }
    }
    else if (targetValue == "updatem") {
         
         const statusElement = document.querySelector('#status');
         const statusValue = statusElement.value;
 
         const provinceElement = document.querySelector('#province');
         const provinceValue = provinceElement.value;
 
         const radioButton = document.getElementById('value-1');
         const radioButton2 = document.getElementById('value-2');
         var gen = "char";
 
         if (radioButton.checked) {
         gen = "M";
         } else {
             if (radioButton2.checked) {
                 gen = "F";
             } else {
                 gen = "err";
             }
         }
 
         //alert(buttonText);
         // Change the text content of the add button to indicate that data is being added
         //add.textContent="Adding.."
         // Create an object with the todo value obtained from the form
         if(gen == "char" || gen == "err"){
             //const randomNumber = generateRandom10DigitNumber();
             //alert(randomNumber);
         }
         else {
 
             const idNumber = document.getElementById('userid');
             const idValue = idNumber.value;
             
             let obj = {
                 ops: "update",
                 idnum: idValue,
                 fname: form[0].value,
                 mname: form[1].value,
                 lname: form[2].value,
                 gender: gen,
                 bdate: form[5].value,
                 email: form[6].value,
                 contact: "'"+form[8].value,
                 status: statusValue,
                 occupation: form[9].value,
                 school: form[10].value,
                 brgy: form[11].value,
                 city: form[12].value,
                 province: provinceValue
             }
         
             fetch(api,{
                 method:"POST",
                 body:JSON.stringify(obj)
             })
             .then(res => res.text())
             .then(data => {
                 Swal.fire(data);
                 getResponse();
                 document.getElementById('target').value = "addingm";
                 form.reset();
                 closeDisplay();
             });
         }
    }
 }    


/*function getResponse() {
    fetch('https://sheetdb.io/api/v1/vthke8mz3lmh5')
    .then((response) => response.json())
    .then((data) => toDisplay(data));
}*/

function getResponse() {
    fetch(api)
    .then(res=>res.json())
    .then(inf=> toDisplay(inf));    
}

async function toDisplay(inf) {
    //alert(JSON.stringify(data.todo));
    // Get the DataTables object.

    let data = inf.sheet1; 
 
    const dataTable = $('#example').DataTable().responsive(!$('#example').DataTable().responsive());

    // Clear the table.
    dataTable.clear();

    // Add the new data to the table.
    //for (const item of inf.todo) {
     for(var i = 1 ; i < data.length ; i++){
    
        const formattedDate = formatDate(new Date(data[i][5]));

        var g = "Female"
        if(data[i][4] == 'M'){
            g = "Male";
        } else {
            g = "Female";
        }
          
        var name = data[i][3] +", " + data[i][1] + " " + data[i][2];
        var address = data[i][10] +", " + data[i][11] + ", " + data[i][12];
        var pislit =`<div class='btn-group-sm btn-group-vertical'><button type='button' onclick='editData(`+data[i][0]+`)' class='btn btn-info'><i class='fa-solid fa-pen-to-square'></i></button><button type='button' onclick='deleteData(`+data[i][0]+`)' class='btn btn-warning'><i class='fa-solid fa-trash'></i></button></div>`;
        dataTable.row.add([name, g, formattedDate, data[i][6], data[i][8], data[i][9], data[i][7], data[i][13], data[i][14], address, pislit]).draw();
    }
}

getResponse();

function editData(e){
    fetch(api)
    .then(res=>res.json())
    .then(data=>{
        let todo = data.sheet1;
        const myVariableAsString = String(todo);
        const array = myVariableAsString.split(",");
        var cnt = 0;
        const dataArray = [];

        for (let i = 0; i < array.length; i += 15) {
            cnt++;
            dataArray.push(array.slice(i, i + 15));
        }

        let values = new Array(cnt);
        for (var i = 0; i < cnt; i++) {
            values[i] = new Array(11); // make each element an array
        }

        for(var i = 0 ; i < cnt ; i++){
            var id = dataArray[i][0];
            if(id == e) {
                var g = "Female";
                if(dataArray[i][4] == 'M'){
                    g = "Male";
                } else {
                    g = "Female";
                }

                //g
                //12
                document.getElementById('fn').value = dataArray[i][1];
                document.getElementById('mn').value = dataArray[i][2];
                document.getElementById('ln').value = dataArray[i][3];
                
                document.getElementById('bday').value = dataArray[i][5];
                document.getElementById('eadd').value = dataArray[i][7];
                document.getElementById('cnum').value = dataArray[i][8];
                document.getElementById('work').value = dataArray[i][13];
                document.getElementById('office').value = dataArray[i][14];
                document.getElementById('brgy').value = dataArray[i][10];
                document.getElementById('ct').value = dataArray[i][11];

                document.getElementById('userid').value = id;
                document.getElementById('target').value = "updatem";

                add.textContent = "Update";
                modal_title.textContent = "Update Member";

                openModal();
                break;
            }
        }

    }).catch(function(error) {
        alert("error");
    });
}

function openModal() {
    const modal = new bootstrap.Modal('#myModal');
    modal.show();
}

function deleteData(id){

    const randomNumber = id; 

    let obj = {
        ops: "del",
        idnum: randomNumber
    }

    fetch(api,{
        method:"POST",
        body:JSON.stringify(obj)
    })
    //Parse the response text from the server and call readData() function to update the UI with the new data
    .then(res => res.text())
    .then(data => {
        Swal.fire(data);     
        getResponse();
    }); 
}

function generateRandom10DigitNumber() {
    return Math.floor(Math.random() * (9999999999 - 1000000000 + 1)) + 1000000000;
}

function downloadExcel (){
    var table2excel = new Table2Excel();
    table2excel.export(document.querySelectorAll("#example"));
}

function formatDate(date) {
    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
    
      const month = monthNames[date.getMonth()];
      const day = date.getDate();
      const year = date.getFullYear();
    
      // Format the month and date using the following string: Month Day, Year.
      const formattedDate = `${month} ${day}, ${year}`;
    
      return formattedDate;
}

//This displays the birthdate into MM-DD-YYYY format
/*function formatDate(date) {
    const month = date.getMonth() + 1;
    const day = date.getDate();
  
    // Format the month and date using the following string: MM-DD-YYYY.
    const formattedDate = `${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}-${date.getFullYear()}`;
  
    return formattedDate;
}*/

