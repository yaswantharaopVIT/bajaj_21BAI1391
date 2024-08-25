// /api/bfhl.js

export default (req, res) => {
    if (req.method === 'POST') {
      try {
        const data = req.body;
  
        // Input validation
        if (!data || !Array.isArray(data.data)) {
          return res.status(400).json({ is_success: false, message: 'Invalid input' });
        }
  
        const userId = 'john_doe_17091999';
        const email = 'john@xyz.com';
        const rollNumber = 'ABCD123';
  
        const numbers = data.data.filter(item => /^\d+$/.test(item));
        const alphabets = data.data.filter(item => /^[a-zA-Z]$/.test(item));
  
        const lowercaseAlphabets = alphabets.filter(char => /^[a-z]$/.test(char));
        const highestLowercaseAlphabet = lowercaseAlphabets.length > 0
          ? Math.max(...lowercaseAlphabets.map(char => char.charCodeAt(0)))
          : null;
  
        const response = {
          is_success: true,
          user_id: userId,
          email: email,
          roll_number: rollNumber,
          numbers: numbers,
          alphabets: alphabets,
          highest_lowercase_alphabet: highestLowercaseAlphabet ? [String.fromCharCode(highestLowercaseAlphabet)] : []
        };
  
        res.status(200).json(response);
      } catch (error) {
        res.status(500).json({ is_success: false, message: error.message });
      }
    } else if (req.method === 'GET') {
      res.status(200).json({ operation_code: 1 });
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  };
  