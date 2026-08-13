import { useEffect, useState } from "react";



const projects = [
    {
      number: "01",
      title: "SMARTRECON-GST",
      description:
        "AI-powered GST invoice OCR and reconciliation platform.",
      features: [
        "Invoice OCR",
        "SBERT matching",
        "GST validation",
        "Automated reports",
      ],
      image: "/images/smartrecon-gst.png",
      github:
      "https://github.com/wardayX/SmartRecon-GST",
    },
  
    {
        number: "02",
        title: "STABLE VIDEO INFINITY",
        description:
          "An optimized Stable Video Infinity workflow engineered to run on a 16GB Colab T4.",
        features: [
          "GGUF Q4_K_M",
          "Split inference",
          "Autoregressive generation",
          "VRAM optimization",
        ],
        image: "/images/stable-video-infinity.png",
        github:
      "https://github.com/wardayX/svi2_colab",
      },
  
    {
      number: "03",
      title: "MULTI-MODEL IMAGE FUSION",
      description:
        "An AI image-merging experiment combining multimodal models and generation.",
      features: [
        "CLIP",
        "Stable Diffusion",
        "T5",
        "Image-to-image",
      ],
      image: "/images/image-merger.png",
      github:
      "https://github.com/buggytanmoy77/Chaos",
    },
  ];
  
  function Projects() {
        const [lightboxImage, setLightboxImage] =
    useState<string | null>(null);

    useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
        setLightboxImage(null);
        }
    };

    window.addEventListener(
        "keydown",
        handleKeyDown,
    );

    return () => {
        window.removeEventListener(
        "keydown",
        handleKeyDown,
        );
    };
    }, []);


    return (
      <div className="projects-stage">
        {/* ========================================
            PROJECT HEADER
        ======================================== */}
  
        <div className="projects-header">
          SELECTED WORK
        </div>
  
        {/* ========================================
            HORIZONTAL PROJECT TRACK
        ======================================== */}
  
        <div className="projects-track">
          {projects.map((project) => (
            <article
              className="project-slide"
              key={project.number}
            >
              {/* ==================================
                  PROJECT NUMBER
              ================================== */}
  
              <div className="project-number">
                {project.number}
              </div>
  
              {/* ==================================
                  PROJECT VISUAL
              ================================== */}
  
              <div className="project-visual">
                {project.image ? (
                  <img
                  src={project.image}
                  alt={`${project.title} project visual`}
                  className="project-image"
                  onClick={() =>
                    setLightboxImage(project.image)
                  }
                />
                ) : (
                  <>
                    <div className="project-wire project-wire-one" />
                    <div className="project-wire project-wire-two" />
                    <div className="project-wire project-wire-three" />
  
                    <div className="project-object project-object-main">
                      <div className="project-object-line project-object-line-one" />
                      <div className="project-object-line project-object-line-two" />
                      <div className="project-object-line project-object-line-three" />
                    </div>
  
                    <div className="project-object project-object-small" />
  
                    <div className="project-object project-object-tilted" />
                  </>
                )}
              </div>
  
              {/* ==================================
                  PROJECT INFORMATION
              ================================== */}
  
              <div className="project-info">
                <div className="project-kicker">
                  PROJECT {project.number}
                </div>
  
                <h2>{project.title}</h2>
  
                <p>{project.description}</p>
  
                <div className="project-features">
                  {project.features.map((feature) => (
                    <span key={feature}>
                      {feature}
                    </span>
                  ))}
                </div>
  
                <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-view"
                    >
                    VIEW PROJECT
                    <span>→</span>
                    </a>
              </div>
  
              {/* ==================================
                  PROJECT FOOTER
              ================================== */}
  
              <div className="project-bottom-label">
                SCROLL →
              </div>
            </article>
          ))}
        </div>
        {lightboxImage && (
        <div
            className="project-lightbox"
            onClick={() =>
            setLightboxImage(null)
            }
        >
            <button
            type="button"
            className="project-lightbox-close"
            onClick={(event) => {
                event.stopPropagation();
                setLightboxImage(null);
            }}
            aria-label="Close image"
            >
            ×
            </button>

            <img
            src={lightboxImage}
            alt="Project visual enlarged"
            className="project-lightbox-image"
            onClick={(event) =>
                event.stopPropagation()
            }
            />
        </div>
)}
      </div>
    );
  }
  
  export default Projects;