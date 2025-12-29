import clsx from 'clsx'

const ShinyText = ({ text, className, style }) => {
  const incomingStyle = style ?? {}
  const { color, animation, ...restStyle } = incomingStyle

  return (
    <span
      className={clsx(
        "relative inline-block",
        className
      )}
      style={restStyle}
    >
      <span style={color ? { color } : undefined}>{text}</span>
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-clip-text text-transparent pointer-events-none select-none animate-shine bg-[length:200%_auto]"
        style={{
          backgroundImage: 'linear-gradient(110deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.95) 45%, rgba(255,255,255,0) 55%)',
          animation: animation ?? 'shine 3s linear infinite',
          mixBlendMode: 'screen',
        }}
      >
        {text}
      </span>
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
