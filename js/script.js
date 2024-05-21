$(document).ready(function() {
    readTextFile('input/input.txt');
});
  function readTextFile(file)
{
    let rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    { 
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            { 
                let allText = rawFile.responseText;
                setTextToTable(allText);
            }
        }
    }
    rawFile.send(null);
}

function setTextToTable(text){
    let splitByLine = text.split('\n');
    let tr ='';
    let td ='';
    splitByLine.forEach((line) => {
        tr += `<tr>`;
        td = '';
        let splitByWord = line.split('\t');
        splitByWord.forEach((word) => {
            td += `<td>${word.trim()}</td>`;
            
        });
        console.log(td);
        tr += td;
        tr += `</tr>`;

    });
    $('#tbody').append(tr);
    $("#example").DataTable();
}