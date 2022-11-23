using System.Collections.Generic;

namespace Sabio.Models.Domain
{
    public class UserBase : IUserAuthData
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public IEnumerable<string> Roles { get; set; }
        public IEnumerable<int> Organizations { get; set; }
        public object TenantId { get; set; }
        public int CurrentOrgId { get; set; }
    }
}