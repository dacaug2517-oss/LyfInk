using System;
using System.Collections.Generic;

namespace Admin.Models;

public partial class DonorDonation
{
    public int Ddid { get; set; }

    public int Did { get; set; }

    public DateOnly DonatedDate { get; set; }

    public int Hbid { get; set; }

    public int Units { get; set; }

    public virtual Donor DidNavigation { get; set; } = null!;

    public virtual HbDetail Hb { get; set; } = null!;
}
