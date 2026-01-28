using System;
using System.Collections.Generic;

namespace Admin.Models;

public partial class BloodComponent
{
    public int Bcid { get; set; }

    public string? BcName { get; set; }

    public int? Category { get; set; }

    public virtual ICollection<BloodRequest> BloodRequests { get; set; } = new List<BloodRequest>();

    public virtual ICollection<BloodStock> BloodStocks { get; set; } = new List<BloodStock>();

    public virtual ICollection<Donor> Donors { get; set; } = new List<Donor>();
}
