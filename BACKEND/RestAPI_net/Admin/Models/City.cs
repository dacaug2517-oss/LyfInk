using System;
using System.Collections.Generic;

namespace Admin.Models;

public partial class City
{
    public int Cityid { get; set; }

    public string? Cityname { get; set; }

    public int? Sid { get; set; }

    public int? Stateid { get; set; }

    public virtual ICollection<BloodRequest> BloodRequests { get; set; } = new List<BloodRequest>();

    public virtual ICollection<DonationCamp> DonationCamps { get; set; } = new List<DonationCamp>();

    public virtual State? SidNavigation { get; set; }

    public virtual State? State { get; set; }

    public virtual ICollection<User> Users { get; set; } = new List<User>();
}
