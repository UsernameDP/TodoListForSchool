const class_main = document.getElementById("class_main");
const class_sub = document.getElementById("class_sub");
const class_append_location = document.getElementById("class_append_location");

// Inputs for Class Info
const class_period = document.getElementById("class_period");
const class_name = document.getElementById("class_name");
const class_addButton = document.getElementById("class_addButton");
const class_close = document.getElementById("Class_Close");







//Class Assosiation Section
function add_Classes(){
    const period = class_period.value;
    const name = class_name.value;
            //skips if there is nothing in period of name
    if (period == ""){
        alert("Period is not specified");
        return
    }
    else if(name == ""){
        alert("Class is not Specified");
        return
    }
    //Prevents having two of the same Period
    for (let x in class_list){
        if (class_list[x].period == period){
            alert("You can't have two of the same Period!");
            return
        }
    }

            //Adds Classes to a List
    class_list.push({
        period: period,
        name: name,
    })
    sort_class();
    class_render();

        //Finding the index of the same period once sorted
    const find_period_loc = (subject) => subject.period == period;
    const period_loc = class_list.findIndex(find_period_loc);
        //Adding the blank list at the same index once list was sorted
    todo_list.splice(period_loc,0,[]);            
    test_list.splice(period_loc,0,[]);

    display_class_render();
    display_render_stuff(todo_list, "todo", "class_todo");
    display_render_stuff(test_list, "test", "class_test");
    save_data();
    class_period.value = "";
    class_name.value = "";
}
    //Sorts the Classes in the class_list by period #
function sort_class(){
    class_list.sort((subjectA, subjectB) =>{
        return subjectA.period - subjectB.period;
    })
}
    //Render the Class
function class_render(){
    class_append_location.innerHTML = '';
    let id_index = 0;
    class_list.forEach(function (subject){
        //This will Tie the class_list to todo_list when a subject is removed
        //Also resets the ID every time thing function is ran
        Object.assign(subject, {id: id_index});      

            //Div to store the Class Information in
        const element = document.createElement("div");
        element.setAttribute('id', "Subject"+id_index);
        element.innerText = "Period:" + subject.period + "\n" + "Subject: " + subject.name + "\n";
        class_append_location.appendChild(element);

            //Button To remove A class
        const button = document.createElement("button");
        button.innerText = "Remove";
        button.id = "Class_Remove_Button" + id_index;
        button.onclick = remove_class
        document.getElementById("Subject" + id_index).appendChild(button);

        id_index += 1;
    })
}
    //Removes the Class and FINALLY...Also removes the respective todo_list
function remove_class(){
    const targetID = parseInt(event.target.id.split("Class_Remove_Button")[1]);
    
    class_list = class_list.filter((subject) =>{
        if (subject.id == targetID){
            const find_loc_id = (element) => element.id == subject.id
            const loc_id = class_list.findIndex(find_loc_id);
            todo_list.splice(loc_id, 1);
            test_list.splice(loc_id, 1);
            return false
        }
        else if(subject.id != targetID){
            return true
        }
    })
    class_render();
    display_class_render();
    save_data();
    display_render_stuff(todo_list, "todo", "class_todo");
    display_render_stuff(test_list, "test", "class_test");
}
function close_class_main(){
    class_main.style.display = "none";
    class_main_open_button.style.display = "block";
}