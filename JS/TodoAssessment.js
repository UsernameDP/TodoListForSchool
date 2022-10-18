const display_main = document.getElementById("display_main");
const display_todo_info_input = document.getElementById("display_todo_info_input");

const display_todo_text = document.getElementById("display_todo_text");
const display_todo_date = document.getElementById("display_todo_date");
const display_todo_values = document.getElementById("display_todo_values")





//Displaying Todo and Assessment Section
function display_class_render(){
    display_main.innerHTML = '';

    class_list.forEach((subject) =>{
        //Class Section
        const display_div = document.createElement("div");
        display_div.setAttribute('id', "section" + subject.id);
        display_div.setAttribute('class', "section");
        display_main.append(display_div);

        const subject_info = document.createElement("div");
        subject_info.setAttribute('class', "class_header")
        display_div.append(subject_info);

        const subject_pd = document.createElement("p");
        subject_pd.innerText = "PD" + subject.period;
        subject_info.append(subject_pd);

        const subject_name = document.createElement("p");
        subject_name.innerText =  subject.name;
        subject_info.append(subject_name);

        //assignmnet Section
        stuff_in_class(display_div, subject.id, "todo", "Todo", "class_todo");
        stuff_in_class(display_div, subject.id, "test", "Tests" , "class_test");

        section_display_anim();
    })
}

function stuff_in_class(display_div, subject_id, stuff,stuff_text , stuff_indiv){
    const stuff_section = document.createElement("div");
    stuff_section.setAttribute('id', stuff +subject_id);
    stuff_section.setAttribute('class', "stuff");
    display_div.append(stuff_section);

    const stuff_header= document.createElement("div");
    stuff_header.innerText = stuff_text;
    stuff_header.setAttribute('class', "stuff_header");
    stuff_section.append(stuff_header);

    const stuff_button = document.createElement("button");
    stuff_button.innerText = "Add";
    stuff_button.onclick = input_values
    stuff_header.append(stuff_button);

    const stuff_loc = document.createElement("div");
    stuff_loc.setAttribute('id', stuff_indiv + subject_id);
    stuff_loc.setAttribute('class', "stuff_indiv");
    stuff_section.append(stuff_loc);   
}

//Todo and Assessments
function input_values(){
    display_todo_date.value = "";
    display_todo_text.value = "";
    const parent_id = event.target.parentNode.parentNode.id;
    const loc_id = (parent_id) => {
        if (parent_id.includes("todo")){
            const split = parent_id.split("todo")[1]
            return "class_todo" + split
        }
        else if (parent_id.includes("test")){
            const split = parent_id.split("test")[1]
            return "class_test" + split
        }
    }
    display_todo_info_input.style.display = "flex";
    document.getElementById(loc_id(parent_id)).appendChild(display_todo_info_input);            
}

function display_add_stuff(){

    const assignment = display_todo_text.value;
    const inputdate = display_todo_date.value;
    if (assignment == ""){
        display_todo_info_input.style.display = "none";
        alert("The assignment name needs to be specified");
        return
    }

    const date_rec = inputdate.split("-");
    const date = new Date(date_rec[0], date_rec[1] - 1, date_rec[2]);

    const parent_id = event.target.parentNode.parentNode.id;
    if (parent_id.includes("class_todo")){
        const loc_id = parent_id.split("class_todo")[1];
        todo_list[loc_id].push({
        name: assignment,
        year: date.getFullYear(),
        month: date.getMonth(),
        day: date.getDate(),
        inputdate: inputdate,
    })

    display_render_stuff(todo_list, "todo", "class_todo");
    emph_missing_todo();   
    }
    else if (parent_id.includes("class_test")){
        const loc_id = parent_id.split("class_test")[1];
        test_list[loc_id].push({
        name: assignment,
        year: date.getFullYear(),
        month: date.getMonth(),
        day: date.getDate(),
        inputdate: inputdate,
    })

    save_data();
    display_render_stuff(test_list, "test", "class_test");
    }
}

//Renders the todos to the page, adds date, and sets id per todo
function display_render_stuff(list, stuff_name, stuff_text){
let index = 0;
list.forEach(function (inner_list){
    const element = document.getElementById(stuff_text + index);
    element.innerHTML = '';
    index += 1;
})

//Assign Date and Todo Number with respect to its location
let list_index = 0;
list.forEach(function (inner_list){
    index = 0;
    inner_list.forEach(function (stuff){
        if (stuff.year == null || stuff.month == null || stuff.day == null){
            date = null
        }
        else{
            const date = new Date(stuff.year, stuff.month, stuff.day);
            Object.assign(stuff, {date: date});
        }
        const id = stuff_name + index + "loc"+list_index;
        Object.assign(stuff, {id: id});
        index += 1
    })
    
    display_stuff_sort(inner_list);
    list_index += 1;
})
save_data();

list_index = 0;
list.forEach(function (list){
    index = 0;
    list.forEach(function (object){
        const location = document.getElementById(stuff_text + list_index);

        const element = document.createElement("div");
        element.setAttribute('id', object.id);
        element.setAttribute('class', "every_single_stuff");
        location.append(element);

        const stuff_text_info = document.createElement('p');
        stuff_text_info.innerText = object.name + "\n" + object.inputdate;
        element.append(stuff_text_info);

        const button = document.createElement("button");
        button.innerText = "Done";
        button.onclick = display_remove_todo
        element.append(button);
    })
    list_index += 1
})
}

//Sorts the list in the parameter by date
function display_stuff_sort(list){
list.sort((a,b) => {
    return a.date - b.date
})
}

function display_remove_todo(){
const targetLoc = event.target.parentNode.id.split("loc")[1];
const targetID = event.target.parentNode.id;

if (targetID.includes("todo")){
    to_remove(todo_list, targetLoc, targetID);
    save_data();
    display_render_stuff(todo_list, "todo", "class_todo");
    emph_missing_todo();   
}
else if(targetID.includes("test")){
    to_remove(test_list, targetLoc, targetID);
    save_data();
    display_render_stuff(test_list, "test", "class_test");
}
}


function to_remove(list, targetLoc,targetID){
list[targetLoc] = list[targetLoc].filter((stuff)=>{
    if (String(stuff.id) == String(targetID)){
        return false
    }
    else if (String(stuff.id) != String(targetID)){
        return true
    }
}
)}