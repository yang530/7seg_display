const form = document.getElementById("loginForm");
const bLogin = document.getElementById("bLogin");
const bCreate = document.getElementById("bCreate");
const bDel = document.getElementById("bDel");

if(bLogin != null && bCreate != null){
    bLogin.addEventListener("click", loginAcc);
    bCreate.addEventListener("click", createAcc);
}

if(bDel != null){
    bDel.addEventListener("click", deleteAcc);
}

function loginAcc(){
    form.action = "./php/process_login.php";
    form.submit();
}

function createAcc(){
    form.action = "./php/process_create.php";
    form.submit();
}

function deleteAcc(){

    if(confirm("ARE YOU SURE? DELETED ACCOUNT MAY NOT BE RECOVERED") == true){
        form.action = "./php/delete_user.php";
        form.submit();
    }

}