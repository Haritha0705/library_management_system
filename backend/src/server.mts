import app from "./app.mjs";

const PORT = process.env.PORT || 8070;

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
