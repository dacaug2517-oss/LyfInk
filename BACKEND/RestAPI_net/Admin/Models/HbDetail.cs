using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Admin.Models;

public partial class HbDetail
{
    public int Hbid { get; set; }

    public string? HbName { get; set; }

    public long HbPhno { get; set; }

    public string? RegNo { get; set; }

    public string? GstNo { get; set; }

    public int? Uid { get; set; }

    public string? Type { get; set; }

    public string? HbEmail { get; set; }

    public string? HbPassword { get; set; }

    // Navigation
    public virtual User? UidNavigation { get; set; }

    public virtual ICollection<BloodStock> BloodStocks { get; set; } = new List<BloodStock>();
    [JsonIgnore]
    public virtual ICollection<DonationCamp> DonationCamps { get; set; } = new List<DonationCamp>();

    public virtual ICollection<DonorDonation> DonorDonations { get; set; } = new List<DonorDonation>();
}
