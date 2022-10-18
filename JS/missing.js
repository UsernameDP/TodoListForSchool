function missing_stuff(){
    const date_cur = new Date();
    date_cur.setHours(0,0,0,0);
    let missing_todo_idx = 0;
    let missing_test_idx = 0;
    todo_list.forEach((list) =>{
        list.forEach((item) => {
            if (item.date < date_cur && item.date != null){
                const element = document.createElement("div");
                element.setAttribute('class', 'missing_indv');
                document.getElementById('missing_todo').append(element);
                Object.assign(item, {Missing: true});

                // const element_info = document.createElement('div');
                const loc_id = (element) => element == list;
                const class_index = todo_list.findIndex(loc_id);
                const class_name = class_list[class_index].name;
                // element_info.innerText = class_name + item.name + item.inputdate;
                // element.append(element_info);

                function add_info(element, text){
                    const sub_element = document.createElement("div");
                    sub_element.innerText = text;
                    element.append(sub_element);
                }
                    
                add_info(element, class_name);
                add_info(element, item.name);
                add_info(element,item.inputdate);
                missing_todo_idx += 1;
        }
        })
    })
    let list_index = 0;
    let index = 0;
    let remove_test = [];
    test_list.forEach((list) =>{
        list.forEach((item) => {
            if (item.date < date_cur){
                const element = document.createElement("div");
                document.getElementById('missing_test').append(element);
                
                const element_info = document.createElement('div');
                element_info.innerText = item.name + "\n" + item.inputdate;
                element.append(element_info);
                missing_test_idx += 1;

                remove_test.push({
                    list: list_index,
                    index: index,
                    id: item.id,
                })
        }
        index += 1
        })
        index = 0;
        list_index += 1
    })

    if (missing_test_idx != 0 || missing_todo_idx != 0){
        $(function (){
            $("#missing_stuff_main").slideDown(1000);
        });
    }

    

    function missing_button(){
        $(function (){
            const Yes = $("#missing_test figure button:nth-child(1)");
            const No = $("#missing_test figure button:nth-child(2)");
    
            Yes.addClass('test_remove_button');
            No.click(function (){
                Yes.removeClass('test_remove_button');
                No.addClass('test_remove_button');
            })
            Yes.click(function (){
                No.removeClass('test_remove_button');
                Yes.addClass('test_remove_button');
            })

            
            const close = $("#missing_close");
    
            close.click(function (){
                $("#missing_stuff_main").slideUp(1000);
                if (Yes.attr('class') == "test_remove_button" && remove_test.length != 0){
                    const wait_time = 2000
                    for (x in remove_test){
                        const info = remove_test[x];
                        const list_check = test_list[info.list];

                        const period_loc = (item) => {item.id == info.id}
                        list_check.splice(period_loc, 1);

                        const object = $("#" + info.id);
                        object.addClass('remove_test')
                        setTimeout(() => {
                            object.css('transform','scale(0)');                           
                        }, wait_time);
                    }
                    setTimeout(()=>{
                        display_render_stuff(test_list, "test", "class_test");
                    },wait_time + 500);  
                }
                emph_missing_todo();          
            })

        })


    }
    
    missing_button();
}

function emph_missing_todo(){
    $(function (){
        todo_list.forEach((list)=>{
            list.forEach((item)=>{
                if (item.Missing == true){
                    const element = $("#"+item.id);
                    element.addClass('emp_todo');
                }
            })
        })
    })
}