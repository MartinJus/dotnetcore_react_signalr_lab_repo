using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SignalR.Hubs;

namespace asyncProgressTest.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<WeatherForecastController> _logger;
        private readonly MessageHub _messageHub;
        public WeatherForecastController(ILogger<WeatherForecastController> logger, MessageHub messageHub)
        {
            _logger = logger;
            _messageHub = messageHub;
        }

        [HttpGet]
        public IEnumerable<WeatherForecast> Get()
        {
            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = rng.Next(-20, 55),
                Summary = Summaries[rng.Next(Summaries.Length)]
            })
            .ToArray();
        }

        [HttpGet("sendSignalMessage/{message}")]
        public async Task<IActionResult> SendSignalMessage(string message) {
            await _messageHub.SendMessage(message);
            return new OkResult();
        }

        [HttpGet("backgroundjob/{signalRClientId}")]
        public async Task<IActionResult> SimulateBackgroundJob(string signalRClientId) {

            Guid jobId = Guid.NewGuid();

            Task.Run(async () => {
                for (int i = 0; i <= 100; i += 10)
                {
                    await _messageHub.UpdateJobProgress(signalRClientId, jobId.ToString(), i);
                    var rand = new Random();
                    await Task.Delay(rand.Next(550,1750));
                };
            });

            return new OkObjectResult(jobId);
        }
    }
}
