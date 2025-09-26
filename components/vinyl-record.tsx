"use client"

interface VinylRecordProps {
  title: string
  artist: string
  price: string
  coverImage: string
  isSoldOut?: boolean
  className?: string
}

export function VinylRecord({ title, artist, price, coverImage, isSoldOut = false, className = "" }: VinylRecordProps) {
  return (
    <div className={`vinyl-container ${className}`}>
      <div className="vinyl-box">
        <div className="vinyl"></div>
        <div className="sleeve"></div>
        <div className="cover" style={{ backgroundImage: `url(${coverImage})` }}>
          {isSoldOut && <div className="sold-out-badge">SOLD OUT</div>}
        </div>
      </div>
      <div className="vinyl-info">
        <h3 className="vinyl-title">{title}</h3>
        <p className="vinyl-artist">{artist}</p>
        <p className="vinyl-price">{price}</p>
      </div>

      <style jsx>{`
        .vinyl-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          perspective: 1000px;
        }

        .vinyl-box {
          --primary-hue: 90;
          --hover-rotation: -30deg;
          --vinyl-size: 280px;
          --vinyl-translate-x: 90%;
          --sleeve-translate-x: 35%;
          --c-black: oklch(0 0 var(--primary-hue) / 100%);
          --c-dark: oklch(0.5 0.05 var(--primary-hue) / 100%);
          --c-label: oklch(1 0.2 var(--primary-hue) / 100%);
          --c-light: oklch(1 0.1 var(--primary-hue) / 100%);
          --c-off-white: oklch(1 0.005 var(--primary-hue) / 100%);
          --c-white: oklch(1 0 var(--primary-hue) / 100%);
          --logo-size: 7cqi;
          
          block-size: var(--vinyl-size);
          container-type: inline-size;
          display: grid;
          inline-size: var(--vinyl-size);
          position: relative;
          transform-style: preserve-3d;
          transition: rotate 0.6s ease-in-out, translate 0.4s ease-in-out;
        }

        .vinyl-box::before {
          background-color: var(--c-black);
          block-size: 4%;
          content: '';
          inline-size: 100%;
          inset: auto 0 -2%;
          mask-image: radial-gradient(var(--c-black) 0%, transparent 75%);
          opacity: 0.3;
          position: absolute;
          scale: 1.3 1;
          transform-origin: left center;
          transition: opacity 0.4s ease-in-out, scale 0.4s ease-in-out;
          translate: -10% 0;
        }

        .vinyl-box:hover {
          rotate: 1 1 0 var(--hover-rotation);
          translate: calc((var(--vinyl-translate-x) / 2) * -1) 0%;
        }

        .vinyl-box:hover::before {
          opacity: 0.5;
          scale: 2 3;
        }

        .vinyl-box:hover .sleeve {
          translate: var(--sleeve-translate-x) 0%;
        }

        .vinyl-box:hover .vinyl {
          animation-play-state: running;
          translate: var(--vinyl-translate-x) 0%;
        }

        .vinyl-box > * {
          grid-area: 1/2;
        }

        .vinyl {
          animation: rotate 1.8s linear 0s infinite normal forwards paused;
          background: repeating-radial-gradient(
            circle,
            var(--c-black) 0%,
            var(--c-black) 0.5%,
            var(--c-dark) 0.5%,
            var(--c-dark) 0.75%
          );
          block-size: var(--vinyl-size);
          border-radius: 50%;
          inline-size: var(--vinyl-size);
          mask-image: radial-gradient(
            circle,
            transparent 0%,
            transparent 1.5%,
            var(--c-black) 1.5%,
            var(--c-black) 100%
          );
          position: relative;
          scale: 0.94 0.935;
          transition: translate 0.4s ease-in-out;
          translate: 20% 0%;
        }

        .vinyl::before,
        .vinyl::after {
          position: absolute;
        }

        .vinyl::before {
          background: radial-gradient(
            circle,
            var(--c-label) 0%,
            var(--c-label) 42%,
            color-mix(in oklch, var(--c-label) 92%, var(--c-black)) 45%,
            var(--c-label) 45%,
            var(--c-label) 100%
          );
          border-radius: 50%;
          content: '';
          inset: 33%;
        }

        .vinyl::after {
          block-size: var(--logo-size);
          border: 1px solid var(--c-dark);
          color: var(--c-dark);
          content: '♪';
          display: grid;
          align-items: center;
          font-size: calc(var(--logo-size) / 2);
          font-weight: bold;
          inline-size: var(--logo-size);
          inset: 50% auto auto 53%;
          line-height: 1;
          opacity: 0.9;
          padding: calc(var(--logo-size) / 10);
          translate: 0 -50%;
        }

        .sleeve {
          background-color: var(--c-off-white);
          block-size: var(--vinyl-size);
          border-radius: 2%;
          mask-image: radial-gradient(
            circle,
            transparent 0%,
            transparent 30%,
            var(--c-black) 30%,
            var(--c-black) 100%
          );
          inline-size: var(--vinyl-size);
          scale: 0.98;
          transition: translate 0.4s ease-in-out 0.05s;
        }

        .cover {
          background-color: var(--c-black);
          background-size: cover;
          background-position: center;
          block-size: var(--vinyl-size);
          border-radius: 0.5%;
          box-shadow: 2px 0 5px -2px var(--c-dark);
          inline-size: var(--vinyl-size);
          position: relative;
        }

        .sold-out-badge {
          position: absolute;
          top: 8px;
          left: 8px;
          background: #ef4444;
          color: white;
          padding: 4px 8px;
          font-size: 10px;
          font-weight: bold;
          border-radius: 2px;
          z-index: 10;
        }

        .vinyl-info {
          text-align: center;
          max-width: 280px;
        }

        .vinyl-title {
          font-size: 0.9rem;
          font-weight: 600;
          margin: 0 0 0.25rem 0;
          color: hsl(var(--foreground));
          line-height: 1.2;
        }

        .vinyl-artist {
          font-size: 0.8rem;
          color: hsl(var(--muted-foreground));
          margin: 0 0 0.5rem 0;
        }

        .vinyl-price {
          font-size: 0.85rem;
          font-weight: 500;
          color: hsl(var(--foreground));
          margin: 0;
        }

        @keyframes rotate {
          from {
            rotate: 0 0 1 0deg;
          }
          to {
            rotate: 0 0 1 360deg;
          }
        }

        @media (max-width: 768px) {
          .vinyl-box {
            --vinyl-size: 200px;
          }
          
          .vinyl-info {
            max-width: 200px;
          }
          
          .vinyl-title {
            font-size: 0.8rem;
          }
          
          .vinyl-artist {
            font-size: 0.7rem;
          }
          
          .vinyl-price {
            font-size: 0.75rem;
          }
        }
      `}</style>
    </div>
  )
}
