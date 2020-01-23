let signalR = require("@microsoft/signalr");

export default function connectSignalR() {
    let connection = new signalR.HubConnectionBuilder()
        .withUrl("/messageHub")
        .build();

    //TODO: Might want to move this code to another place?
    // connection.on("ReceiveMessage", data => console.log("Message received: ", data));

    connection.start();
    return connection;
}