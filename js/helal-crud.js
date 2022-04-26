function addMode() {
    add_btn.style.display = 'block';
    update_btm.style.display = 'none';
}

function updateMode() {
    add_btn.style.display = 'none';
    update_btm.style.display = 'block';
}

function clearall() {
    input_name.value = '';
    input_email.value = '';
    input_phone.value = '';
    input_course.selectedIndex = 0;
    input_instructor.selectedIndex = 0;
}

var inputName = document.getElementById('input_name');
var inputEmail = document.getElementById('input_email');
var inputPhone = document.getElementById('input_phone');
var inputCourse = document.getElementById('input_course');
var inputInstructor = document.getElementById('input_instructor');

// var allStudents = [];
var string_array = localStorage.getItem('my_students');
// var allStudents = JSON.parse(string_array);
// display();

if (string_array == null) {
    var allStudents = [];

    index_number.innerHTML = `Database is empty, Start adding students`;
    info_search.style.textAlign ='center';
    search_box.style.display='none';
    table_part.style.display='none';


}
else {
    var allStudents = JSON.parse(string_array);
    display();
}


function addStudent() {
    var singleStudent = {
        sName: inputName.value,
        sEmail: inputEmail.value,
        sPhone: inputPhone.value,
        sCourse: inputCourse.value,
        sInstructor: inputInstructor.value,
    };
    allStudents.push(singleStudent);
    localStorage.setItem('my_students', JSON.stringify(allStudents));
    display();
    clearall();
};



function display() {

    var template = '';
    for (var i = 0; i < allStudents.length; i++){

        template += `
    <tr>
        <td>${i + 1}</td>
        <td>${allStudents[i].sName}</td>
        <td>${allStudents[i].sEmail}</td>
        <td>${allStudents[i].sPhone}</td>
        <td>${allStudents[i].sCourse}</td>
        <td>${allStudents[i].sInstructor}</td>
        <td class="d-flex justify-content-center">
            <div class="edit-icon rounded-circle btn btn-info d-flex justify-content-center align-items-center" onclick="editStudent(${i}), window.scrollTo(0, 0), search_box.style.display='none'">
                <i class="far fa-edit"></i>
            </div>
            <div class="del-icon rounded-circle btn btn-danger d-flex justify-content-center align-items-center" onclick="delstudent(${i})">
                <i class="far fa-trash-alt"></i>
            </div>
        </td>
    </tr>
    `;}
    document.getElementById('table_content').innerHTML = template;

    if (i == 0) {

        index_number.innerHTML = `Database is empty, Start adding students`;
        info_search.style.textAlign ='center';
        search_box.style.display='none';
        table_part.style.display='none';
    }
    else {
        index_number.innerHTML = `Total Students:  <span id='real_number' class="badge bg-secondary">` + i + `</span>`;
        
        info_search.style.textAlign ='unset';
        search_box.style.display='block';
        table_part.style.display ='block';
    }

};

function delstudent(record) {
    allStudents.splice(record, 1);
    localStorage.setItem('my_students', JSON.stringify(allStudents));
    display();
    addMode();
    clearall();
};

var k = '';
function editStudent(index) {
    k = index;
    inputName.value = allStudents[index].sName;
    inputEmail.value = allStudents[index].sEmail;
    inputPhone.value = allStudents[index].sPhone;
    inputCourse.value = allStudents[index].sCourse;
    inputInstructor.value = allStudents[index].sInstructor;
    index_number.innerHTML = `Editing Student:  <span class="badge bg-info">` + (k + 1) + `</span>`;
    updateMode();
};

function updateStudent() {
    allStudents[k].sName = inputName.value;
    allStudents[k].sEmail = inputEmail.value;
    allStudents[k].sPhone = inputPhone.value;
    allStudents[k].sCourse = inputCourse.value;
    allStudents[k].sInstructor = inputInstructor.value;

    localStorage.setItem('my_students', JSON.stringify(allStudents));
    display();
    clearall();
    addMode();
};


var kk
function searchStudent() {
    // console.log(search_box.value);
    kk = search_box.value;
    var template = '';
    var res = 0;
    for (var i = 0; i < allStudents.length; i++) {

        if (allStudents[i].sName.toLowerCase().includes(kk.toLowerCase())) {
            // console.log(allStudents[i]);
            res = res + 1;
            template += `
            <tr>
                <td>${i + 1}</td>
                <td>${allStudents[i].sName}</td>
                <td>${allStudents[i].sEmail}</td>
                <td>${allStudents[i].sPhone}</td>
                <td>${allStudents[i].sCourse}</td>
                <td>${allStudents[i].sInstructor}</td>
                <td class="d-flex justify-content-center">
                    <div class="edit-icon rounded-circle btn btn-info d-flex justify-content-center align-items-center" onclick="editStudent(${i})">
                        <i class="far fa-edit"></i>
                    </div>
                    <div class="del-icon rounded-circle btn btn-danger d-flex justify-content-center align-items-center" onclick="delstudent(${i})">
                        <i class="far fa-trash-alt"></i>
                    </div>
                </td>
            </tr>
            `;

        }
        else {
            console.log('No Data');
        }
    }
    document.getElementById('table_content').innerHTML = template;

    index_number.innerHTML = `Search Reults:  <span id='real_number' class="badge bg-secondary">` + res + `</span>`;
}


search_box.addEventListener('focus',function(){
    index_number.style.top='-37px';
}
);

search_box.addEventListener('blur',function(){
    index_number.style.top='0px';
}
);
