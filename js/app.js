//Select Elements
const clear= document.querySelector(".clear");
const dateElement= document.querySelector(".date");
const list= document.getElementById("list");
const input= document.getElementById("input");


//Classes Name
const CHECK ="fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

//Variables
let LIST=[],
id =0;

//get item from local storage
let data=localStorage.getItem("TODO");
//check if data is not empty
if(data){
  LIST = JSON.parse(data);
  id=LIST.length;
  loadList(LIST);
}else{
  LIST=[];
  id=0;
}

//load items to UI
function loadList(array) {
  array.forEach(function(item){
    addToDo(item.name, item.id, item.done, item.trash);
  })
}

//clear the local storage
clear.addEventListener("click", function (){
  localStorage.clear();
  location.reload();
})

//Show today's date
const options = {weekday:"long", month: "short", day:"numeric"};
const today = new Date();
dateElement.innerHTML=today.toLocaleDateString("en-US", options);

// Add to do function

function addToDo(todo, id, done, trash){

  if(trash){return;}
  const DONE = done ? CHECK : UNCHECK;
  const LINE = done ? LINE_THROUGH : ""
  const position= "beforeend";
  const item = `<li class="item">
    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
    <p class="text ${LINE}">${todo}</p>
    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
  </li>`
  list.insertAdjacentHTML(position, item);
}

//Add an item to the list when hit the enter key
document.addEventListener("keyup",function(event){
  if(event.keyCode==13){
    const toDo=input.value;
    //if not empty then addToDo
    if(toDo){
      addToDo(toDo,id,false,false);

      LIST.push({
        name : toDo,
        id : id,
        done : false,
        trash : false,
      });

      //add item to localstorage (this code must be added everywhere we update the LIST array )
      localStorage.setItem("TODO",JSON.stringify(LIST));

      id++;
      //Emptying the input field.
      input.value = "";
    }
  }
});

//complete to do
function completeToDo(element) {
  element.classList.toggle(CHECK);
  element.classList.toggle(UNCHECK);
  element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

  LIST[element.id].done = LIST[element.id].done ? false : true;
}

//remove to do
function removeToDo(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);
  LIST[element.id].trash = true;
}

//target the items created dynamically
list.addEventListener("click",function (event) {
  const element = event.target; //return the clicked element inside list
  const elementJob = element.attributes.job.value; //complete or delete

  if(elementJob=="complete"){
    completeToDo(element);
  }else if(elementJob=="delete"){
    removeToDo(element);
  }

  //add item to localstorage (this code must be added everywhere we update the LIST array )
  localStorage.setItem("TODO",JSON.stringify(LIST));
});
