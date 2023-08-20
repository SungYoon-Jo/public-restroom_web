import app from "./server";

// const PORT = process.env.PORT || 4000;

const TPORT = process.env.PORT || 8005;

const handleListening = () =>
  console.log(`✅ Server listenting on port http://localhost:${TPORT} 🚀`);

app.listen(TPORT, handleListening);
