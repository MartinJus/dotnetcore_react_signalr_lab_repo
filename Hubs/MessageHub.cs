using Microsoft.AspNetCore.SignalR;
using System;
using System.Threading.Tasks;

namespace SignalR.Hubs
{
    public class MessageHub : Hub
    {
        public async Task SendMessage(string message)
        {
            Console.WriteLine($"Should send message {message}");
            var dateobj = DateTime.UtcNow;
            var datestring = dateobj.ToShortDateString() + $" ({dateobj.ToShortTimeString()})";
            await Clients.All.SendAsync("ReceiveMessage", message, datestring);
        }

        public async Task UpdateJobProgress(string connectionId, string jobId, int progress) 
        {
            Console.WriteLine($"Sending update job to {connectionId} for job {jobId}, progress is: {progress}");
            await Clients.Client(connectionId).SendAsync("UpdateJobProgress", jobId, progress);
        }
    }
}