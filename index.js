const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

// console.log("API_KEY", process.env.API_KEY);
const app = express();
app.use(express.json());
app.use(cors()); // Enable CORS

// const userId = "john_doe_17091999";
// const email = "john@xyz.com";
// const rollNumber = "ABCD123";
const userId = process.env.USER_ID;
const email = process.env.EMAIL;
const rollNumber = process.env.ROLL_NUMBER;

console.log(userId,email,rollNumber);
// Helper function to find the highest alphabet
const getHighestAlphabet = (alphabets) => {
  if (alphabets.length === 0) return [];
  const sortedAlphabets = alphabets.sort((a, b) =>
    a.toUpperCase().localeCompare(b.toUpperCase())
  );
  const highestAlphabet = sortedAlphabets.filter(
    (alphabet) =>
      alphabet.toUpperCase() ===
      sortedAlphabets[sortedAlphabets.length - 1].toUpperCase()
  );
  return highestAlphabet;
};

// POST endpoint
app.post("/api/bfhl", (req, res) => {
  const { data } = req.body;

  if (!data || !Array.isArray(data)) {
    return res.status(400).json({
      is_success: false,
      user_id: userId,
      email,
      roll_number: rollNumber,
      numbers: [],
      alphabets: [],
      highest_alphabet: [],
    });
  }

  const numbers = data.filter((item) => !isNaN(item) && item.trim() !== "");
  const alphabets = data.filter((item) => /^[A-Za-z]$/.test(item));

  const highestAlphabet = getHighestAlphabet(alphabets);

  res.json({
    is_success: true,
    user_id: userId,
    email,
    roll_number: rollNumber,
    numbers,
    alphabets,
    highest_alphabet: highestAlphabet,
  });
});

// GET endpoint
app.get("/api/bfhl", (req, res) => {
  res.status(200).json({
    operation_code: 1,
  });
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
