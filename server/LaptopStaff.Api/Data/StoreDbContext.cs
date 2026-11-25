using Microsoft.EntityFrameworkCore;

namespace LaptopStaff.Api.Data;

// Business entities will follow the schema and API contract review.
public sealed class StoreDbContext(DbContextOptions<StoreDbContext> options) : DbContext(options);
