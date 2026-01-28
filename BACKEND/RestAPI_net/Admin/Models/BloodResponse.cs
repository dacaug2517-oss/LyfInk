using System;
using System.Collections.Generic;

namespace Admin.Models;

public partial class BloodResponse
{
    public int Resid { get; set; }

    public int Brid { get; set; }

    public byte[]? Comment { get; set; }

    public string? Status { get; set; }

    public virtual BloodRequest Br { get; set; } = null!;
}
