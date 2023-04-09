let topic=""
let notes=[]
let topics=[]
let notes_p=[]
let inputEl=document.getElementById("input-el")
let startBtn=document.getElementById("start-btn")
let doneBtn=document.getElementById("done-btn")
let deleteBtn=document.getElementById("delete-btn")
let prevBtn=document.getElementById("prev-btn")
let tlEl = document.getElementById("tl-el")
let nlEl = document.getElementById("nl-el")
let tabBtn=document.getElementById("tab-btn")
const notesFromLocalStorage = JSON.parse( localStorage.getItem("notes") )
if (notesFromLocalStorage) {
    notes = notesFromLocalStorage
    startnotes()
}
const topicsFromLocalStorage = localStorage.getItem("topic") 
if (topicsFromLocalStorage) {
    topic = topicsFromLocalStorage
    rendertopic()
}




startBtn.addEventListener("click", function() {
    topic=inputEl.value
    inputEl.value = ""
    notes=[]
   localStorage.setItem("topic", topic )
   if(topic){
    inputEl.style.display="none"
    startBtn.style.display="none"


}

    rendertopic()
})


function rendertopic(){
    
       
        tlEl.innerHTML = topic
    

    }
function startnotes(){
    let listItems = ""
    for (let i = 0; i < notes.length; i++) {
        listItems += `
           <li>
                <a target='_blank' href='${notes[i]}'>
                    ${notes[i]}
                </a>
            
            </li>
        `
    }
    nlEl.innerHTML = listItems
}
tabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        notes.push(tabs[0].url)
        localStorage.setItem("notes", JSON.stringify(notes) )
        startnotes()
    });
});
prevBtn.addEventListener("click",function(){
    let topicitems=""
    for(let i=0;i<topics.length;i++){
      topicitems=topics[i]
     let listitems=""
    for (let j = 0; j < notes_p[i].length; j++) {
    listitems+= `
           <li>
                <a target='_blank' href='${notes_p[i][j]}'>
                    ${notes_p[i][j]}
                </a>
            
            </li>
        `
    }

    tlEl.innerHTML+=topicitems+listitems
    
}
inputEl.style.display="block"
    startBtn.style.display="inline-block"
})


doneBtn.addEventListener("click",function(){
    
    topics.push(topic)
   notes_p.push(notes)
    console.log(topics)
    console.log(notes_p)


    topic=""
    notes=[]

    inputEl.style.display="block"
    startBtn.style.display="inline-block"
    rendertopic()
    startnotes()
    
    

})
deleteBtn.addEventListener("click",function(){
    notes.pop()
    startnotes()
    //console.log(notes)
})