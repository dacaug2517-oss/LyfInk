using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql.Scaffolding.Internal;

namespace Admin.Models;

public partial class P17BloodbankContext : DbContext
{
    public P17BloodbankContext()
    {
    }

    public P17BloodbankContext(DbContextOptions<P17BloodbankContext> options)
        : base(options)
    {
    }

    public virtual DbSet<BloodComponent> BloodComponents { get; set; }

    public virtual DbSet<BloodRequest> BloodRequests { get; set; }

    public virtual DbSet<BloodResponse> BloodResponses { get; set; }

    public virtual DbSet<BloodStock> BloodStocks { get; set; }

    public virtual DbSet<City> Cities { get; set; }

    public virtual DbSet<DonationCamp> DonationCamps { get; set; }

    public virtual DbSet<Donor> Donors { get; set; }

    public virtual DbSet<DonorDonation> DonorDonations { get; set; }

    public virtual DbSet<HbDetail> HbDetails { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<Role1> Roles1 { get; set; }

    public virtual DbSet<State> States { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseMySql("server=localhost;port=3306;user=root;password=root;database=p17_bloodbank", Microsoft.EntityFrameworkCore.ServerVersion.Parse("8.2.0-mysql"));

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .UseCollation("utf8mb4_0900_ai_ci")
            .HasCharSet("utf8mb4");

        modelBuilder.Entity<BloodComponent>(entity =>
        {
            entity.HasKey(e => e.Bcid).HasName("PRIMARY");

            entity.ToTable("blood_component");

            entity.Property(e => e.Bcid).HasColumnName("bcid");
            entity.Property(e => e.BcName)
                .HasMaxLength(255)
                .HasColumnName("bc_name");
            entity.Property(e => e.Category).HasColumnName("category");
        });

        modelBuilder.Entity<BloodRequest>(entity =>
        {
            entity.HasKey(e => e.Brid).HasName("PRIMARY");

            entity.ToTable("blood_request");

            entity.HasIndex(e => e.Bcid, "bc_id__idx");

            entity.HasIndex(e => e.Cityid, "c_id_idx");

            entity.HasIndex(e => e.Stateid, "s_id_idx");

            entity.HasIndex(e => e.Uid, "u_id_idx");

            entity.Property(e => e.Brid).HasColumnName("brid");
            entity.Property(e => e.Bcid).HasColumnName("bcid");
            entity.Property(e => e.Cityid).HasColumnName("cityid");
            entity.Property(e => e.ContactNo)
                .HasMaxLength(255)
                .HasColumnName("contact_no");
            entity.Property(e => e.Purpose)
                .HasMaxLength(255)
                .HasColumnName("purpose");
            entity.Property(e => e.Quantity).HasColumnName("quantity");
            entity.Property(e => e.RequestDate).HasColumnName("request_date");
            entity.Property(e => e.Requiredby).HasColumnName("requiredby");
            entity.Property(e => e.Stateid).HasColumnName("stateid");
            entity.Property(e => e.Uid).HasColumnName("uid");

            entity.HasOne(d => d.Bc).WithMany(p => p.BloodRequests)
                .HasForeignKey(d => d.Bcid)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("bc_id_");

            entity.HasOne(d => d.City).WithMany(p => p.BloodRequests)
                .HasForeignKey(d => d.Cityid)
                .HasConstraintName("c_id");

            entity.HasOne(d => d.State).WithMany(p => p.BloodRequests)
                .HasForeignKey(d => d.Stateid)
                .HasConstraintName("s_id");

            entity.HasOne(d => d.UidNavigation).WithMany(p => p.BloodRequests)
                .HasForeignKey(d => d.Uid)
                .HasConstraintName("u_id");
        });

        modelBuilder.Entity<BloodResponse>(entity =>
        {
            entity.HasKey(e => e.Resid).HasName("PRIMARY");

            entity.ToTable("blood_response");

            entity.HasIndex(e => e.Brid, "brid_idx");

            entity.Property(e => e.Resid).HasColumnName("resid");
            entity.Property(e => e.Brid).HasColumnName("brid");
            entity.Property(e => e.Comment)
                .HasColumnType("tinyblob")
                .HasColumnName("comment");
            entity.Property(e => e.Status)
                .HasMaxLength(255)
                .HasColumnName("status");

            entity.HasOne(d => d.Br).WithMany(p => p.BloodResponses)
                .HasForeignKey(d => d.Brid)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("brid");
        });

        modelBuilder.Entity<BloodStock>(entity =>
        {
            entity.HasKey(e => e.Bsid).HasName("PRIMARY");

            entity.ToTable("blood_stock");

            entity.HasIndex(e => e.Bcid, "bcid_idx");

            entity.HasIndex(e => e.Hbid, "hbid_idx");

            entity.Property(e => e.Bsid).HasColumnName("bsid");
            entity.Property(e => e.Bcid).HasColumnName("bcid");
            entity.Property(e => e.ExpiryDate).HasColumnName("expiry_date");
            entity.Property(e => e.Hbid).HasColumnName("hbid");
            entity.Property(e => e.Ml).HasColumnName("ml");

            entity.HasOne(d => d.Bc).WithMany(p => p.BloodStocks)
                .HasForeignKey(d => d.Bcid)
                .HasConstraintName("bc_id");

            entity.HasOne(d => d.Hb).WithMany(p => p.BloodStocks)
                .HasForeignKey(d => d.Hbid)
                .HasConstraintName("hb_id");
        });

        modelBuilder.Entity<City>(entity =>
        {
            entity.HasKey(e => e.Cityid).HasName("PRIMARY");

            entity.ToTable("city");

            entity.HasIndex(e => e.Stateid, "FKjplsg2m37wyk1i801650u601j");

            entity.HasIndex(e => e.Sid, "sid_idx");

            entity.Property(e => e.Cityid).HasColumnName("cityid");
            entity.Property(e => e.Cityname)
                .HasMaxLength(255)
                .HasColumnName("cityname");
            entity.Property(e => e.Sid).HasColumnName("sid");
            entity.Property(e => e.Stateid).HasColumnName("stateid");

            entity.HasOne(d => d.SidNavigation).WithMany(p => p.CitySidNavigations)
                .HasForeignKey(d => d.Sid)
                .HasConstraintName("sid");

            entity.HasOne(d => d.State).WithMany(p => p.CityStates)
                .HasForeignKey(d => d.Stateid)
                .HasConstraintName("FKjplsg2m37wyk1i801650u601j");
        });

        modelBuilder.Entity<DonationCamp>(entity =>
        {
            entity.HasKey(e => e.Cid).HasName("PRIMARY");

            entity.ToTable("donation_camp");

            entity.HasIndex(e => e.Cityid, "city_id_idx");

            entity.HasIndex(e => e.Hbid, "hb_id_idx");

            entity.HasIndex(e => e.Stateid, "stateid_idx");

            entity.Property(e => e.Cid).HasColumnName("cid");
            entity.Property(e => e.Address)
                .HasMaxLength(255)
                .HasColumnName("address");
            entity.Property(e => e.CampName)
                .HasMaxLength(255)
                .HasColumnName("camp_name");
            entity.Property(e => e.Cityid).HasColumnName("cityid");
            entity.Property(e => e.ContactPerson)
                .HasMaxLength(255)
                .HasColumnName("contact_person");
            entity.Property(e => e.Date).HasColumnName("date");
            entity.Property(e => e.FromTime).HasColumnName("from_time");
            entity.Property(e => e.Hbid).HasColumnName("hbid");
            entity.Property(e => e.Stateid).HasColumnName("stateid");
            entity.Property(e => e.ToTime).HasColumnName("to_time");
            entity.Property(e => e.Venue)
                .HasMaxLength(255)
                .HasColumnName("venue");

            entity.HasOne(d => d.City).WithMany(p => p.DonationCamps)
                .HasForeignKey(d => d.Cityid)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("city_id");

            entity.HasOne(d => d.Hb).WithMany(p => p.DonationCamps)
                .HasForeignKey(d => d.Hbid)
                .HasConstraintName("hb_id_");

            entity.HasOne(d => d.State).WithMany(p => p.DonationCamps)
                .HasForeignKey(d => d.Stateid)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("state_id");
        });

        modelBuilder.Entity<Donor>(entity =>
        {
            entity.HasKey(e => e.Did).HasName("PRIMARY");

            entity.ToTable("donor");

            entity.HasIndex(e => e.Bcid, "bcid_idx");

            entity.HasIndex(e => e.Uid, "uid_idx");

            entity.Property(e => e.Did).HasColumnName("did");
            entity.Property(e => e.Bcid).HasColumnName("bcid");
            entity.Property(e => e.Dob).HasColumnName("dob");
            entity.Property(e => e.Gender)
                .HasMaxLength(255)
                .HasColumnName("gender");
            entity.Property(e => e.MedicalHistory)
                .HasMaxLength(255)
                .HasColumnName("medical_history");
            entity.Property(e => e.Uid).HasColumnName("uid");

            entity.HasOne(d => d.Bc).WithMany(p => p.Donors)
                .HasForeignKey(d => d.Bcid)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("bcid");

            entity.HasOne(d => d.UidNavigation).WithMany(p => p.Donors)
                .HasForeignKey(d => d.Uid)
                .HasConstraintName("uid");
        });

        modelBuilder.Entity<DonorDonation>(entity =>
        {
            entity.HasKey(e => e.Ddid).HasName("PRIMARY");

            entity.ToTable("donor_donations");

            entity.HasIndex(e => e.Did, "did_idx");

            entity.HasIndex(e => e.Hbid, "hbid_idx");

            entity.Property(e => e.Ddid).HasColumnName("ddid");
            entity.Property(e => e.Did).HasColumnName("did");
            entity.Property(e => e.DonatedDate).HasColumnName("donated_date");
            entity.Property(e => e.Hbid).HasColumnName("hbid");
            entity.Property(e => e.Units).HasColumnName("units");

            entity.HasOne(d => d.DidNavigation).WithMany(p => p.DonorDonations)
                .HasForeignKey(d => d.Did)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("did");

            entity.HasOne(d => d.Hb).WithMany(p => p.DonorDonations)
                .HasForeignKey(d => d.Hbid)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("hbid");
        });

        modelBuilder.Entity<HbDetail>(entity =>
        {
            entity.HasKey(e => e.Hbid).HasName("PRIMARY");

            entity.ToTable("hb_details");

            entity.HasIndex(e => e.Uid, "uid_idx");

            entity.Property(e => e.Hbid).HasColumnName("hbid");
            entity.Property(e => e.GstNo)
                .HasMaxLength(255)
                .HasColumnName("gst_no");
            entity.Property(e => e.HbEmail)
                .HasMaxLength(255)
                .HasColumnName("hb_email");
            entity.Property(e => e.HbName)
                .HasMaxLength(255)
                .HasColumnName("hb_name");
            entity.Property(e => e.HbPhno).HasColumnName("hb_phno");
            entity.Property(e => e.RegNo)
                .HasMaxLength(255)
                .HasColumnName("reg_no");
            entity.Property(e => e.Type).HasColumnName("type");
            entity.Property(e => e.Uid).HasColumnName("uid");

            entity.HasOne(d => d.UidNavigation).WithMany(p => p.HbDetails)
                .HasForeignKey(d => d.Uid)
                .HasConstraintName("userid");
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.Rid).HasName("PRIMARY");

            entity.ToTable("role");

            entity.Property(e => e.Rid).HasColumnName("rid");
            entity.Property(e => e.Rname)
                .HasMaxLength(255)
                .HasColumnName("rname");
        });

        modelBuilder.Entity<Role1>(entity =>
        {
            entity.HasKey(e => e.Rid).HasName("PRIMARY");

            entity.ToTable("roles");

            entity.Property(e => e.Rid).HasColumnName("rid");
            entity.Property(e => e.Rname)
                .HasMaxLength(255)
                .HasColumnName("rname");
        });

        modelBuilder.Entity<State>(entity =>
        {
            entity.HasKey(e => e.Stateid).HasName("PRIMARY");

            entity.ToTable("state");

            entity.Property(e => e.Stateid).HasColumnName("stateid");
            entity.Property(e => e.Statename)
                .HasMaxLength(255)
                .HasColumnName("statename");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Userid).HasName("PRIMARY");

            entity.ToTable("users");

            entity.HasIndex(e => e.Cityid, "cityid_idx");

            entity.HasIndex(e => e.Rid, "rid_idx");

            entity.HasIndex(e => e.Stateid, "stateid_idx");

            entity.Property(e => e.Userid).HasColumnName("userid");
            entity.Property(e => e.Address)
                .HasMaxLength(255)
                .HasColumnName("address");
            entity.Property(e => e.Cityid).HasColumnName("cityid");
            entity.Property(e => e.CreatedAt)
                .HasMaxLength(6)
                .HasColumnName("created_at");
            entity.Property(e => e.Email)
                .HasMaxLength(255)
                .HasColumnName("email");
            entity.Property(e => e.Firstname)
                .HasMaxLength(255)
                .HasColumnName("firstname");
            entity.Property(e => e.Lastname)
                .HasMaxLength(255)
                .HasColumnName("lastname");
            entity.Property(e => e.Mobno).HasColumnName("mobno");
            entity.Property(e => e.Password)
                .HasMaxLength(255)
                .HasColumnName("password");
            entity.Property(e => e.Rid).HasColumnName("rid");
            entity.Property(e => e.SecurityAnswer)
                .HasMaxLength(255)
                .HasColumnName("security_answer");
            entity.Property(e => e.SecurityQuestion)
                .HasMaxLength(255)
                .HasColumnName("security_question");
            entity.Property(e => e.Stateid).HasColumnName("stateid");

            entity.HasOne(d => d.City).WithMany(p => p.Users)
                .HasForeignKey(d => d.Cityid)
                .HasConstraintName("cityid");

            entity.HasOne(d => d.RidNavigation).WithMany(p => p.Users)
                .HasForeignKey(d => d.Rid)
                .HasConstraintName("rid");

            entity.HasOne(d => d.State).WithMany(p => p.Users)
                .HasForeignKey(d => d.Stateid)
                .HasConstraintName("stateid");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
