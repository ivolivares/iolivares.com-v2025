"use client"

import Link from "next/link"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

export default function UsesPage() {
  const sectionRef = useScrollReveal()

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main ref={sectionRef} className="container mx-auto px-4 py-16 max-w-6xl scroll-reveal">
        <div className="mb-16">
          <h1 className="text-4xl font-bold mb-6 text-balance">My tools, gear and apps.</h1>
          <p className="text-lg text-muted-foreground mb-4">
            This is my list of goodies that I use for code and life. Full transparency, some of these links can contain
            referrals. I love integrate gadgets and use together, commonly for very development to use about ecosystems
            of technology and why this matters for privacy.
          </p>
          <p className="text-muted-foreground mb-8">
            If you want to know more about my experience with some specific gadget, just tweet me{" "}
            <Link href="#" className="text-primary hover:underline">
              @ivolivares
            </Link>
          </p>
          <p className="text-sm text-muted-foreground mb-12">
            Checkout this and more ones at{" "}
            <Link
              href="https://uses.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              uses.tech
            </Link>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Hardware Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">Hardware</h2>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start space-y-2">
                <div>
                  <Link
                    href="https://www.apple.com/mac-mini/?from=iolivares.com"
                    target="_blank"
                    className="font-semibold hover:underline"
                    rel="noopener noreferrer"
                  >
                    💻 Apple Mac Mini M2 Pro 2023.
                  </Link>{" "}
                  <p className="text-muted-foreground">
                    Because Apple Computers are the best machines ever made, change my mind.
                  </p>
                </div>
              </li>
              <li className="flex items-start space-y-2">
                <div>
                  🖥️{" "}
                  <Link
                    href="https://www.amazon.com/Dell-Screen-LED-Lit-Monitor-P2419H/dp/B07F8XZN69?from=iolivares.com"
                    target="_blank"
                    className="font-semibold hover:underline"
                    rel="noopener noreferrer"
                  >
                    Dell P2414H
                  </Link>
                  {" + "}
                  <Link
                    href="https://www.amazon.com/Samsung-LC24F390FHNXZA-24-inch-Monitor-FreeSync/dp/B01CX26WPY?from=iolivares.com"
                    target="_blank"
                    className="font-semibold hover:underline"
                    rel="noopener noreferrer"
                  >
                    Samsung C24F390 Monitor.
                  </Link>{" "}
                  <p className="text-muted-foreground">Dell's monitor is the best! Curved monitors are overrated.</p>
                </div>
              </li>
              <li className="flex items-start space-y-2">
                <div>
                  <Link
                    href="https://www.bose.com/en_us/products/speakers/stereo_speakers/companion-2-series-iii-multimedia-speaker-system.html?from=iolivares.com"
                    target="_blank"
                    className="font-semibold hover:underline"
                    rel="noopener noreferrer"
                  >
                    🔊 Bose Companion 2 Series III Speakers.
                  </Link>{" "}
                  <p className="text-muted-foreground">I really love the sound of this speakers.</p>
                </div>
              </li>
              <li className="flex items-start space-y-2">
                <div>
                  <Link
                    href="http://www.samsontech.com/samson/products/microphones/usb-microphones/gomicconnect/?from=iolivares.com"
                    target="_blank"
                    className="font-semibold hover:underline"
                    rel="noopener noreferrer"
                  >
                    🎧 Samson Go Mic Connect.
                  </Link>{" "}
                  <p className="text-muted-foreground">Not bad for a USB mic.</p>
                </div>
              </li>
              <li className="flex items-start space-y-2">
                <div>
                  <Link
                    href="https://www.amazon.com/gp/product/B085TFF7M1/?from=iolivares.com"
                    target="_blank"
                    className="font-semibold hover:underline"
                    rel="noopener noreferrer"
                  >
                    📹 Logitech C920 HD Pro Webcam.
                  </Link>{" "}
                  <p className="text-muted-foreground">Solid quality for less than a hundred bucks.</p>
                </div>
              </li>
              <li className="flex items-start space-y-2">
                <div>
                  <Link
                    href="https://www.amazon.com/Estaci%C3%B3n-acoplamiento-Monitor-pantalla-Ethernet/dp/B088D5436G?ref_=ast_sto_dp&from=iolivares.com"
                    target="_blank"
                    className="font-semibold hover:underline"
                    rel="noopener noreferrer"
                  >
                    🔌 Tobenone USB-C Dock Station.
                  </Link>{" "}
                  <p className="text-muted-foreground">This is my secret to connect everything without problems.</p>
                </div>
              </li>
              <li className="flex items-start space-y-2">
                <div>
                  <Link
                    href="https://www.apple.com/ipad-mini/?from=iolivares.com"
                    target="_blank"
                    className="font-semibold hover:underline"
                    rel="noopener noreferrer"
                  >
                    📱 Apple iPad Mini + Apple Pencil.
                  </Link>{" "}
                  <p className="text-muted-foreground">
                    iPad's are the best table to take notes, drawing my idea and read some book works perfectly.
                  </p>
                </div>
              </li>
              <li className="flex items-start space-y-2">
                <div>
                  <Link
                    href="https://bookstore.cl/silla-ergohuman/silla-ergohuman-fit-mesh-58.html?from=iolivares.com"
                    target="_blank"
                    className="font-semibold hover:underline"
                    rel="noopener noreferrer"
                  >
                    💺 ErgoFoam Fit Mesh.
                  </Link>{" "}
                  <p className="text-muted-foreground">
                    After 5 unsuccessful purchases of <span className="italic">gamer chairs</span>. The best is an
                    ergonomic chair and this is the best.
                  </p>
                </div>
              </li>
              <li className="flex items-start space-y-2">
                <div>
                  <Link
                    href="https://ergonomics.cl/products/escritorio-electrico-avanzado?variant=36498974441621&from=iolivares.com"
                    target="_blank"
                    className="font-semibold hover:underline"
                    rel="noopener noreferrer"
                  >
                    👨‍💻 Ergonomic Stand desk.
                  </Link>{" "}
                  <p className="text-muted-foreground">Because stand-up meetings should be stand-up.</p>
                </div>
              </li>
              <li className="flex items-start space-y-2">
                <div>
                  <Link
                    href="https://www.apple.com/iphone/?from=iolivares.com"
                    target="_blank"
                    className="font-semibold hover:underline"
                    rel="noopener noreferrer"
                  >
                    📱 iPhone 14 Pro Max.
                  </Link>{" "}
                  <p className="text-muted-foreground">iPhone always, the ecosystem matters.</p>
                </div>
              </li>
              <li className="flex items-start space-y-2">
                <div>
                  <Link
                    href="https://www.cla.canon.com/cla/es/support/consumer/cameras/eos_cameras/eos_rebel_t5?from=iolivares.com"
                    target="_blank"
                    className="font-semibold hover:underline"
                    rel="noopener noreferrer"
                  >
                    📷 Canon Rebel EOS T5.
                  </Link>{" "}
                  <p className="text-muted-foreground">My first camera, I love Canon.</p>
                </div>
              </li>
            </ul>
          </section>

          {/* Software & Apps Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">Software & Apps</h2>
            <ul className="space-y-4 text-sm">
              <li>
                <Link
                  href="https://iterm2.com/?from=iolivares.com"
                  target="_blank"
                  className="font-semibold hover:underline"
                  rel="noopener noreferrer"
                >
                  iTerm2
                </Link>
                <p className="text-muted-foreground">The best terminal for Mac OS.</p>
              </li>
              <li>
                <Link
                  href="https://ohmyz.sh/?from=iolivares.com"
                  target="_blank"
                  className="font-semibold hover:underline"
                  rel="noopener noreferrer"
                >
                  Zsh + OhMyZsh
                </Link>
                <p className="text-muted-foreground">
                  Zsh, well configured is one of the things if you can use OhMyZsh?
                </p>
              </li>
              <li>
                <Link
                  href="https://squoosh.app/?from=iolivares.com"
                  target="_blank"
                  className="font-semibold hover:underline"
                  rel="noopener noreferrer"
                >
                  Squoosh
                </Link>
                <p className="text-muted-foreground">Performance matters.</p>
              </li>
              <li>
                <Link
                  href="https://1password.com/?from=iolivares.com"
                  target="_blank"
                  className="font-semibold hover:underline"
                  rel="noopener noreferrer"
                >
                  1Password
                </Link>
                <p className="text-muted-foreground">The best cross-platform security service.</p>
              </li>
            </ul>

            <h3 className="text-xl font-semibold mt-8 mb-4">IDE & Extensions</h3>
            <ul className="space-y-4 text-sm">
              <li>
                <Link
                  href="https://code.visualstudio.com/?from=iolivares.com"
                  target="_blank"
                  className="font-semibold hover:underline"
                  rel="noopener noreferrer"
                >
                  VS Code
                </Link>
                <p className="text-muted-foreground">Yes, in 2022 Microsoft has the best IDE.</p>
              </li>
              <li>
                <Link
                  href="https://draculatheme.com/?from=iolivares.com"
                  target="_blank"
                  className="font-semibold hover:underline"
                  rel="noopener noreferrer"
                >
                  Dracula Theme
                </Link>
                <p className="text-muted-foreground">For VSCode, is a nice dark theme.</p>
              </li>
              <li>
                <Link
                  href="https://philpl.gumroad.com/l/dank-mono?from=iolivares.com"
                  target="_blank"
                  className="font-semibold hover:underline"
                  rel="noopener noreferrer"
                >
                  Dash Mono Font
                </Link>
                <p className="text-muted-foreground">The always font for coding ever.</p>
              </li>
              <li>
                <Link
                  href="https://raycast.com/?via=iolivares-dot-com&from=iolivares.com"
                  target="_blank"
                  className="font-semibold hover:underline"
                  rel="noopener noreferrer"
                >
                  Raycast
                </Link>
                <p className="text-muted-foreground">Productivity and Shortcuts in the next level.</p>
              </li>
            </ul>
          </section>

          {/* Git, Building, Hosting, Monitoring Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">Git, Building, Hosting, Monitoring</h2>
            <ul className="space-y-4 text-sm">
              <li>
                <Link
                  href="https://github.com/?from=iolivares.com"
                  target="_blank"
                  className="font-semibold hover:underline"
                  rel="noopener noreferrer"
                >
                  GitHub
                </Link>
                <p className="text-muted-foreground">Preferred by me over other services.</p>
              </li>
              <li>
                <Link
                  href="https://posthog.com/?from=iolivares.com"
                  target="_blank"
                  className="font-semibold hover:underline"
                  rel="noopener noreferrer"
                >
                  PostHog
                </Link>
                <p className="text-muted-foreground">
                  Metrics, metrics, metrics. You can't improve what you don't measure.
                </p>
              </li>
              <li>
                <Link
                  href="https://www.cloudflare.com/?from=iolivares.com"
                  target="_blank"
                  className="font-semibold hover:underline"
                  rel="noopener noreferrer"
                >
                  Cloudflare
                </Link>
                <p className="text-muted-foreground">
                  Always my first layer and the secret to scale without surprises in your billing.
                </p>
              </li>
            </ul>
          </section>

          {/* Automation and Domotics (IoT) Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">Automation and Domotics (IoT)</h2>
            <ul className="space-y-4 text-sm">
              <li>
                <Link
                  href="https://store.google.com/us/product/google_nest_mini?from=iolivares.com"
                  target="_blank"
                  className="font-semibold hover:underline"
                  rel="noopener noreferrer"
                >
                  Google Home Mini
                </Link>
                <p className="text-muted-foreground">Ok Google, ask to Alexa about Siri jokes.</p>
              </li>
              <li>
                <Link
                  href="https://www.philips-hue.com/en-hk/products/smart-lightbulbs?from=iolivares.com"
                  target="_blank"
                  className="font-semibold hover:underline"
                  rel="noopener noreferrer"
                >
                  Philips HUE Lights
                </Link>
                <p className="text-muted-foreground">Since 2016, using this IoT amazing lights.</p>
              </li>
              <li>
                <Link
                  href="https://www.philips-hue.com/en-hk/explore-hue/propositions/entertainment/sync-with-tv?from=iolivares.com"
                  target="_blank"
                  className="font-semibold hover:underline"
                  rel="noopener noreferrer"
                >
                  Philips HUE Play Lights + Sync Box
                </Link>
                <p className="text-muted-foreground">Cinema experience and music/video sync just for fun and rock.</p>
              </li>
            </ul>
          </section>

          {/* Music System Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">Music System</h2>
            <ul className="space-y-4 text-sm">
              <li>
                <Link
                  href="https://www.audio-technica.com/es-us/at-lp120xusb?from=iolivares.com"
                  target="_blank"
                  className="font-semibold hover:underline"
                  rel="noopener noreferrer"
                >
                  Audio-Technica AT-LP120XUSB
                </Link>
                <p className="text-muted-foreground">This is a beautiful, dynamic and amazing turntable.</p>
              </li>
              <li>
                <Link
                  href="https://www.amazon.com/Yamaha-RX-396-Stereo-Receiver/dp/B0006IJHEQ?from=iolivares.com"
                  target="_blank"
                  className="font-semibold hover:underline"
                  rel="noopener noreferrer"
                >
                  Yamaha RX-385 Receiver
                </Link>
                <p className="text-muted-foreground">
                  The power of Yamaha + the collections of this nice receiver to connect everything.
                </p>
              </li>
              <li>
                <Link
                  href="http://www.samsontech.com/samson/products/studio-monitors/media-one/mediaone4a?from=iolivares.com"
                  target="_blank"
                  className="font-semibold hover:underline"
                  rel="noopener noreferrer"
                >
                  Samson Media ONE 4a
                </Link>
                <p className="text-muted-foreground">
                  Yes, I need better speakers but this one works until now to listen good music on Vinyls.
                </p>
              </li>
            </ul>
          </section>

          {/* Misc. Items Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">Misc. Items</h2>
            <ul className="space-y-4 text-sm">
              <li>
                <Link
                  href="https://www.microsoft.com/en-us/d/microsoft-arc-mouse-black/8mwhbv8qvskr?from=iolivares.com"
                  target="_blank"
                  className="font-semibold hover:underline"
                  rel="noopener noreferrer"
                >
                  Microsoft Arch Mouse
                </Link>
                <p className="text-muted-foreground">
                  My mouse backup, when I need to charge the Apple's one, I always have this amazing mouse ready.
                </p>
              </li>
              <li>
                <Link
                  href="https://www.thule.com/en-us/backpacks/laptop-backpacks/thule-construct-backpack-24l-_-3205352?from=iolivares.com"
                  target="_blank"
                  className="font-semibold hover:underline"
                  rel="noopener noreferrer"
                >
                  Thule Construct 24L Blue Laptop Backpack
                </Link>
                <p className="text-muted-foreground">Primary awesome tech backpack.</p>
              </li>
              <li>
                <Link
                  href="https://www.apple.com/watch/?from=iolivares.com"
                  target="_blank"
                  className="font-semibold hover:underline"
                  rel="noopener noreferrer"
                >
                  Apple Watch Series 10
                </Link>
                <p className="text-muted-foreground">
                  Yep, another Apple product, but the best smartwatch for Apple Ecosystem.
                </p>
              </li>
              <li>
                <Link
                  href="https://www.bose.com/p/earbuds/bose-quietcomfort-ultra-earbuds-2nd-gen/QCUE2-HEADPHONEIN.html?from=iolivares.com"
                  target="_blank"
                  className="font-semibold hover:underline"
                  rel="noopener noreferrer"
                >
                  Bose QuietComfort Ultra Earbuds 2nd Gen
                </Link>
                <p className="text-muted-foreground">I'm sorry Apple, but in sound and quality Bose are the #1.</p>
              </li>
              <li>
                <Link
                  href="https://www.bose.com/p/headphones/bose-quietcomfort-ultra-headphones/QCUH-HEADPHONEARN.html?from=iolivares.com"
                  target="_blank"
                  className="font-semibold hover:underline"
                  rel="noopener noreferrer"
                >
                  Bose QuietComfort Ultra Headphones
                </Link>
                <p className="text-muted-foreground">
                  My favorites after suffer the Apple Airpods Max. Bose QC, the best Headphones ever.
                </p>
              </li>
            </ul>
          </section>
        </div>
      </main>
    </div>
  )
}
