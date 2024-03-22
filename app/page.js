/* eslint-disable @next/next/no-img-element */
import data from "./data.json";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      <div className="flex justify-end w-full">
        <div className="w-full max-w-[1080px]">
          <div className="flex flex-col md:grid md:grid-cols-4 md:gap-8 w-full">
            <div className="md:col-span-2 order-last md:order-first mb-4">
              <h2>Selected Projects</h2>
              <div>
                {data?.projects.map(
                  (
                    {
                      id,
                      title,
                      description,
                      year,
                      role,
                      image,
                      url,
                      hideLink,
                    },
                    index
                  ) => {
                    return (
                      <div key={index} className="flex flex-col mb-12">
                        <img className="mb-2" src={image} alt="" />
                        <h2 className="mb-2">{title}</h2>
                        <p
                          className="mb-2"
                          dangerouslySetInnerHTML={{ __html: description }}
                        />
                        <p className="mb-0">
                          {!hideLink && (
                            <a href={url} target="_blank">
                              Visit Website
                            </a>
                          )}
                        </p>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
            <div className="col-span-2">
              <div className="sticky top-4 flex flex-col gap-8 mb-12 md:mb-0">
                <div>
                  <h2>About</h2>
                  <p>
                    I&apos;m Michael Ciccarelli, a freelance software engineer
                    and consultant specializing in web development. I design,
                    code and implements UIs and functional prototypes for a
                    living, working remotely from Brooklyn, NY. This site is my
                    personal online identity and space for side–projects,
                    experiments and selected client work.
                  </p>
                  <p className="mb-0">
                    Currently in the fields of web3 and DeFi, and for over a
                    decade, I have successfully helped brands and early-stage
                    technology companies from all over the world, with their web
                    applications and digital products.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h2>Experience</h2>
                    <li>Freelance</li>
                    <li>Metropolis, Senior SWE</li>
                    <li>Axoni, Software Engineer</li>
                    <li>VICE Media, FE Lead</li>
                    <li>GREY Group, Staff Engineer</li>
                    <li>Condé Nast, Web Developer</li>
                  </div>
                  <div>
                    <h2>&nbsp;</h2>
                    <li>2016 —</li>
                    <li>2022 — </li>
                    <li>2021 — 2022</li>
                    <li>2014 — 2018</li>
                    <li>2013 — 2014</li>
                    <li>2012 — 2013</li>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h2>Clients</h2>
                    <li>Amazon</li>
                    <li>The WELL</li>
                    <li>Cannon</li>
                    <li>Pentagram</li>
                    <li>Architectual Digest</li>
                    <li>Elara Pictures</li>
                    <li>Style.com</li>
                    <li>Spinneybeck</li>
                    <li>Revolve Law Group</li>
                  </div>
                  <div>
                    <h2>Capabilities</h2>
                    <li>JavaScript/TypeScript</li>
                    <li>Next.js and React</li>
                    <li>E-commerce</li>
                    <li>Content Management</li>
                    <li>Jamstack/Headless</li>
                    <li>Static site generation</li>
                    <li>Figma &amp; prototyping</li>
                    <li>Animation and data viz</li>
                    <li>DevOps &amp; architecture</li>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h2>Contact</h2>
                    <li>
                      <a href="mailto:m@ciccarel.li">m[at]ciccarel.li</a>
                    </li>
                    <li>+1 917 783 3277</li>
                    <li>
                      <a href="https://twitter.com/0xhael">Twitter</a>,{" "}
                      <a href="https://instagram.com/minorvillain">Instagram</a>
                      , <a href="https://github.com/mciccarelli">Github</a>
                    </li>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
