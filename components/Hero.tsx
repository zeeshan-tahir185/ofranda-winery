export default function Hero() {
  return (
    <section className="hero" id="top" data-tone="dark">
      <div className="hero__media">
        <video
          className="hero__video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/media/hero-poster.jpg"
        >
          <source src="/media/hero-mobile.mp4" type="video/mp4" media="(max-width: 767px)" />
          <source src="/media/hero.mp4" type="video/mp4" />
        </video>
        <div className="hero__shade" />
        <div className="grain" />
      </div>

      <div className="hero__content">
        <p className="hero__eyebrow intro" style={{ ["--d" as string]: "0.2s" }}>
          Crama Ofranda <span>·</span> Republic of Moldova
        </p>
        <h1 className="hero__title">
          <span className="intro-line">
            <span style={{ ["--d" as string]: "0.35s" }}>Every wine is</span>
          </span>
          <span className="intro-line">
            <span style={{ ["--d" as string]: "0.5s" }}>
              <em>an offering</em> of the land
            </span>
          </span>
        </h1>
        <p className="hero__sub intro" style={{ ["--d" as string]: "0.9s" }}>
          Certified organic by ECOCERT &nbsp;·&nbsp; On the path to biodynamics
        </p>
      </div>

      <div className="hero__foot intro" style={{ ["--d" as string]: "1.2s" }}>
        <span className="hero__since">Est. 2016</span>
        <a href="#certified" className="scroll-cue" aria-label="Scroll down">
          <span>Discover</span>
          <i />
        </a>
        <span className="hero__coords">Organic &nbsp;·&nbsp; Biodynamic</span>
      </div>
    </section>
  );
}
