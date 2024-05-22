let loaderCls = 'loader';
let containerCls = 'container';
let hiddenElement = 'hiddenElement';
$(document).ready(function() {
    makeDataTable();
    
});
async function makeDataTable() {
    showLoader();
    let text = await readTextFile('input/input.txt');
    setTextToTable(text);
    $("#example").DataTable();
    $('#dt-length-0').addClass('m-2');
    hideLoader();
}
function showLoader(){
    $('.'+loaderCls).removeClass(hiddenElement);
    $('.'+containerCls).addClass(hiddenElement);
}
function hideLoader(){
    $('.'+loaderCls).addClass(hiddenElement);
    $('.'+containerCls).removeClass(hiddenElement);
}
function readTextFile(file)
{

    return new Promise((resolve) => {
        let rawFile = new XMLHttpRequest();
        rawFile.open("GET", file, false);
        rawFile.onreadystatechange = function ()
        { 
            if(rawFile.readyState === 4)
            {
                if(rawFile.status === 200 || rawFile.status == 0)
                { 
                    setTimeout(() => {
                        resolve(rawFile.responseText);
                      }, 2000);
                    
                }
            }
        }
        rawFile.send(null);
      });

    
}

function setTextToTable(text){
    let splitByLine = text.split('\n');
    let tr ='';
    let td ='';
    let red = 'bg-danger';
    let yellow = 'bg-warning';
    let bgColor = '';
    splitByLine.forEach((line,i) => {
        if(!isBlank(line)) {
            bgColor = '';
            if(i%3 == 1) bgColor=red;
            else if(i%3 == 2) bgColor = yellow;
            tr += `<tr>`;
            td = '';
            let splitByWord = line.split('\t');
            splitByWord.forEach((word) => {
                td += `<td class=${bgColor}>${word.trim()}</td>`;
                
            });
            tr += td;
            tr += `</tr>`;
        }
    });
    $('#tbody').append(tr);
    
}

function isBlank(str) {
    return (!str || /^\s*$/.test(str));
}