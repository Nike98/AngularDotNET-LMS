using API.Entity;
using Microsoft.EntityFrameworkCore;

namespace API
{
    public class Context : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<BookCategory> BookCategories { get; set; }
        public DbSet<Book> Books{ get; set; }
        public DbSet<Order> Orders{ get; set; }

        public Context(DbContextOptions<Context> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasData(new User()
            {
                ID = 1,
                FirstName = "Admin",
                LastName = "",
                Email = "admin@gmail.com",
                MobileNumber = "1234567890",
                AccountStatus = AccountStatus.ACTIVE,
                UserType = UserType.ADMIN,
                Password = "admin1998",
                CreatedOn = new DateTime(2024, 01, 18, 14, 01, 30)
            });

            modelBuilder.Entity<BookCategory>().HasData(
                new BookCategory { ID = 1, Category = "Computer", SubCategory = "Algorithm"},    
                new BookCategory { ID = 2, Category = "Computer", SubCategory = "Programming Languages"},    
                new BookCategory { ID = 3, Category = "Computer", SubCategory = "Networing"},    
                new BookCategory { ID = 4, Category = "Computer", SubCategory = "Hardware"},    
                new BookCategory { ID = 5, Category = "Mechanical", SubCategory = "Machine"},    
                new BookCategory { ID = 6, Category = "Mechanical", SubCategory = "Transfer of Energy"},    
                new BookCategory { ID = 7, Category = "Mathematics", SubCategory = "Calculus"},    
                new BookCategory { ID = 8, Category = "Mathematics", SubCategory = "Algebra"}    
            );
        }

        protected override void ConfigureConventions(ModelConfigurationBuilder configurationBuilder)
        {
            configurationBuilder.Properties<UserType>().HaveConversion<string>();
            configurationBuilder.Properties<AccountStatus>().HaveConversion<string>();
        }
    }
}
