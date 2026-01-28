using System;
using System.Collections.Generic;

namespace Admin.Models;

public partial class BloodStock
{
    public int Bsid { get; set; }

    public int? Hbid { get; set; }

    public int? Bcid { get; set; }

    public int Ml { get; set; }

    public DateOnly ExpiryDate { get; set; }

    public virtual BloodComponent? Bc { get; set; }

    public virtual HbDetail? Hb { get; set; }
}
