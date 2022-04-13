
$(document).ready(function()
{

//selectionner le container principal
const container = document.querySelector("#container");
// selectionner l input
const input = document.querySelector("input");
// declarer un tableau qui va contenir les objets
let arrayoftasks=[];


// si l objet tasks exit affecter cet objet au tableau des objets
if(localStorage.getItem("tasks2")){
    arrayoftasks = JSON.parse(localStorage.getItem("tasks2"));
}

// charger les informations appartir du localstorage
getdatafromlocalstorage();


// ajouter l objet au tableau
  $("button").click(  function(){
        if(input.value!==""){
                    addtasktoarray(input.value);
                    input.value="";
        }
        else alert("ecrire qlq chose svp!")

    
});



// fonction qui ajout un objet au tableau
function addtasktoarray(tasktext){

            const taskk = {
                id: Date.now(),// j ai choisit la date comme id car il est unique
                title: tasktext,// le label de l objet
                completed: false,// boolean qu indique l etat de l objet
            };

            //l ajout 
            arrayoftasks.push(taskk);
            // ajouter l element au local storage
            adddatatolocalfrom(arrayoftasks);
               // ajouter l element a notre page
               addelementtopagefrom(arrayoftasks);
}



//fonction qui fait l ajout de  l element a notre page
function addelementtopagefrom(arrayoftasks){
                container.innerHTML=""; 
                let task;// declarer une variable
                arrayoftasks.forEach((taskk)=>{
                    
                    // creer le container qui contient notre objet
                        task =  `<div class="task" id="${taskk.id}">
                    <span class="icon-thumb-tack icon">     </span>
                    <p class="task-text" id="${taskk.id-30}">
                    ${   taskk.title  }
                    </p>
                    <div id="${taskk.id+3}">
                        <span class="icon-trash-o icon">     </span>
                        <span class="icon-frustrated2 icon" id="${taskk.id-300}">     </span>
                    
                    </div>
                </div>`;
             
               
            // l ajout du task
                container.innerHTML += task;
                if(taskk.completed == true)
                {
                    // declaration du span qui contient l icon 
                    let heart = `<span class="icon-heart"></span>`;
                  // ajouter la classe dn et la classe finish au task
                    $(`#${taskk.id-300}`).addClass("dn");
                  $(`#${taskk.id-30}`).addClass("finish");
                   // ajouter l element au div
                    $(`#${taskk.id+3}`).append(heart);
                    taskk.completed=false;
                }
               
                });
 input.focus();
}



//fonction qui fait l ajout de  l element au localstorage
function adddatatolocalfrom(arrayoftasks){
       window.localStorage.setItem("tasks2",JSON.stringify(arrayoftasks));
}


//fonction qui charge les informations  appartir du localstorage
function getdatafromlocalstorage()
{
    // affecter l objet task2 au variable data
                let data = window.localStorage.getItem("tasks2");
                if(data){
                    let tasks = JSON.parse(data);
                    // charger l element en notre page 
                addelementtopagefrom(tasks);
                }
}







// la fonction principal  responsable au different evenements
container.addEventListener("click",(eo)=>
{

    // menu de choix
                switch(eo.target.className){
                    // si l element concerne par cet event a la class:icon-trash-o icon
                    case "icon-trash-o icon":
                     let aa =  eo.target.parentElement.parentElement.getAttribute("id");
                        //on elimine l element pere du pere du l element concerne par la class
                        deleteTaskWith(eo.target.parentElement.parentElement.getAttribute("id"));
                        $(`#${aa}`).hide(500);
                        
                        break;
                    
                    // sinon si si l element concerne par cet event a la class:icon-frustrated2 icon
                    case "icon-frustrated2 icon":
                        finishTasWith(eo.target.parentElement.parentElement.getAttribute("id"));
                        // ajouter la classe dn a l icon
                        eo.target.classList.add("dn");
                        // declarer la nouvelle icon
                        const heart = `<span class="icon-heart">     </span>`;
                       //ajouter l icon au div 
                        eo.target.parentElement.parentElement.querySelector(".task-text").classList.add("finish");
                // ajouter div au div principal
                    eo.target.parentElement.innerHTML += heart;
                    break;
                    // sinon si si l element concerne par cet event a la class:icon-heart
                    case "icon-heart":
                        
                        infinishTasWith(eo.target.parentElement.parentElement.getAttribute("id"));
                        // ajouter la class finish au div dont la class (task-text)
                        eo.target.parentElement.parentElement.querySelector(".task-text").classList.remove("finish");
                        // ajouter la class dn a l icon
                        eo.target.classList.add("dn");
                        // creer nouvelle span qui contient l icon
                        const angry = ` <span class="icon-frustrated2 icon">     </span>  `;
                        //ajouter le span cree au div
                        eo.target.parentElement.innerHTML+=angry;break;
                    

                    // pour mettre une tache au debut
                    case "icon-thumb-tack icon":
                    // ajouter la class jaune au icon
                        eo.target.classList.add("jaune");
                        container.prepend(eo.target.parentElement);break;
                    
                    //pour mettre une tache a la fin
                    case "icon-thumb-tack icon jaune":
                    
                        eo.target.classList.remove("jaune");
                        container.append(eo.target.parentElement);break;

                    default : break;    
                
                }
});
 


// fonction qui supprime un element appartir du localstorage
function deleteTaskWith(taskid)
{
        arrayoftasks = arrayoftasks.filter((taskk)=> taskk.id != taskid);
        adddatatolocalfrom(arrayoftasks);
}


// fonction qui indique q une tache est deja faite dans localstorge
function finishTasWith(taskid)
{
    // parcourir les elements
        for(let i=0;i<arrayoftasks.length;i++)
        {
            //trouver l element
            if(arrayoftasks[i].id == taskid){
          
            if( arrayoftasks[i].completed == false) 
            {     arrayoftasks[i].completed = true;   }
            else
            {
                arrayoftasks[i].completed = false;
            }
        }  
        }
        adddatatolocalfrom(arrayoftasks);
}


// fonction qui indique q une tache n est pas faite dans localstorge

function infinishTasWith(taskid)
{  
    //parcourir les elements
        for(let i=0;i<arrayoftasks.length;i++)
        {
            //trouver l element
            if(arrayoftasks[i].id == taskid){
            
            if( arrayoftasks[i].completed == true) 
            {(arrayoftasks[i].completed = false);   }
        }  
        }
        adddatatolocalfrom(arrayoftasks);
}

});
