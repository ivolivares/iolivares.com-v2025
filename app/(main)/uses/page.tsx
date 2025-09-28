"use client"

import Link from "next/link"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { useTranslation } from "@/hooks/use-translation"

export default function UsesPage() {
  const sectionRef = useScrollReveal()
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main ref={sectionRef} className="container mx-auto px-4 py-16 max-w-6xl scroll-reveal">
        <div className="mb-16">
          <h1 className="text-4xl font-bold mb-6 text-balance">{t("uses.title")}</h1>
          <p className="text-lg text-muted-foreground mb-4">{t("uses.description1")}</p>
          <p className="text-muted-foreground mb-8">
            {t("uses.description2")}{" "}
            <Link href="#" className="text-primary hover:underline">
              @ivolivares
            </Link>
          </p>
          <p className="text-sm text-muted-foreground mb-12">
            {t("uses.description3")}{" "}
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
            <h2 className="text-2xl font-semibold mb-6">{t("uses.sections.hardware.title")}</h2>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start space-y-2">
                <div>
                  <Link
                    href="https://www.apple.com/mac-mini/?from=iolivares.com"
                    target="_blank"
                    className="font-semibold hover:underline"
                    rel="noopener noreferrer"
                  >
                    {t("uses.sections.hardware.items.appleMacMini.name")}
                  </Link>{" "}
                  <p className="text-muted-foreground">{t("uses.sections.hardware.items.appleMacMini.description")}</p>
                </div>
              </li>
              <li className="flex items-start space-y-2">
                <div>
                  <Link
                    href="https://link.iolivares.com/dellp2414h-amzn"
                    target="_blank"
                    className="font-semibold hover:underline"
                    rel="noopener noreferrer"
                  >
                    {t("uses.sections.hardware.items.dellMonitor.name")}
                  </Link>
                  {" + "}
                  <Link
                    href="https://link.iolivares.com/smsngc4f390-amzn"
                    target="_blank"
                    className="font-semibold hover:underline"
                    rel="noopener noreferrer"
                  >
                    {t("uses.sections.hardware.items.samsunMonitor.name")}
                  </Link>{" "}
                  <p className="text-muted-foreground">
                    {t("uses.sections.hardware.items.dellSamsungMonitors.description")}
                  </p>
                </div>
              </li>
              <li className="flex items-start space-y-2">
                <div>
                  <Link
                    href="https://link.iolivares.com/bosecomp2seriesIII-amzn"
                    target="_blank"
                    className="font-semibold hover:underline"
                    rel="noopener noreferrer"
                  >
                    {t("uses.sections.hardware.items.boseSpeakers.name")}
                  </Link>{" "}
                  <p className="text-muted-foreground">{t("uses.sections.hardware.items.boseSpeakers.description")}</p>
                </div>
              </li>
              <li className="flex items-start space-y-2">
                <div>
                  <Link
                    href="https://link.iolivares.com/samsongomic-amzn"
                    target="_blank"
                    className="font-semibold hover:underline"
                    rel="noopener noreferrer"
                  >
                    {t("uses.sections.hardware.items.samsonMic.name")}
                  </Link>{" "}
                  <p className="text-muted-foreground">{t("uses.sections.hardware.items.samsonMic.description")}</p>
                </div>
              </li>
              <li className="flex items-start space-y-2">
                <div>
                  <Link
                    href="https://link.iolivares.com/logitechc920-amzn"
                    target="_blank"
                    className="font-semibold hover:underline"
                    rel="noopener noreferrer"
                  >
                    {t("uses.sections.hardware.items.logitechWebcam.name")}
                  </Link>{" "}
                  <p className="text-muted-foreground">
                    {t("uses.sections.hardware.items.logitechWebcam.description")}
                  </p>
                </div>
              </li>
              <li className="flex items-start space-y-2">
                <div>
                  <Link
                    href="https://link.iolivares.com/tobenonedock-amzn"
                    target="_blank"
                    className="font-semibold hover:underline"
                    rel="noopener noreferrer"
                  >
                    {t("uses.sections.hardware.items.tobenoneDock.name")}
                  </Link>{" "}
                  <p className="text-muted-foreground">{t("uses.sections.hardware.items.tobenoneDock.description")}</p>
                </div>
              </li>
              <li className="flex items-start space-y-2">
                <div>
                  <Link
                    href="https://link.iolivares.com/ipadmini-amzn"
                    target="_blank"
                    className="font-semibold hover:underline"
                    rel="noopener noreferrer"
                  >
                    {t("uses.sections.hardware.items.appleIpadMini.name")}
                  </Link>{" "}
                  <p className="text-muted-foreground">{t("uses.sections.hardware.items.appleIpadMini.description")}</p>
                </div>
              </li>
              <li className="flex items-start space-y-2">
                <div>
                  <Link
                    href="https://link.iolivares.com/ergofoamseat-amazn"
                    target="_blank"
                    className="font-semibold hover:underline"
                    rel="noopener noreferrer"
                  >
                    {t("uses.sections.hardware.items.ergofoamChair.name")}
                  </Link>{" "}
                  <p className="text-muted-foreground">{t("uses.sections.hardware.items.ergofoamChair.description")}</p>
                </div>
              </li>
              <li className="flex items-start space-y-2">
                <div>
                  <Link
                    href="https://link.iolivares.com/standdesk-ergonomics"
                    target="_blank"
                    className="font-semibold hover:underline"
                    rel="noopener noreferrer"
                  >
                    {t("uses.sections.hardware.items.ergonomicDesk.name")}
                  </Link>{" "}
                  <p className="text-muted-foreground">{t("uses.sections.hardware.items.ergonomicDesk.description")}</p>
                </div>
              </li>
              <li className="flex items-start space-y-2">
                <div>
                  <Link
                    href="https://link.iolivares.com/iphone14promax-amzn"
                    target="_blank"
                    className="font-semibold hover:underline"
                    rel="noopener noreferrer"
                  >
                    {t("uses.sections.hardware.items.iphone14ProMax.name")}
                  </Link>{" "}
                  <p className="text-muted-foreground">
                    {t("uses.sections.hardware.items.iphone14ProMax.description")}
                  </p>
                </div>
              </li>
              <li className="flex items-start space-y-2">
                <div>
                  <Link
                    href="https://link.iolivares.com/canoneost5-amzn"
                    target="_blank"
                    className="font-semibold hover:underline"
                    rel="noopener noreferrer"
                  >
                    {t("uses.sections.hardware.items.canonCamera.name")}
                  </Link>{" "}
                  <p className="text-muted-foreground">{t("uses.sections.hardware.items.canonCamera.description")}</p>
                </div>
              </li>
            </ul>
          </section>

          {/* Software & Apps Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">{t("uses.sections.software.title")}</h2>
            <ul className="space-y-4 text-sm">
              <li>
                <Link
                  href="https://iterm2.com/?from=iolivares.com"
                  target="_blank"
                  className="font-semibold hover:underline"
                  rel="noopener noreferrer"
                >
                  {t("uses.sections.software.items.iterm2.name")}
                </Link>
                <p className="text-muted-foreground">{t("uses.sections.software.items.iterm2.description")}</p>
              </li>
              <li>
                <Link
                  href="https://ohmyz.sh/?from=iolivares.com"
                  target="_blank"
                  className="font-semibold hover:underline"
                  rel="noopener noreferrer"
                >
                  {t("uses.sections.software.items.zshOhmyzsh.name")}
                </Link>
                <p className="text-muted-foreground">{t("uses.sections.software.items.zshOhmyzsh.description")}</p>
              </li>
              <li>
                <Link
                  href="https://squoosh.app/?from=iolivares.com"
                  target="_blank"
                  className="font-semibold hover:underline"
                  rel="noopener noreferrer"
                >
                  {t("uses.sections.software.items.squoosh.name")}
                </Link>
                <p className="text-muted-foreground">{t("uses.sections.software.items.squoosh.description")}</p>
              </li>
              <li>
                <Link
                  href="https://1password.com/?from=iolivares.com"
                  target="_blank"
                  className="font-semibold hover:underline"
                  rel="noopener noreferrer"
                >
                  {t("uses.sections.software.items.onepassword.name")}
                </Link>
                <p className="text-muted-foreground">{t("uses.sections.software.items.onepassword.description")}</p>
              </li>
              <li>
                <Link
                  href="https://refer.dub.co/ivan-olivares-r?from=iolivares.com"
                  target="_blank"
                  className="font-semibold hover:underline"
                  rel="noopener noreferrer"
                >
                  {t("uses.sections.software.items.dub.name")}
                </Link>
                <p className="text-muted-foreground">{t("uses.sections.software.items.dub.description")}</p>
              </li>
            </ul>

            <h3 className="text-xl font-semibold mt-8 mb-4">{t("uses.sections.software.ideExtensions.title")}</h3>
            <ul className="space-y-4 text-sm">
              <li>
                <Link
                  href="https://code.visualstudio.com/?from=iolivares.com"
                  target="_blank"
                  className="font-semibold hover:underline"
                  rel="noopener noreferrer"
                >
                  {t("uses.sections.software.ideExtensions.items.vscode.name")}
                </Link>
                <p className="text-muted-foreground">
                  {t("uses.sections.software.ideExtensions.items.vscode.description")}
                </p>
              </li>
              <li>
                <Link
                  href="https://draculatheme.com/?from=iolivares.com"
                  target="_blank"
                  className="font-semibold hover:underline"
                  rel="noopener noreferrer"
                >
                  {t("uses.sections.software.ideExtensions.items.draculaTheme.name")}
                </Link>
                <p className="text-muted-foreground">
                  {t("uses.sections.software.ideExtensions.items.draculaTheme.description")}
                </p>
              </li>
              <li>
                <Link
                  href="https://philpl.gumroad.com/l/dank-mono?from=iolivares.com"
                  target="_blank"
                  className="font-semibold hover:underline"
                  rel="noopener noreferrer"
                >
                  {t("uses.sections.software.ideExtensions.items.dashMonoFont.name")}
                </Link>
                <p className="text-muted-foreground">
                  {t("uses.sections.software.ideExtensions.items.dashMonoFont.description")}
                </p>
              </li>
              <li>
                <Link
                  href="https://link.iolivares.com/raycast"
                  target="_blank"
                  className="font-semibold hover:underline"
                  rel="noopener noreferrer"
                >
                  {t("uses.sections.software.ideExtensions.items.raycast.name")}
                </Link>
                <p className="text-muted-foreground">
                  {t("uses.sections.software.ideExtensions.items.raycast.description")}
                </p>
              </li>
            </ul>
          </section>

          {/* Git, Building, Hosting, Monitoring Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">{t("uses.sections.gitHosting.title")}</h2>
            <ul className="space-y-4 text-sm">
              <li>
                <Link
                  href="https://github.com/?from=iolivares.com"
                  target="_blank"
                  className="font-semibold hover:underline"
                  rel="noopener noreferrer"
                >
                  {t("uses.sections.gitHosting.items.github.name")}
                </Link>
                <p className="text-muted-foreground">{t("uses.sections.gitHosting.items.github.description")}</p>
              </li>
              <li>
                <Link
                  href="https://posthog.com/?from=iolivares.com"
                  target="_blank"
                  className="font-semibold hover:underline"
                  rel="noopener noreferrer"
                >
                  {t("uses.sections.gitHosting.items.posthog.name")}
                </Link>
                <p className="text-muted-foreground">{t("uses.sections.gitHosting.items.posthog.description")}</p>
              </li>
              <li>
                <Link
                  href="https://www.cloudflare.com/?from=iolivares.com"
                  target="_blank"
                  className="font-semibold hover:underline"
                  rel="noopener noreferrer"
                >
                  {t("uses.sections.gitHosting.items.cloudflare.name")}
                </Link>
                <p className="text-muted-foreground">{t("uses.sections.gitHosting.items.cloudflare.description")}</p>
              </li>
            </ul>
          </section>

          {/* Automation and Domotics (IoT) Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">{t("uses.sections.automation.title")}</h2>
            <ul className="space-y-4 text-sm">
              <li>
                <Link
                  href="https://link.iolivares.com/googlehomemini-amzn"
                  target="_blank"
                  className="font-semibold hover:underline"
                  rel="noopener noreferrer"
                >
                  {t("uses.sections.automation.items.googleHomeMini.name")}
                </Link>
                <p className="text-muted-foreground">
                  {t("uses.sections.automation.items.googleHomeMini.description")}
                </p>
              </li>
              <li>
                <Link
                  href="https://link.iolivares.com/philipshue-amzn"
                  target="_blank"
                  className="font-semibold hover:underline"
                  rel="noopener noreferrer"
                >
                  {t("uses.sections.automation.items.philipsHueLights.name")}
                </Link>
                <p className="text-muted-foreground">
                  {t("uses.sections.automation.items.philipsHueLights.description")}
                </p>
              </li>
              <li>
                <Link
                  href="https://amzn.to/470rsWY?from=iolivares.com"
                  target="_blank"
                  className="font-semibold hover:underline"
                  rel="noopener noreferrer"
                >
                  {t("uses.sections.automation.items.philipsHuePlaySync.name")}
                </Link>
                <p className="text-muted-foreground">
                  {t("uses.sections.automation.items.philipsHuePlaySync.description")}
                </p>
              </li>
            </ul>
          </section>

          {/* Music System Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">{t("uses.sections.music.title")}</h2>
            <ul className="space-y-4 text-sm">
              <li>
                <Link
                  href="https://amzn.to/4874HSw?from=iolivares.com"
                  target="_blank"
                  className="font-semibold hover:underline"
                  rel="noopener noreferrer"
                >
                  {t("uses.sections.music.items.audioTechnicaTurntable.name")}
                </Link>
                <p className="text-muted-foreground">
                  {t("uses.sections.music.items.audioTechnicaTurntable.description")}
                </p>
              </li>
              <li>
                <Link
                  href="https://amzn.to/475WVWX?from=iolivares.com"
                  target="_blank"
                  className="font-semibold hover:underline"
                  rel="noopener noreferrer"
                >
                  {t("uses.sections.music.items.yamahaReceiver.name")}
                </Link>
                <p className="text-muted-foreground">{t("uses.sections.music.items.yamahaReceiver.description")}</p>
              </li>
              <li>
                <Link
                  href="https://amzn.to/46MUf08?from=iolivares.com"
                  target="_blank"
                  className="font-semibold hover:underline"
                  rel="noopener noreferrer"
                >
                  {t("uses.sections.music.items.samsonSpeakers.name")}
                </Link>
                <p className="text-muted-foreground">{t("uses.sections.music.items.samsonSpeakers.description")}</p>
              </li>
            </ul>
          </section>

          {/* Misc. Items Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">{t("uses.sections.misc.title")}</h2>
            <ul className="space-y-4 text-sm">
              <li>
                <Link
                  href="https://amzn.to/4nXEKth?from=iolivares.com"
                  target="_blank"
                  className="font-semibold hover:underline"
                  rel="noopener noreferrer"
                >
                  {t("uses.sections.misc.items.microsoftArchMouse.name")}
                </Link>
                <p className="text-muted-foreground">{t("uses.sections.misc.items.microsoftArchMouse.description")}</p>
              </li>
              <li>
                <Link
                  href="https://amzn.to/4gObH9d?from=iolivares.com"
                  target="_blank"
                  className="font-semibold hover:underline"
                  rel="noopener noreferrer"
                >
                  {t("uses.sections.misc.items.thuleBackpack.name")}
                </Link>
                <p className="text-muted-foreground">{t("uses.sections.misc.items.thuleBackpack.description")}</p>
              </li>
              <li>
                <Link
                  href="https://amzn.to/4nsymdC?from=iolivares.com"
                  target="_blank"
                  className="font-semibold hover:underline"
                  rel="noopener noreferrer"
                >
                  {t("uses.sections.misc.items.appleWatchSeries10.name")}
                </Link>
                <p className="text-muted-foreground">{t("uses.sections.misc.items.appleWatchSeries10.description")}</p>
              </li>
              <li>
                <Link
                  href="https://amzn.to/3VFb1t2?from=iolivares.com"
                  target="_blank"
                  className="font-semibold hover:underline"
                  rel="noopener noreferrer"
                >
                  {t("uses.sections.misc.items.boseEarbuds.name")}
                </Link>
                <p className="text-muted-foreground">{t("uses.sections.misc.items.boseEarbuds.description")}</p>
              </li>
              <li>
                <Link
                  href="https://amzn.to/42Chs3Z?from=iolivares.com"
                  target="_blank"
                  className="font-semibold hover:underline"
                  rel="noopener noreferrer"
                >
                  {t("uses.sections.misc.items.boseHeadphones.name")}
                </Link>
                <p className="text-muted-foreground">{t("uses.sections.misc.items.boseHeadphones.description")}</p>
              </li>
            </ul>
          </section>
        </div>
      </main>
    </div>
  )
}
