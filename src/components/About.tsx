import { personalInfo, aboutSlideshow } from '../data/portfolioData';
import { Reveal } from './Reveal';
import PhotoSlideshow from './PhotoSlideshow';

export default function About() {
  // Right-hand slot is optional — until a path is set it renders as a
  // labelled placeholder rather than a broken image.
  const second = personalInfo.photo2?.trim();

  return (
    <section id="about" className="section-pad" style={{ borderBottom: '1px solid var(--border)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <p className="label">About</p>
          <h2 className="heading">Engineer. Researcher. Builder.</h2>
        </Reveal>

        {/* Photo / bio / photo. The bio is written first in the DOM so reading
            and tab order follow the content, while grid-column places it in the
            middle visually. */}
        <div className="about-grid">
          <div className="about-bio">
            <Reveal delay={80}>
              <p className="about-p">
                I grew up in <strong>Shimla</strong>, a mountain town in northern India at the foothills
                of the Himalayas, a place that shaped how I think about interconnected systems and
                unpredictable environments. After my undergraduate degree in mechanical engineering
                in India, I moved to the U.S. for a master's and PhD at <strong>UC San Diego</strong>,
                where I joined the Gravish Lab and worked at the intersection of robotics, biology, and
                mechanics, building robots inspired by nature, from flapping-wing microrobots to
                underactuated robots that move and sense in sand and water.
              </p>
              <p className="about-p">
                What motivates me isn't technology for its own sake, but engineering that improves
                people's lives. That's what led me into medical devices, where I now work on complex
                electromechanical systems at <strong>Dexcom</strong>, from early feasibility through
                validation and real-world deployment. Outside of work, I love traveling, the outdoors,
                and the water: surfing, swimming, water skiing, and currently learning to sail with
                the MIT Sailing Club.
              </p>
            </Reveal>
          </div>

          <div className="about-photo about-photo-left">
            <Reveal delay={120}>
              <figure className="photo-frame">
                <img src={personalInfo.photo} alt="Shivam Chopra" />
              </figure>
            </Reveal>
          </div>

          <div className="about-photo about-photo-right">
            <Reveal delay={180}>
              {second ? (
                <figure className="photo-frame">
                  <img src={second} alt="Shivam in the lab" />
                </figure>
              ) : (
                /* Rotating slot for lab, field, and out-of-office shots. Fill in
                   aboutSlideshow in portfolioData.ts and these frames become
                   photos with captions. */
                <PhotoSlideshow slides={aboutSlideshow} title="in the field" placeholders />
              )}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
