import React from 'react';

/**
 * ProfileImage - A responsive profile image component that adapts its size based on location
 * 
 * @param {Object} props
 * @param {string} props.src - Image source URL
 * @param {string} props.alt - Alternative text for the image
 * @param {string} props.location - Where the component is being used (sidebar, header, likes, comments)
 * @param {string} props.fallbackSrc - Optional fallback image if main image fails to load
 * @param {Function} props.onClick - Optional click handler
 */

const ProfileImage = ({
  src,
  alt = "User profile",
  location = "sidebar",
  fallbackSrc = "/default-avatar.png",
  onClick,
  className = "",
}) => {
  const [imgSrc, setImgSrc] = React.useState(src)
  const [hasError, setHasError] = React.useState(false)

  // Handle image load errors
  const handleError = () => {
    if (!hasError && fallbackSrc) {
      setImgSrc(fallbackSrc)
      setHasError(true)
    }
  }

  // Size mapping based on location
  const sizeMap = {
    sidebar: 24,
    header: 54,
    likes: 44,
    comments: 42,
  }

  // Get the size based on location or default to sidebar size
  const size = sizeMap[location] || 24

  return (
    <div 
      className={`relative rounded-full overflow-hidden bg-gray-100 ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        minWidth: `${size}px`, // Prevents shrinking
      }}
      onClick={onClick}
    >
      <img
        src={imgSrc}
        alt={alt}
        onError={handleError}
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </div>
  )
}

export default ProfileImage