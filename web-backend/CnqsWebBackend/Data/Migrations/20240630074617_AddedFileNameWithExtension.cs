using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CnqsWebBackend.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddedFileNameWithExtension : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "FileNameWithExtension",
                table: "Files",
                type: "character varying(250)",
                maxLength: 250,
                nullable: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FileNameWithExtension",
                table: "Files");
        }
    }
}
