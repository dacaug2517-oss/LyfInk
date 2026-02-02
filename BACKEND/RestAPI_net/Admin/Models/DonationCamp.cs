using System;
using System.Collections.Generic;

namespace Admin.Models;

public partial class DonationCamp
{
    public int Cid { get; set; }

    public int? Hbid { get; set; }

    public string? CampName { get; set; }

    public string? Venue { get; set; }

    public DateOnly Date { get; set; }          // if MySQL DATE
    public TimeSpan FromTime { get; set; }      // MySQL TIME
    public TimeSpan ToTime { get; set; }        // MySQL TIME

    
    public string? ContactPerson { get; set; }

    public string? Address { get; set; }

    public int Stateid { get; set; }

    public int Cityid { get; set; }

    public virtual City City { get; set; } = null!;

    public virtual HbDetail? Hb { get; set; }

    public virtual State State { get; set; } = null!;
}
