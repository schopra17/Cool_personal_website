import { aboutFieldPhotos, aboutLifePhotos } from '../data/portfolioData';
import { Reveal } from './Reveal';
import PhotoSlideshow from './PhotoSlideshow';

/* Two rotating frames flanking the bio: work on one side, life on the other,
   which is the same split the bio itself makes. The headshot is not repeated
   here, it already carries the hero. */
export default function About() {
  return (
    <section id="about" className="section-pad" style={{ borderBottom: '1px solid var(--border)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <p className="label">About</p>
          <h2 className="heading">Engineer. Researcher. Explorer.</h2>
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
              <PhotoSlideshow slides={aboutFieldPhotos} title="in the field" placeholders />
            </Reveal>
          </div>

          <div className="about-photo about-photo-right">
            <Reveal delay={180}>
              <PhotoSlideshow slides={aboutLifePhotos} title="shimla & the outdoors" placeholders />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
