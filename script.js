// Function to add or update data
function addData() {
    const nameInput = document.getElementById("name");
    const ageInput = document.getElementById("age");

    const name = nameInput.value;
    const age = ageInput.value;

    if (name && age) {
        const data = { name, age };
        let dataArray = JSON.parse(localStorage.getItem("data")) || [];
        dataArray.push(data);
        localStorage.setItem("data", JSON.stringify(dataArray));
        nameInput.value = "";
        ageInput.value = "";
        displayData();
    }
}

// Function to display data in the table
function displayData() {
    const tableBody = document.querySelector("tbody");
    tableBody.innerHTML = "";

    const dataArray = JSON.parse(localStorage.getItem("data")) || [];

    dataArray.forEach((data, index) => {
        const row = tableBody.insertRow();
        const nameCell = row.insertCell(0);
        const ageCell = row.insertCell(1);
        const actionCell = row.insertCell(2);

        nameCell.textContent = data.name;
        ageCell.textContent = data.age;
        actionCell.innerHTML = `<button onclick="editData(${index})">Edit</button>
                                <button onclick="deleteData(${index})">Delete</button>`;
    });
}

// Function to edit data
function editData(index) {
    const dataArray = JSON.parse(localStorage.getItem("data")) || [];
    const data = dataArray[index];
    if (data) {
        document.getElementById("name").value = data.name;
        document.getElementById("age").value = data.age;
        dataArray.splice(index, 1);
        localStorage.setItem("data", JSON.stringify(dataArray));
        displayData();
    }
}

// Function to delete data
function deleteData(index) {
    const dataArray = JSON.parse(localStorage.getItem("data")) || [];
    dataArray.splice(index, 1);
    localStorage.setItem("data", JSON.stringify(dataArray));
    displayData();
}

// Event listener for form submission
document.getElementById("dataForm").addEventListener("submit", function (e) {
    e.preventDefault();
    addData();
});

// Initial data display
displayData();