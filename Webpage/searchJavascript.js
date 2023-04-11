function search_game() {
    let input = document.getElementById('searchbar').value;
    
    console.log(input);
    location.href = "./Resultpage.html?input="+input;
}

async function webpage_load(){
    let params = new URLSearchParams(document.location.search);
    let input = params.get("input");
    console.log(input);
    document.getElementById('test').innerHTML = "You typed in "+input;
    var data = {
        Name: input
    }
    console.log({
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    try {
        await fetch("/search", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (!response.ok) {
                    console.log("Not OK response!");
                    console.log(response)
                    return null;
                }
                return response.json()
            })
            .then(response => {
                if (response) {
                    console.log(response)
                }
            })
            .catch(error => console.error(error));
    } catch (error) {
        console.log("Error:", error);
    }
}