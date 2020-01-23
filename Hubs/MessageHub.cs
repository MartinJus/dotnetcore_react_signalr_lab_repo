using Microsoft.AspNetCore.SignalR;
using System;
using System.Threading.Tasks;

namespace SignalR.Hubs
{
    public class MessageHub : Hub//, IMessageHub
    {
        // public MessageHub() {
            
        // }

        // public override async Task OnConnectedAsync() {
        //     // Console.WriteLine($"Client with id {Context.ConnectionId} connected.");
        //     await OnConnectedAsync();
        // }

        public async Task SendMessage(string message)
        {
            Console.WriteLine($"Should send message {message}");
            var dateobj = DateTime.UtcNow;
            var datestring = dateobj.ToShortDateString() + $" ({dateobj.ToShortTimeString()})";
            await Clients.All.SendAsync("ReceiveMessage", message, datestring);
        }

        public async Task UpdateJobProgress(string connectionId, string jobId, int progress) 
        {
            await Clients.Client(connectionId).SendAsync("UpdateJobProgress", jobId, progress);
        }
    }
}