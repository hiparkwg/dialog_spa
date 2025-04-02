document.querySelector(".btnAlert").onclick = ()=>{
    alert("normal alert");
}
document.querySelector(".btnConfirm").onclick = ()=>{
    confirm("normal confirm");
}
document.querySelector(".btnPrompt").onclick = ()=>{
    prompt("normal prompt");
}

// dialog alert
document.querySelector(".btnDialogAlert").onclick = ()=>{
    const dialogAlert = document.querySelector(".alert");
    //dialogAlert.show();//modeless type
    dialogAlert.showModal(); // modal type
    const btnClose = dialogAlert.querySelector(".alertClose");
    btnClose.addEventListener("click", ()=>{
        dialogAlert.close();
    })
}

// dialog confirm
document.querySelector(".btnDialogConfirm").onclick = ()=>{
    const dialogConfirm = document.querySelector(".confirm");
    dialogConfirm.showModal(); // modal type
    const btnOK = dialogConfirm.querySelector(".btnOK");
    btnOK.addEventListener("click", ()=>{
        dialogConfirm.close();
    })
}

// dialog prompt
document.querySelector(".btnDialogPrompt").onclick = ()=>{
    const dialogPrompt = document.querySelector(".prompt");
    dialogPrompt.showModal(); // modal type
    const btnOK = dialogPrompt.querySelector(".btnOK");
    btnOK.addEventListener("click", ()=>{
        dialogPrompt.close();
    })
}

// 천단위 분리기호추가
function toChangeFormat(tag){
    let value = tag.value.replace(/,/g, '')
    if( !isNaN(value) && value !==""){ //공백이 아닌 숫자인경우
        tag.value = new Intl.NumberFormat().format(value);
    }
    computeAmt();
}
function computeAmt(){
    let amt=0;
    let ea = document.querySelector(".ea").value;
    let price = document.querySelector(".price").value;

    ea = Number( ea.replace(/,/g, ''));
    price = Number(price.replace(/,/g, ''));
    amt = ea * price;
    document.querySelector(".amt").value = 
            new Intl.NumberFormat().format(amt);
}


// dialog form (SPA)
document.querySelector(".btnDialogForm").onclick = ()=>{
   fetch("/html/dialog_input.html")
   .then(resp=> resp.text())
   .then(html=>{
        let parser = new DOMParser();
        let doc = parser.parseFromString(html, "text/html");
        let dialog = doc.querySelector("#dialog_input");
        document.body.appendChild(dialog);
        dialog.showModal();

        dialog.querySelector("#btnInput").addEventListener("click", ()=>{
            let frm = dialog.querySelector("#frmInput");
            sendData(frm);
            document.body.removeChild(dialog);
            dialog.close();
        });
        dialog.querySelector("#btnCancle").addEventListener("click", ()=>{
            document.body.removeChild(dialog);
            dialog.close();
        });

   })
}

function sendData(frm){
    //천단위 분리기호가 붙어있는 숫자를 일반숫자로
    frm.ea.value = frm.ea.value.replace(/,/g, '')
    frm.price.value = frm.price.value.replace(/,/g, '')
    frm.amt.value = frm.amt.value.replace(/,/g, '')

    let formData = new FormData(frm);
    fetch("/dialog", {
        method : "POST",
        body : formData
    }).then(resp=> resp.json())
    .then(data=>{
        document.querySelector("#result").innerHTML = data.message;
    })
}