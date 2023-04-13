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
                    handleResponse(response)
                }
            })
            .catch(error => console.error(error));
    } catch (error) {
        console.log("Error:", error);
    }
}

var gameResponse;
function handleResponse(response) {
    gameResponse = response;
    // Game Title
    document.getElementById('name').innerHTML = response.Name;
    console.log("Name = " + response.Name)

    // Game Story
    document.getElementById('storyline').innerHTML = response.Storyline;
    console.log("Storyline = " + response.Storyline)

    // Boxart
    let boxart_img = document.createElement("img");
    boxart_img.src = response.Boxart;
    let boxart = document.getElementById("boxart");
    boxart.append(boxart_img);
    console.log("Cover url = " + response.Boxart)

    // Gameplay
    var tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    console.log(document.getElementsByTagName('script'))
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

}

var player;
function onYouTubeIframeAPIReady() {
    console.log(gameResponse.VideoId);
    player = new YT.Player('gameplay', {
        height: '390',
        width: '640',
        videoId: gameResponse.VideoId
    });
}