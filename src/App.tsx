/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';

const App = () => {
  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState('');

  const handleFileChange = (event: any) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles(selectedFiles as any);
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      setMessage('Please select at least one file.');
      return;
    }

    const formData = new FormData();
    formData.append('chat_id', 'YOUR_CHAT_ID');

    files.forEach((file, index) => {
      formData.append(`document${index}`, file);
    });

    try {
      const response = await fetch(`https://api.telegram.org/bot${process.env.REACT_APP_BOT_TOKEN}/sendDocument`, {
        method: 'POST',
        body: formData,
      });

      const responseData = await response.json();
      if (responseData.ok) {
        setMessage('Files sent successfully!');
      } else {
        setMessage('Failed to send files.');
      }
    } catch (error) {
      console.error('Error sending files:', error);
      setMessage('An error occurred while sending the files.');
    }
  };

  return (
    <div>
      <h2>Send Multiple Files to Telegram</h2>
      <input type="file" onChange={handleFileChange} multiple />
      <button onClick={handleUpload}>Send</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default App;
