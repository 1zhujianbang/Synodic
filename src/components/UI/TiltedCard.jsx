import { useRef } from "react";
import { motion as _motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const TiltedCard = ({
  children,
  containerHeight = "300px",
  containerWidth = "100%",
  scaleOnHover = 1.05,
  rotateAmplitude = 12,
  showTooltip = false,
  displayOverlayContent = false,
  overlayContent = null,
}) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [rotateAmplitude, -rotateAmplitude]), {
    stiffness: 150,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-rotateAmplitude, rotateAmplitude]), {
    stiffness: 150,
    damping: 30,
  });
  const scale = useSpring(1, { stiffness: 150, damping: 30 });

  function handleMouse(e) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  }

  function handleMouseEnter() {
    scale.set(scaleOnHover);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
    scale.set(1);
  }

  return (
    <figure
      ref={ref}
      className="relative w-full h-full [perspective:800px] flex flex-col items-center justify-center text-center"
      style={{
        height: containerHeight,
        width: containerWidth,
      }}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <_motion.div
        className="relative w-full h-full [transform-style:preserve-3d] group"
        style={{
          rotateX,
          rotateY,
          scale,
        }}
      >
        {children}

        {displayOverlayContent && overlayContent && (
          <_motion.div className="absolute inset-0 z-50 [transform:translateZ(50px)]">
            {overlayContent}
          </_motion.div>
        )}
      </_motion.div>

      {showTooltip && (
        <figcaption className="pointer-events-none absolute left-0 top-0 rounded-[4px] bg-white px-[10px] py-[4px] text-[10px] text-[#2d2d2d] opacity-0 group-hover:opacity-100 sm:hidden">
          Tilt Effect
        </figcaption>
      )}
    </figure>
  );
};

export default TiltedCard;
