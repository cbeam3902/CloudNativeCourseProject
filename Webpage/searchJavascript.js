function search_game() {
    let input = document.getElementById('searchbar').value;
    
    console.log(input);
    location.href = "./Resultpage.html?input="+input;
}

function webpage_load(){
    let params = new URLSearchParams(document.location.search);
    let input = params.get("input");
    console.log(input);

    document.getElementById('test').innerHTML = "You typed in "+input;
}