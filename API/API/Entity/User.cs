namespace API.Entity
{
    public class User
    {
        public int ID { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string MobileNumber { get; set; } = string.Empty;
        public DateTime CreatedOn { get; set; }
        public UserType UserType { get; set; } = UserType.NONE;
        public AccountStatus AccountStatus { get; set; } = AccountStatus.UNAPPROVED;
    }

    public enum UserType { NONE, ADMIN, STUDENT }

    public enum  AccountStatus { UNAPPROVED, ACTIVE, BLOCKED }

    public class BookCategory
    {
        public int ID { get; set; }
        public string Category { get; set; } = string.Empty;
        public string SubCategory { get; set; } = string.Empty;
    }

    public class Book
    {
        public int ID { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Author { get; set; } = string.Empty;
        public float Price { get; set; }
        public bool Ordered { get; set; }
        public BookCategory? BookCategoryId { get; set; }
    }

    public class Order
    {
        public int ID { get; set; }
        public int UserId { get; set; }
        public int BookId { get; set; }
        public DateTime OrderDate { get; set; }
        public bool Returned { get; set; }
        public DateTime? ReturnDate { get; set; }
        public int FinePaid { get; set; }
        public User? User { get; set; }
        public Book? Book { get; set; }
    }
}
