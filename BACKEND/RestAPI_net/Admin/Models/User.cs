using System;
using System.Collections.Generic;

namespace Admin.Models;

public partial class User
{
    public int Userid { get; set; }

    public string? Password { get; set; }

    public string? Firstname { get; set; }

    public string? Lastname { get; set; }

    public string? Email { get; set; }

    public long Mobno { get; set; }

    public string? Address { get; set; }

    public int? Stateid { get; set; }

    public int? Cityid { get; set; }

    public int? Rid { get; set; }

    public string? SecurityQuestion { get; set; }

    public string? SecurityAnswer { get; set; }

    public DateTime? CreatedAt { get; set; }

    public virtual ICollection<BloodRequest> BloodRequests { get; set; } = new List<BloodRequest>();

    public virtual City? City { get; set; }

    public virtual ICollection<Donor> Donors { get; set; } = new List<Donor>();

    public virtual ICollection<HbDetail> HbDetails { get; set; } = new List<HbDetail>();

    public virtual Role? RidNavigation { get; set; }

    public virtual State? State { get; set; }
}
