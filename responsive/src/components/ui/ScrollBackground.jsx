import PixelSnow from "./PixelSnow";

export default function ScrollBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <PixelSnow
        color="#ffffff"
        flakeSize={0.009}
        minFlakeSize={0.5}
        pixelResolution={275}
        speed={2.1}
        depthFade={20}
        farPlane={20}
        brightness={2.2}
        gamma={0.1}
        density={0.6}
        variant="square"
        direction={180}
      />
    </div>
  );
}
