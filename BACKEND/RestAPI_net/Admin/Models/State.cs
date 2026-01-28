using System;
using System.Collections.Generic;

namespace Admin.Models;

public partial class State
{
    public int Stateid { get; set; }

    public string? Statename { get; set; }

    public virtual ICollection<BloodRequest> BloodRequests { get; set; } = new List<BloodRequest>();

    public virtual ICollection<City> CitySidNavigations { get; set; } = new List<City>();

    public virtual ICollection<City> CityStates { get; set; } = new List<City>();

    public virtual ICollection<DonationCamp> DonationCamps { get; set; } = new List<DonationCamp>();

    public virtual ICollection<User> Users { get; set; } = new List<User>();
}
