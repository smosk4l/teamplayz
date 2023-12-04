import React, { useState } from 'react'
import axios from 'axios'

export const Upload = () => {
  const [selectedImage, setSelectedImage] = useState(null)

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    setSelectedImage(file)
  }

  const handleUpload = async () => {
    if (!selectedImage) {
      alert('Wybierz zdjęcie przed wysłaniem.')
      return
    }

    const formData = new FormData()
    formData.append('image', selectedImage)

    try {
      const response = await axios.post(
        'http://localhost:8000/api/profile/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )

      console.log('Response from server:', response.data)
    } catch (error) {
      console.error('Error uploading image:', error)
    }
  }
  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {selectedImage && (
        <div>
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="Selected"
            style={{ maxWidth: '300px' }}
          />
        </div>
      )}
      <button onClick={handleUpload}>Wyślij</button>
    </div>
  )
}
