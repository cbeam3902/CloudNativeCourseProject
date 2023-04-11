package main

import (
	"encoding/json"
	"log"
	"net/http"
	"os"
)

func main() {
	var sd serverData
	sd.TwitchID = os.Getenv("twitchAPIID")
	sd.TwitchAccess = os.Getenv("twitchAPIAccess")
	sd.YoutubeKey = os.Getenv("youtubeAPIKey")

	fs := http.FileServer(http.Dir("../Webpage/"))
	http.Handle("/", fs)
	http.HandleFunc("/search", sd.search)
	log.Fatal(http.ListenAndServe(":8002", nil)) // Begin and log the server
}

type serverData struct {
	TwitchID     string
	TwitchAccess string
	YoutubeKey   string
}

type GameNameInput struct {
	Name string
}

type ResponseOutput struct {
	Result  string
	Name    string
	VideoId string
}

func (sd *serverData) search(w http.ResponseWriter, req *http.Request) {
	var gameName GameNameInput
	defer req.Body.Close()
	if req.Method == "POST" {
		if err := json.NewDecoder(req.Body).Decode(&gameName); err != nil {
			log.Println(req.Body)
			var response ResponseOutput
			response.Result = "nok"
			response.Name = "void"
			response.VideoId = "void"
			w.Header().Set("Access-Control-Allow-Origin", "*")
			w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
			w.Header().Set("Content-Type", "application/json")
			_ = json.NewEncoder(w).Encode(response)
			log.Fatal(err.Error())
		}
		log.Println(gameName.Name)

		var response ResponseOutput
		response.Result = "ok"
		response.Name = gameName.Name
		response.VideoId = "abc123"
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		w.Header().Set("Content-Type", "application/json")

		if err := json.NewEncoder(w).Encode(&response); err != nil {
			log.Fatal(err.Error())
		}
	}
}
