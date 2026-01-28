using System;
using System.Collections.Generic;

namespace Admin.Models;

public partial class Donor
{
    public int Did { get; set; }

    public int? Uid { get; set; }

    public DateOnly Dob { get; set; }

    public string? Gender { get; set; }

    public int Bcid { get; set; }

    public string? MedicalHistory { get; set; }

    public virtual BloodComponent Bc { get; set; } = null!;

    public virtual ICollection<DonorDonation> DonorDonations { get; set; } = new List<DonorDonation>();

    public virtual User? UidNavigation { get; set; }
}
