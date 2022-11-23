using Microsoft.AspNetCore.Mvc;
using Sabio.Services;
using Sabio.Web.Controllers;
using Microsoft.Extensions.Logging;
using Sabio.Web.Models.Responses;
using System;
using Sabio.Models.Requests;
using Sabio.Models.Enums;
using System.Security.Claims;
using Sabio.Services.Interfaces;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/emails")]
    [ApiController]
    public class EmailsApiController : BaseApiController
    {

        private IEmailsService _service = null;
        private IUserService _userService = null;
        private IAuthenticationService<int> _authService = null;
        public EmailsApiController(IUserService userService,IEmailsService service, IAuthenticationService<int> authService,
            ILogger<EmailsApiController> logger
           ) : base(logger)
        { 
            _service = service;
            _userService = userService;
            _authService = authService;
        }


        [HttpPost]
        public ActionResult<ItemResponse<int>> Create(EmailsAddRequest model)
        {

            ObjectResult result = null;

            try
            {            
                
                _service.WelcomeEmail();
                ItemResponse<int> response = new ItemResponse<int>();
                result = Created201(response);
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                ErrorResponse response = new ErrorResponse(ex.Message);
                result = StatusCode(500, response);
            }

            return result;
        }
        [HttpPost("contact")]
        public ActionResult<ItemResponse<int>> OnContact(ContactUsAddRequest model)
        {

            ObjectResult result = null;

            try
            {
               _service.ContactUsEmail(model);
               _service.SendConfirmContactUsEmail(model);

                ItemResponse<int> response = new ItemResponse<int>();
                result = Created201(response);
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                ErrorResponse response = new ErrorResponse(ex.Message);
                result = StatusCode(500, response);
            }

            return result;
        }



        [HttpPost("phishing")]
        public ActionResult<ItemResponse<int>> Add(PhishingAddRequest model)
        {

            ObjectResult result = null;

            try
            {
                int tokenTypeId = (int)TokenType.TrainingEvent;
                string token = Guid.NewGuid().ToString();
                int id = _authService.GetCurrentUserId();

                _service.PhishingEmail(token, model);
                _userService.AddUserToken(token, id, tokenTypeId);

                ItemResponse<int> response = new ItemResponse<int>();
                result = Created201(response);
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                ErrorResponse response = new ErrorResponse(ex.Message);
                result = StatusCode(500, response);
            }

            return result;
        }
    }
}
