
add_btn = document.querySelector(".add-btn");
clear_btn = document.querySelector(".clear-btn");

add_btn.addEventListener("click", UpdateList);
clear_btn.addEventListener("click", ClearList);
DisplayList();

function UpdateList(){

    title = document.getElementById('title').value;
    description = document.getElementById('description').value;
    
    if(title == '' || description == ''){
        alert('Fill all the form content');
        return;
    }
    
    console.log("Updating List...");

    if(localStorage.getItem('JsonItems') ==  null){

        JsonItemArr = [];
        JsonItemArr.push([title, description]);
        localStorage.setItem('JsonItems', JSON.stringify(JsonItemArr));
        
    }
    else{
        
        JsonItemStr = localStorage.getItem('JsonItems');
        JsonItemArr = JSON.parse(JsonItemStr);
        JsonItemArr.push([title, description]);
        localStorage.setItem('JsonItems', JSON.stringify(JsonItemArr));
        
    }
    
    DisplayList();

    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    
}


function DisplayList(){

    console.log("Displaying List...");
    
    JsonItemArr = [];
    
    if(localStorage.getItem('JsonItems') != null){
        JsonItemStr = localStorage.getItem('JsonItems');
        JsonItemArr = JSON.parse(JsonItemStr);
    }

    console.log(JsonItemArr);

    let tableList = document.querySelector(".list-table");
    let str = `<table  class="table">
                <tr class="table-row">
                <th class="table-head">S.No.</th>
                <th class="table-head">Title</th>
                <th class="table-head">Description</th>
                <th class="table-head">Action</th>
                </tr>`;

    JsonItemArr.forEach((element, index)=>{

        str += `<tr class="table-row">
                <td class="table-data">${index+1}</td>
                <td class="table-data">${element[0]}</td>
                <td class="table-data">${element[1]}</td>
                <td class="table-btn">
                    <button class="delete-btn" onclick="DeleteItem(${index})">x</button>
                </td>
                 </tr>`;

    });

    str += `</table>`

    tableList.innerHTML = str;

}

function DeleteItem(index) {

    if(confirm('Are you sure you want to delete this Task?')){

        console.log(`Deleting Item ${index+1}`);
    
        JsonItemStr = localStorage.getItem('JsonItems');
        JsonItemArr = JSON.parse(JsonItemStr);
        JsonItemArr.splice(index, 1);
        localStorage.setItem('JsonItems', JSON.stringify(JsonItemArr));
    
        DisplayList();

    }

    return;

}

function ClearList() {

    if(confirm('Warning : This Action will delete all the Tasks !!!')){
        console.log('Clearing all Tasks');
        if(localStorage.getItem('JsonItems') != null){
            localStorage.clear();
        }
        DisplayList();
    }

    return;

}




