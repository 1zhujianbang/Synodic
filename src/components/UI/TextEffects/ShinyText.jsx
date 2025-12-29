import React from 'react'
import clsx from 'clsx'

const ShinyText = ({ text, className }) => {
  return (
    <span 
      className={clsx(
        "bg-clip-text text-transparent bg-gradient-to-r from-neutral-400 via-white to-neutral-400 animate-shine bg-[length:200%_auto]",
        className
      )}
      style={{
        animation: "shine 3s linear infinite"
      }}
    >
      {text}
      <style>{`
        @keyframes shine {
          to {
            background-position: 200% center;
          }
        }
      `}</style>
    </span>
  )
}

export default ShinyText
