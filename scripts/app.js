const nonImpIcon = "far fa-star";
const ImpIcon = "fas fa-star";
var isImportant = false;
var displayPanel = true;

function toogleImportant(){
    console.log("Icon clicked!");
    if(isImportant == false){
        $("#icon-important").removeClass(nonImpIcon).addClass(ImpIcon);
        isImportant=true;
    }else{
        $("#icon-important").removeClass(ImpIcon).addClass(nonImpIcon);
        isImportant=false;
    }

}

function tooglePanel(){
    console.log("Panel toogled!");
    if(displayPanel==false){
        $(".pnlForm").fadeOut();
        displayPanel=true;
    }else{
        $(".pnlForm").fadeIn();
        displayPanel=false;
    }
}

function init(){
    console.log("Task Manager");

    //Load data

    // Hook events
    $("#icon-important").click(toogleImportant);
    $("#btnShowHide").click(tooglePanel);
    
}

window.onload = init;