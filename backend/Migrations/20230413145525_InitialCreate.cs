using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Admins",
                columns: table => new
                {
                    Id = table.Column<long>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Role = table.Column<int>(type: "INTEGER", nullable: false),
                    Name = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Admins", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Companies",
                columns: table => new
                {
                    Id = table.Column<long>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Address = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Companies", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Drivers",
                columns: table => new
                {
                    Id = table.Column<long>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    LicensePlate = table.Column<string>(type: "TEXT", nullable: false),
                    Role = table.Column<int>(type: "INTEGER", nullable: false),
                    Name = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Drivers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Goods",
                columns: table => new
                {
                    Id = table.Column<long>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Goods", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Orders",
                columns: table => new
                {
                    Id = table.Column<long>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    CompanyId = table.Column<long>(type: "INTEGER", nullable: false),
                    LoadingAddress = table.Column<string>(type: "TEXT", nullable: false),
                    UnloadingAddress = table.Column<string>(type: "TEXT", nullable: false),
                    UnloadingDate = table.Column<DateTime>(type: "TEXT", nullable: true),
                    DriverId = table.Column<long>(type: "INTEGER", nullable: false),
                    GoodsId = table.Column<long>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Orders", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Orders_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Orders_Drivers_DriverId",
                        column: x => x.DriverId,
                        principalTable: "Drivers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Orders_Goods_GoodsId",
                        column: x => x.GoodsId,
                        principalTable: "Goods",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Orders_CompanyId",
                table: "Orders",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_DriverId",
                table: "Orders",
                column: "DriverId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_GoodsId",
                table: "Orders",
                column: "GoodsId");
            
            //admins
            migrationBuilder.Sql("INSERT INTO Admins (Name, Role) VALUES ('Admin 1','1')");
            migrationBuilder.Sql("INSERT INTO Admins (Name, Role) VALUES ('Admin 2', '1')");
            migrationBuilder.Sql("INSERT INTO Admins (Name, Role) VALUES ('Admin 3', '1')");
            
            //drivers
            migrationBuilder.Sql("INSERT INTO Drivers (LicensePlate, Role, Name) VALUES ('AABB123','0','Driver1')");
            migrationBuilder.Sql("INSERT INTO Drivers (LicensePlate, Role, Name) VALUES ('AABB124','0','Driver2')");

            //companies
            migrationBuilder.Sql("INSERT INTO Companies (Name, Address) VALUES ('Company 1','Oslo(N)')");
            migrationBuilder.Sql("INSERT INTO Companies (Name, Address) VALUES ('Company 2', 'Budapest(H)')");
            
            //goods
            migrationBuilder.Sql("INSERT INTO Goods (Name) VALUES ('Sand')");
            migrationBuilder.Sql("INSERT INTO Goods (Name) VALUES ('Wheat')");
            migrationBuilder.Sql("INSERT INTO Goods (Name) VALUES ('Oat')");
            migrationBuilder.Sql("INSERT INTO Goods (Name) VALUES ('Rye')");
            migrationBuilder.Sql("INSERT INTO Goods (Name) VALUES ('Barley')");
            migrationBuilder.Sql("INSERT INTO Goods (Name) VALUES ('Corn')");
            migrationBuilder.Sql("INSERT INTO Goods (Name) VALUES ('Rice')");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Admins");

            migrationBuilder.DropTable(
                name: "Orders");

            migrationBuilder.DropTable(
                name: "Companies");

            migrationBuilder.DropTable(
                name: "Drivers");

            migrationBuilder.DropTable(
                name: "Goods");
        }
    }
}
