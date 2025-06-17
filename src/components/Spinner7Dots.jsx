import React from "react";

const Spinner7Dots = () => {
    return (
        <div className="relative w-16 h-16 animate-spin-slow">
            {[...Array(7)].map((_, i) => {
                const angle = (i / 7) * 2 * Math.PI;
                const x = 28 * Math.cos(angle); // radius
                const y = 28 * Math.sin(angle);
                return (
                    <div
                        key={i}
                        className="absolute w-2 h-2 bg-blue-500 rounded-full"
                        style={{
                            top: `calc(50% + ${y}px - 4px)`,
                            left: `calc(50% + ${x}px - 4px)`,
                        }}
                    />
                );
            })}
        </div>
    );
};

export default Spinner7Dots;
