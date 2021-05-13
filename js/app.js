//Define UI variables
const form=document.querySelector('#task-form');
const taskList=document.querySelector('.collection');
const clearBtn=document.querySelector('.clear-tasks');
const taskInput=document.querySelector('#task');
const filter=document.querySelector('#filter');

//Load all event listeners
loadEventListeners();

function loadEventListeners(){
    //DOM load event
    document.addEventListener('DOMContentLoaded', getTasks);
    //add task event
    form.addEventListener('submit', addTask);
    //remove task event
    taskList.addEventListener('click', removeTask);
    //clear task event
    clearBtn.addEventListener('click', clearTasks);
    //Filter tasks
    filter.addEventListener('keyup', filterTasks);
}

//Get tasks from LS
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks')==null){
        tasks=[];
    }else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        //Create li element
        const li=document.createElement('li');
        //Add class
        li.className='collection-item';
        //Create text node and append to li
        li.appendChild(document.createTextNode(task.value));

        //Create new link element
        const link=document.createElement('a');
        //Add class
        link.className='delete-item secondary-content';
        //Add icon html
        link.innerHTML='<i class="fa fa-remove"></i>';
        //Append the link to li
        li.appendChild(link);

        //Append li to ul
        taskList.appendChild(li);

    });
}

//Add task
function addTask(e){
    if(taskInput.value === ''){
        alert('Add a task');
    }
    
    //Create li element
    const li=document.createElement('li');
    //Add class
    li.className='collection-item';
    //Create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));

    //Create new link element
    const link=document.createElement('a');
    //Add class
    link.className='delete-item secondary-content';
    //Add icon html
    link.innerHTML='<i class="fa fa-remove"></i>';
    //Append the link to li
    li.appendChild(link);

    //Append li to ul
    taskList.appendChild(li);

    //Store in localstorage
    storeTask(taskInput.value);

    //clear input
    taskInput.value='';
    //console.log(li);
    e.preventDefault();
}

//Store task function
function storeTask(task){
    let tasks;
    if(localStorage.getItem('tasks') == null){
        tasks=[];
    }else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Remove Task //Event delegation
function removeTask(e){
    if (e.target.parentElement.classList.contains('delete-item')) { //just a condition to pick the icon
        // console.log(e.target);
        if (confirm('Are you sure?')) {
            e.target.parentElement.parentElement.remove();
            
            //Remove task from local storage
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

//Remove from local storage
function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks=[];
    }else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify('tasks'));
}
function clearTasks(){
    //taskList.innerHTML='';

    //Faster
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }

    //Clear from LS
    clearTasksFromLocalStorage();
}

//Clear tasks from LS
function clearTasksFromLocalStorage(){
    localStorage.clear();
}

function filterTasks(e){
    const text=e.target.value.toLowerCase(); 
    document.querySelectorAll('.collection-item').forEach(function(task){
        const item=task.firstChild.textContent;
        //console.log(item);
        if(item.toLocaleLowerCase().indexOf(text) != -1){
            task.style.display='block';
        }else{
            task.style.display='none';
        }
    });
}