// middleware
// app.use(cors({
//     origin:"http://localhost:5173"
// }));
app.use(express.json());

// routes
app.use("/api/auth",authRoutes)
app.use("/api/users",usersRoutes)
app.use("/api/books",bookRoutes)