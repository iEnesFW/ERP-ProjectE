# Project-E

Technologies: C#, ASP.Net MVC, Vue.JS, ReportBuilder

Developed a management platform covering customer, inventory, and order processes.  
Implemented the backend using C# and ASP.NET MVC, ensuring maintainable server-side 
logic.  

Designed a responsive and dynamic frontend interface with Vue.js to enhance user 
experience. 

Utilized SQL Server for database operations with optimized queries for performance and 
scalability. 

Designed to align with enterprise-level ERP systems, with potential for SAP integration.  
Applied layered architecture principles to promote modularity, maintainability, and ease of 
future enhancements. 

## Installation

```bash
git clone https://github.com/iEnesFW/ERP-ProjectE.git
cd ERP-ProjectE
dotnet restore
npm install
```

## Usage

```bash
# Run the backend
dotnet run

# Start the frontend in development mode:
npm run dev

# Build the frontend for production:
npm run build

# The application will be available at:
https://localhost:5001
```

## Project Structure

ERP-ProjectE/

├── Controllers/       # API controllers

├── Models/            # Entity and DTO classes

├── Services/          # Business logic

├── vite/              # Frontend (Vue 3 + Tailwind)

├── Program.cs         # Main application entry

├── appsettings.json   # Configuration file

├── vite.config.js     # Vite configuration

└── ProjectE.sln       # Solution file


## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update documentation and code comments as appropriate.

## License

[MIT](https://[choosealicense](https://github.com/iEnesFW).com/licenses/mit/)
