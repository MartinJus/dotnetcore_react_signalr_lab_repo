using System.Threading.Tasks;

namespace SignalR.Hubs
{
    public interface IMessageHub
    {
        Task SendMessage(string message);
        Task UpdateJobProgress(string connectionId, string jobId, string message); 
    }
}