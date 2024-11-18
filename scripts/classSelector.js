const select2 = document.getElementById("oddelekSelect");
const select = document.getElementById("sole").addEventListener("change", check);
document.addEventListener("DOMContentLoaded",  check);
function check(){
    console.log(document.getElementById("sole").value);
    switch (parseInt(document.getElementById("sole").value)) {
        case 1:
            console.log("here");
            removeAllChildElements(select2);

            console.log(typeof(ae1));
            fill("ae",1 , 4);
            fill("ce",1 , 3);
            fill("ra", 1, 4);
            fill("rb", 1, 4);
            fill("rc", 1, 3);
            fill("rd", 1, 4);
            fill("ne",4 ,5);
            fill("nr",4 ,5);
            break;

            case 2:
                removeAllChildElements(select2);
                fill("ir", 1, 2);
                fill("mr", 1 ,2);
                break;
            
        case 3:
            removeAllChildElements(select2);
            fill("gh",1,3);
            fill("gp",1,3);
            fill("gt",1,3);
            fill("kt",1,4);
            fill("nt",1,4);
            fill("s",1,3);
            fill("žt",4,5);

            break;

        case 4:
            removeAllChildElements(select2);
            fill("asa",1,1);
            fill("asb",1,1);
            fill("is",1,3);
            fill("isv",1,2);
            fill("lt",1,4);
            fill("me",1,3);
            fill("ml",1,3);
            fill("ok",1,3);
            fill("ol",1,2);
            fill("pk",1,2);
            fill("st",1,4);
            fill("tm",1,4);
            fill("as",2,3);
            fill("okv",3,3);
            fill("nas",4,5);
            fill("nl",4,5);
            fill("ns",4,5);
            fill("ntm",4,5);
            break;

        case 5:
            removeAllChildElements(select2);
            fill("ab",1,3);
            fill("az",1,4);
            fill("bz",1,4);
            fill("cz",1,1);
            fill("ga",1,4);
            fill("gb",1,3);
            break;

        case 7:
            removeAllChildElements(select2);
            fill("aa",1,3);
            fill("aet",1,4);
            fill("at",1,3);
            fill("bet",1,4);
            fill("cet",1,1);
            fill("detpti",1,2);
            fill("bet",1,4);
            break;
        default:
           removeAllChildElements(select2);
           let opt = document.createElement("option");
           opt.text = "---";
           opt.value = "null";
           select2.appendChild(opt);
            break;
    }

}



function removeAllChildElements(parrent){
    while(parrent.lastElementChild){
        parrent.removeChild(parrent.lastElementChild);
    }
}

function fill(name, start ,count) {
    for (let i = start; i <= count; i++) {
        const option = document.createElement("option");
        option.value = name + i;
        option.text = i + ". " +name.toUpperCase();
        select2.appendChild(option);
    }
}