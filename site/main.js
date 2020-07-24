import request from "./request.js";

const main = async ()=>{
    
    let tasks = await request("/tasks", 'GET');
    document.getElementById("tasks").innerHTML = 
    tasks.map(task=>`
        <div id='${task.id}'> 
            ${task.title} 
            <input type="checkbox" ${task.is_completed ? 'checked': ""} class="completed">
            <button class="delete" id="delete_${task.id}">Delete</button> 
        </div>
    `).sort((a,b)=>a.id-b.id).join("");
    
    document.querySelectorAll(".completed").forEach(box=>{
        box.addEventListener('change', async (evt)=>{
            let result = await request(`/edit-task/${evt.target.parentNode.id}/complete_task`, 'PATCH')
        })
    })
    
    
}

const submit = async ()=>{
    let value = document.querySelector("input").value;
    let response = await request("/new-task", 'POST', {title:value})
}   

document.querySelector("button").addEventListener("click", submit);
main();