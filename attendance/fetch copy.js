$(document).ready(function() {
    $('#example').DataTable({
      responsive: true,
      autoFitColumns: true
    });
});

let tbody = document.querySelector("tbody");

async function getData() {
    fetch('https://sheetdb.io/api/v1/58f61be4dda40')
    .then((response) => response.json())
    .then((data) => toDisplay(data));
}

async function toDisplay(data) {
    // Get the DataTables object.
    const dataTable = $('#example').DataTable();

    // Clear the table.
    dataTable.clear();

    // Add the new data to the table.
    for (const item of data) {

        var b =`<button onclick='editData("${item.name}")'>Edit</button>`;
        dataTable.row.add([item.name, item.age, b]).draw();
    }

}

getData();


function editData(e){
    alert(e + " is pressed!");
}