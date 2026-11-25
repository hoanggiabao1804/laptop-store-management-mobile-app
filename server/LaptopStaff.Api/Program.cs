using LaptopStaff.Api.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
if (builder.Environment.IsDevelopment())
{
    builder.Configuration.AddJsonFile("appsettings.Local.json", optional: true)
        .AddEnvironmentVariables();
}
builder.Services.AddOpenApi();
builder.Services.AddProblemDetails();
builder.Services.AddDbContext<StoreDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("Store")));
builder.Services.AddCors(options => options.AddPolicy("LocalWeb", policy =>
    policy.WithOrigins("http://localhost:8081").AllowAnyHeader().AllowAnyMethod()));
var app = builder.Build();
app.UseExceptionHandler();
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseCors("LocalWeb");
}
else { app.UseHttpsRedirection(); }
app.MapGet("/health", () => Results.Ok(new { status = "ok", service = "Laptop Staff API" }));
app.MapGet("/health/ready", async (StoreDbContext db, CancellationToken ct) =>
{
    try
    {
        return await db.Database.CanConnectAsync(ct)
            ? Results.Ok(new { status = "ready" })
            : Results.Problem("Database is unavailable.", statusCode: 503);
    }
    catch (Exception ex) when (ex is not OperationCanceledException)
    {
        return Results.Problem("Database is unavailable.", statusCode: 503);
    }
});
app.Run();
