import { Image } from "antd";
export default function CarouselItem({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  return (
    <div style={{ position: "relative", textAlign: "left", color: "#fff" }}>
      <Image alt={alt} src={src} preview={false} width="100%" />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "10%",
          transform: "translateY(-50%)",
        }}
      >
        <h3 style={{ color: "#f4a261" }}>Transforming ideas into Reality</h3>
        <h1 style={{ color: "#fff", fontSize: "3em", margin: "0.5em 0" }}>
          Custom Software Solutions <br /> Tailored for{" "}
          <span style={{ color: "#e76f51" }}>Your Success</span>
        </h1>
        <button
          style={{
            backgroundColor: "#e76f51",
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "1em",
          }}
        >
          Start a Project?
        </button>
      </div>
    </div>
  );
}
