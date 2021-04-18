using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace Model.EF
{
    public partial class UnisContext : DbContext
    {
        public UnisContext()
        {
        }

        public UnisContext(DbContextOptions<UnisContext> options)
            : base(options)
        {
        }

        public virtual DbSet<User> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Data Source=ADMIN\\TVHUNG;Initial Catalog=Unis;Integrated Security=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            //modelBuilder.Entity<User>(entity =>
            //{
            //    entity.ToTable("User");

            //    entity.Property(e => e.Id)
            //        .ValueGeneratedNever()
            //        .HasColumnName("ID")
            //        .HasComment("Khoá chính");

            //    entity.Property(e => e.Password)
            //        .IsRequired()
            //        .HasMaxLength(100)
            //        .HasComment("Mật khẩu");

            //    entity.Property(e => e.UserName)
            //        .IsRequired()
            //        .HasMaxLength(100)
            //        .HasComment("Tên tài khoản");
            //});

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
