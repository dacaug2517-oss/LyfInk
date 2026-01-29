using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Admin.Models
{
    [Table("blood_stock")]
    public class BloodStock
    {
        [Key]
        [Column("bsid")]
        public int Bsid { get; set; }

        [Column("hbid")]
        public int Hbid { get; set; }

        [Column("bcid")]
        public int Bcid { get; set; }

        [Column("ml")]
        public int Ml { get; set; }

        [Column("expiry_date")]
        public DateTime ExpiryDate { get; set; }
        [JsonIgnore]
        public virtual BloodComponent? Bc { get; set; }

        [JsonIgnore]
        public virtual HbDetail? Hb { get; set; }
    }
}
