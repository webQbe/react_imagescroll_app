import React from 'react'
// Receive an image object as a prop and render it
export default function Image({ image }) {
  return (
    // Display image
    <img src={image.urls.thumb} alt="" className="single-photo" />
  )
}
