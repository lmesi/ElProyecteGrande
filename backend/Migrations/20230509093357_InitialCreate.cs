using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'speedy') CREATE DATABASE speedy;");
            migrationBuilder.CreateTable(
                name: "Companies",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Companies", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Goods",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Goods", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Role = table.Column<int>(type: "int", nullable: false),
                    LicensePlate = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Orders",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CompanyId = table.Column<long>(type: "bigint", nullable: false),
                    LoadingAddress = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UnloadingAddress = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UnloadingDate = table.Column<DateTime>(type: "date", nullable: true),
                    UserId = table.Column<long>(type: "bigint", nullable: false),
                    GoodsId = table.Column<long>(type: "bigint", nullable: false)
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
                        name: "FK_Orders_Goods_GoodsId",
                        column: x => x.GoodsId,
                        principalTable: "Goods",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Orders_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Orders_CompanyId",
                table: "Orders",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_GoodsId",
                table: "Orders",
                column: "GoodsId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_UserId",
                table: "Orders",
                column: "UserId");
            //admins
            migrationBuilder.Sql("INSERT INTO Users (Name, Password, Role, LicensePlate) VALUES ('Citrom', 'safePassword', 1, '')");
            migrationBuilder.Sql("INSERT INTO Users (LicensePlate, Name, Role, Password) VALUES ('','Admin 1',1,'123')");
            migrationBuilder.Sql("INSERT INTO Users (LicensePlate, Name, Role, Password) VALUES ('','Admin 2',1,'abc')");
            migrationBuilder.Sql("INSERT INTO Users (LicensePlate, Name, Role, Password) VALUES ('','Admin 3',1,'asd')");
            
            // drivers
            migrationBuilder.Sql("INSERT INTO Users (LicensePlate, Role, Name, Password) VALUES ('AABB123',0,'User1','123')");
            migrationBuilder.Sql("INSERT INTO Users (LicensePlate, Role, Name, Password) VALUES ('AABB124',0,'User2','abc')");

            // companies
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
                name: "Orders");

            migrationBuilder.DropTable(
                name: "Companies");

            migrationBuilder.DropTable(
                name: "Goods");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
