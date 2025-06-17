import React from 'react'

function InstagramLoader() {
    return (
        <div className="flex justify-center items-center h-60">
            <div className="relative">
                {Array.from({ length: 12 }).map((_, i) => (
                    <div
                        key={i}
                        className="absolute top-0 left-[29%] w-3 h-1.5 bg-gray-600 rounded-full origin-bottom-left"
                        style={{
                            transform: `rotate(${i * 30}deg) translateX(10px)`,
                            animation: 'fadeDot 1.2s linear infinite',
                            animationDelay: `${(i * 0.1).toFixed(1)}s`,
                        }}
                    />
                ))}
            </div>

            <style>{`
        @keyframes fadeDot {
          0%, 39%, 100% {
            opacity: 0.3;
          }
          40% {
            opacity: 1;
          }
        }
      `}</style>
        </div>
    )
}

export default InstagramLoader
