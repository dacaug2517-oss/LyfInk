using System;
using System.Collections.Generic;

namespace Admin.Models;

public partial class BloodRequest
{
    public int Brid { get; set; }

    public int? Uid { get; set; }

    public int? Bcid { get; set; }

    public int Quantity { get; set; }

    public DateOnly? RequestDate { get; set; }

    public DateOnly? Requiredby { get; set; }

    public string? Purpose { get; set; }

    public string? ContactNo { get; set; }

    public int? Stateid { get; set; }

    public int? Cityid { get; set; }

    public virtual BloodComponent? Bc { get; set; }

    public virtual ICollection<BloodResponse> BloodResponses { get; set; } = new List<BloodResponse>();

    public virtual City? City { get; set; }

    public virtual State? State { get; set; }

    public virtual User? UidNavigation { get; set; }
}
