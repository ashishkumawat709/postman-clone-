//initialize no of parametrs
let addedParamCount = 0;

//utility func to get dom element from string
function getElementFromString(string) {
    let div = document.createElement('div');
    div.innerHTML= string;
    return div.firstElementChild;
}



///hiding the parametersbox initially
let parametersBox = document.getElementById('parametersBox')
parametersBox.style.display='none';

//if user clicks on params box then hide the json box
let paramsRadio = document.getElementById('paramsRadio')
paramsRadio.addEventListener('click',()=>{
    document.getElementById('requestJsonBox').style.display='none';
    document.getElementById('parametersBox').style.display='block';
})


//if user clicks on json box then hide the params box

let jsonRadio = document.getElementById('jsonRadio')
jsonRadio.addEventListener('click',()=>{
    document.getElementById('requestJsonBox').style.display='block';
    document.getElementById('parametersBox').style.display='none';
})

//if user clicks on + button then add parameters
let addParam = document.getElementById('addParam')
addParam.addEventListener('click',()=>{
    let params = document.getElementById('params')
    let string =   `<div class="form-row my-2">
    <label for="url" class="col-sm-2 col-form-label">Parameter ${addedParamCount +2}</label>
    <div class=" col-md-4">
        <input type="text" class="form-control" id="parameterKey${addedParamCount +2}" placeholder="Enter parameter ${addedParamCount +2} key">
    </div>
    <div class=" col-md-4">
        <input type="text" class="form-control" id="parameterValue${addedParamCount +2}" placeholder="Enter parameter ${addedParamCount +2} value">
    </div>
    <button id="addParam" class="btn btn-primary deleteParam">-</button>
</div>`

//convert the elelemnt string to dom mode
let paramElement =  getElementFromString(string);
params.appendChild(paramElement)

//adding an evenet listener to remove the parameter when clicked on -
let  deleteParam = document.getElementsByClassName('deleteParam')
for(item of deleteParam){
    item.addEventListener('click',(e)=>{
        e.target.parentElement.remove()
    })
}
addedParamCount++;
})

//if user clicks on submit button
let submit = document.getElementById('submit')
submit.addEventListener('click',()=>{
    //show please wait in the response box
    document.getElementById('responseJsonText').value='please wait...fetching response'
    //fetch all the values that user entered
    let url = document.getElementById('url').value
    let requestType = document.querySelector("input[name='requestType']:checked").value
    let contentType = document.querySelector("input[name='contentType']:checked").value

   

    //if user selects params option then collect parameters in a object
    if(contentType=='params'){
        data ={};
        for(i=0; i<addedParamCount+1;i++){
            if(document.getElementById('parameterKey' + (i+1)) != undefined){
                let key = document.getElementById('parameterKey' + (i+1)).value
                let value = document.getElementById('parameterValue' + (i+1)).value
                data[key]=value;
            }
        }
        data = JSON.stringify(data)
    }
    else{
        data = document.getElementById('requestJsonText').value
    }
    console.log(url);
    console.log(requestType);
    console.log(contentType);
    console.log(data);


    if(requestType=='GET'){
        fetch(url,{
            method: 'GET',
        })
        .then(response => response.text())
        .then((text)=>{
            document.getElementById('responseJsonText').value=text;
        })
    }
    else{
        fetch(url,{
            method: 'POST',
            body:data,
            headers:{
                "Content-type":"application/json; charset=UTF-8"
            }
        })
        .then(response => response.text())
        .then((text)=>{
            document.getElementById('responseJsonText').value=text;
        })
    }
})