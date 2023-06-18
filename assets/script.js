 const popup = document.querySelector(".popup"),
 wififIcon = document.querySelector(".icon"),
 popupTitle = document.querySelector(".popup .title"),
 popupDesc = document.querySelector(".desc");
 reconnectBtn = document.querySelector(".reconnect");
 
 let isOnline = true, intervalId, timer = 10;
 
 const checkConnection = async () => {
    try {
        //Try to fetch random data from the API. If the status code
        // Is between 200 and 300, the network connection is online.
        const response = await fetch("https://jsonplaceholder.typicode.com/posts"); 
        isOnline = response.status >= 200 && response.status < 300;
        console.log(response);
    } catch (error) {
        console.log(error);
        isOnline = false; // If there is an error, the connection is offline
    }
    clearInterval(intervalId);
    handlePopup(isOnline);

 }

 const handlePopup = (status) => {
    if(status) { // If the status is true (Online), update icon, title, and description accordignly
        return popup.classList.remove("show")
        wififIcon.className = "uil uil-wifi";
        popupTitle.innterText = "Restored Connection";
        popupDesc.innerHTML = "Your device is now successfully connected to the internet.";
        popup.classList.add("online");
        return setTimeout(() => popupclasslist.remove("show"), 2000);
    }
    //If the status is false (Offline), update icon, title, and description accordingly
    wififIcon.className = "uil uil-wifi-slash";
    popupTitle.innterText = "Lost Connection";
    popupDesc.innerHTML = "Your network is unavailable. We will attempt to reconnect you in <b>10</b> seconds";
    popup.className = "popup show";

    intervalId = setInterval(() => { // set an interval to decrease the timer by 1 every second
        timer--;
        if(timer === 0) checkConnection(); //If the timer reaches 0, check the connection again
        popup.querySelector(".desc b").innterText = timer;

    }, 1000);
 }

 // Only if isOnline is true, check the connection status every 3 seconds
 setInterval(() => isOnlien && checkConnection(), 3000);

 reconnectBtn.addEventListener("click", checkConnection);