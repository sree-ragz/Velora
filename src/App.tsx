import { useEffect, useMemo, useState } from "react";

type Page = "home" | "products" | "about" | "contact";
type Product = {
  name: string;
  category: string;
  tag: string;
  description: string;
  image: string;
  material: string;
};

const WA_NUMBER = "919876543210";
const waLink = (message = "Hello Velora! I would like to know more about your gifts.") =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;

const images = {
  gift: "https://images.unsplash.com/photo-1759563871375-d5b140f6646e?auto=format&fit=crop&w=1200&q=85",
  gift2:
    "https://images.unsplash.com/photo-1759563874665-ffa9dfbd0205?auto=format&fit=crop&w=1200&q=85",
  medal:
    "https://images.unsplash.com/photo-1790446154326-26761c690d5e?auto=format&fit=crop&w=1000&q=85",
  trophy:
    "https://images.unsplash.com/photo-1771747131849-41056d3d9be3?auto=format&fit=crop&w=1000&q=85",
  mug: "https://images.unsplash.com/photo-1576962101359-dc312a5ee63b?auto=format&fit=crop&w=1000&q=85",
  mug2: "https://images.unsplash.com/photo-1509046725455-ad9638a050e8?auto=format&fit=crop&w=1000&q=85",
  frame:
    "https://images.unsplash.com/photo-1600611987061-6a9a2081809e?auto=format&fit=crop&w=1000&q=85",
  shop: "https://images.unsplash.com/photo-1598305762558-328f599df683?auto=format&fit=crop&w=1400&q=85",
};

const products: Product[] = [
  {
    name: "The Celebration Hamper",
    category: "Gifts",
    tag: "Popular",
    description: "A thoughtful curation, beautifully packed for their big day.",
    image: images.gift,
    material: "Premium keepsake box",
  },
  {
    name: "Golden Arc Trophy",
    category: "Awards",
    tag: "New",
    description: "A statement award created to honour brilliant achievements.",
    image: images.trophy,
    material: "Metal and acrylic",
  },
  {
    name: "Star Performer Medal",
    category: "Awards",
    tag: "Popular",
    description: "A gleaming memento for milestones worth remembering.",
    image: images.medal,
    material: "Gold-finish alloy",
  },
  {
    name: "Your Story Mug",
    category: "Printing",
    tag: "Customisable",
    description: "Names, notes and memories printed for everyday smiles.",
    image: images.mug,
    material: "Premium ceramic",
  },
  {
    name: "Memory Lane Frame",
    category: "Printing",
    tag: "Customisable",
    description: "Turn a favourite moment into a timeless keepsake.",
    image: images.frame,
    material: "Wood and archival print",
  },
  {
    name: "Signature Brand Box",
    category: "Designs",
    tag: "New",
    description: "Refined branded gifting for teams, clients and partners.",
    image: images.gift2,
    material: "Rigid board and satin",
  },
  {
    name: "Morning Ritual Set",
    category: "Designs",
    tag: "Popular",
    description: "A warm little ritual for slow mornings and new beginnings.",
    image: images.mug2,
    material: "Ceramic and linen",
  },
  {
    name: "Milestone Plaque",
    category: "Awards",
    tag: "Customisable",
    description: "A personal tribute, crafted to mark a lasting legacy.",
    image: images.trophy,
    material: "Brass and walnut",
  },
];

const categories = [
  ["Gift", "Gifts", "A little joy, wrapped"],
  ["Award", "Awards", "Celebrate every win"],
  ["Sparkle", "Printing", "Your ideas, beautifully printed"],
  ["Heart", "Designs", "Created uniquely for you"],
];

const Icon = ({ name, size = 22 }: { name: string; size?: number }) => {
  const paths: Record<string, React.ReactNode> = {
    Gift: (
      <>
        <path d="M20 12v10H4V12M2 7h20v5H2zM12 22V7M12 7H7.5a2.5 2.5 0 1 1 0-5C11 2 12 7 12 7ZM12 7h4.5a2.5 2.5 0 1 0 0-5C13 2 12 7 12 7Z" />
      </>
    ),
    Award: (
      <>
        <circle cx="12" cy="8" r="6" />
        <path d="M15.5 13 17 22l-5-3-5 3 1.5-9" />
      </>
    ),
    Sparkle: (
      <>
        <path d="m12 3-1.4 3.6L7 8l3.6 1.4L12 13l1.4-3.6L17 8l-3.6-1.4L12 3ZM5 14l-.8 2.2L2 17l2.2.8L5 20l.8-2.2L8 17l-2.2-.8L5 14ZM19 14l-.8 2.2L16 17l2.2.8L19 20l.8-2.2L22 17l-2.2-.8L19 14Z" />
      </>
    ),
    Heart: (
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
    ),
    Briefcase: (
      <>
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18M10 12v2h4v-2" />
      </>
    ),
    Check: <path d="m5 12 4 4L19 6" />,
    Clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    Users: (
      <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" />
      </>
    ),
    Pin: (
      <>
        <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    Phone: (
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.8a2 2 0 0 1-.4 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
    ),
    Search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),
    Arrow: <path d="M5 12h14m-5-5 5 5-5 5" />,
    Menu: (
      <>
        <path d="M4 7h16M4 12h16M4 17h16" />
      </>
    ),
    Close: <path d="m6 6 12 12M18 6 6 18" />,
    Instagram: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <path d="M17.5 6.5h.01" />
      </>
    ),
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
};

function Logo({ light = false }: { light?: boolean }) {
  return (
    <button
      className={`logo ${light ? "logo-light" : ""}`}
      onClick={() => window.dispatchEvent(new CustomEvent("velora-nav", { detail: "home" }))}
      aria-label="Velora home"
    >
      <img className="logo-image" src="/velora-logo.png" alt="Velora" />
      <span className="logo-caption">Creative Gallery</span>
    </button>
  );
}

function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M16.04 2.67C8.72 2.67 2.76 8.59 2.76 15.88c0 2.34.62 4.63 1.8 6.64L2.67 29.33l7-1.83a13.4 13.4 0 0 0 6.37 1.62h.01c7.31 0 13.27-5.93 13.27-13.22a13.1 13.1 0 0 0-3.89-9.36 13.25 13.25 0 0 0-9.39-3.87Zm0 24.2h-.01a11.1 11.1 0 0 1-5.65-1.54l-.41-.24-4.15 1.09 1.11-4.03-.27-.42a10.93 10.93 0 0 1-1.69-5.85c0-6.11 5.01-11.09 11.08-11.09 2.94 0 5.71 1.14 7.79 3.23a10.98 10.98 0 0 1 3.24 7.83c0 6.11-5 11.08-11.04 11.08Zm6.07-8.3c-.33-.16-1.95-.96-2.25-1.07-.3-.11-.52-.16-.74.16-.22.33-.85 1.07-1.04 1.29-.19.22-.38.25-.71.08-.33-.16-1.39-.51-2.65-1.62-.98-.86-1.64-1.92-1.83-2.25-.19-.33-.02-.51.14-.67.15-.15.33-.38.49-.57.16-.19.22-.33.33-.55.11-.22.05-.41-.03-.57-.08-.16-.74-1.78-1.01-2.44-.27-.64-.54-.55-.74-.56h-.63c-.22 0-.57.08-.87.41-.3.33-1.15 1.12-1.15 2.74s1.18 3.18 1.34 3.4c.16.22 2.32 3.54 5.62 4.96.79.34 1.4.54 1.88.69.79.25 1.51.22 2.08.13.63-.09 1.95-.8 2.23-1.56.27-.77.27-1.43.19-1.56-.08-.14-.3-.22-.63-.38Z" />
    </svg>
  );
}

function ProductCard({ product, onOpen }: { product: Product; onOpen: (p: Product) => void }) {
  return (
    <article className="product-card">
      <button
        className="product-image"
        onClick={() => onOpen(product)}
        aria-label={`View ${product.name}`}
      >
        <img src={product.image} alt={product.name} />
        <span className="tag">{product.tag}</span>
      </button>
      <div className="product-copy">
        <p className="eyebrow">{product.category}</p>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <button className="text-link" onClick={() => onOpen(product)}>
          Enquire <Icon name="Arrow" size={17} />
        </button>
      </div>
    </article>
  );
}

function SectionTitle({ kicker, title, copy }: { kicker: string; title: string; copy?: string }) {
  return (
    <div className="section-title">
      <p className="eyebrow">{kicker}</p>
      <h2>{title}</h2>
      {copy && <p>{copy}</p>}
    </div>
  );
}

function Home({ go, openProduct }: { go: (p: Page) => void; openProduct: (p: Product) => void }) {
  const [quote, setQuote] = useState(0);
  const testimonials = [
    [
      "Velora made our annual awards feel genuinely special. Every detail was considered, and the team was so responsive.",
      "Ananya Mehta",
      "People & Culture, Arc Studio",
    ],
    [
      "The personalised hamper was even more beautiful in person. It felt warm, thoughtful and completely one of a kind.",
      "Rhea Kapoor",
      "Happy customer",
    ],
    [
      "From idea to delivery, everything was effortless. Our school trophies looked premium and arrived right on time.",
      "Daniel Thomas",
      "Greenfield Academy",
    ],
  ];
  return (
    <>
      <section className="hero">
        <div className="hero-orb orb-one" />
        <div className="hero-orb orb-two" />
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="hero-kicker">
              <Icon name="Sparkle" size={16} /> Creating Memories
            </div>
            <h1>
              Gifts that
              <br />
              say it <em>better.</em>
            </h1>
            <p>
              From tiny thank-yous to once-in-a-lifetime milestones, find something that feels just
              right—or let us make it uniquely yours.
            </p>
            <div className="button-row">
              <button className="btn btn-primary" onClick={() => go("products")}>
                Explore products <Icon name="Arrow" size={18} />
              </button>
              <a className="btn btn-outline" href={waLink()} target="_blank" rel="noreferrer">
                <WhatsAppIcon /> WhatsApp us
              </a>
            </div>
            <div className="hero-trust">
              <span>
                <Icon name="Check" size={16} /> Made with care
              </span>
              <span>
                <Icon name="Check" size={16} /> Personalised for you
              </span>
            </div>
          </div>
          <div className="hero-visual">
            <div className="ribbon-loop" />
            <div className="hero-main-img">
              <img src={images.gift} alt="A beautifully wrapped premium gift" />
            </div>
            <div className="floating-card fc-one">
              <span className="mini-icon">
                <Icon name="Heart" size={18} />
              </span>
              <div>
                <strong>Made personal</strong>
                <small>Just the way you imagined</small>
              </div>
            </div>
            <div className="floating-card fc-two">
              <img src={images.medal} alt="" />
              <div>
                <strong>Celebrate wins</strong>
                <small>Awards & recognition</small>
              </div>
            </div>
            <span className="spark s1">✦</span>
            <span className="spark s2">✦</span>
          </div>
        </div>
      </section>

      <section className="categories container">
        <SectionTitle kicker="Shop by category" title="A little something for every story" />
        <div className="category-grid">
          {categories.map(([icon, name, copy]) => (
            <button key={name} onClick={() => go("products")} className="category-card">
              <span>
                <Icon name={icon} />
              </span>
              <strong>{name}</strong>
              <small>{copy}</small>
              <Icon name="Arrow" size={16} />
            </button>
          ))}
        </div>
      </section>

      <section className="featured section">
        <div className="container">
          <div className="title-row">
            <SectionTitle
              kicker="Velora favourites"
              title="Gifts loved lately"
              copy="A few thoughtful picks for all the reasons you celebrate."
            />
            <button className="text-link desktop-link" onClick={() => go("products")}>
              View all products <Icon name="Arrow" size={18} />
            </button>
          </div>
          <div className="product-grid">
            {products.slice(0, 8).map((p) => (
              <ProductCard product={p} onOpen={openProduct} key={p.name} />
            ))}
          </div>
        </div>
      </section>

      <section className="occasions section">
        <div className="container">
          <SectionTitle kicker="Gifts for every moment" title="What are we celebrating?" />
          <div className="occasion-row">
            {[
              "Birthdays",
              "Weddings",
              "Anniversaries",
              "Corporate",
              "Sports & Awards",
              "School & College",
            ].map((x, i) => (
              <button key={x} onClick={() => go("products")}>
                <span>{["01", "02", "03", "04", "05", "06"][i]}</span>
                {x}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="why section container">
        <div className="why-intro">
          <SectionTitle
            kicker="Why Velora"
            title="The joy is in the details"
            copy="We believe the best gifts feel effortless to give and unforgettable to receive."
          />
          <div className="gold-line" />
        </div>
        <div className="why-grid">
          {[
            ["Sparkle", "Beautiful quality", "Materials and finishes selected to feel special."],
            ["Heart", "Made personal", "Your names, dates, colours and ideas—brought to life."],
            ["Clock", "Quick turnaround", "Clear timelines and thoughtful service, always."],
            ["Users", "Bulk orders, simplified", "Consistent, polished gifting at any scale."],
          ].map(([icon, title, copy], i) => (
            <article key={title} className={`why-card why-${i}`}>
              <span>
                <Icon name={icon} size={25} />
              </span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="gallery section">
        <div className="container">
          <div className="title-row">
            <SectionTitle kicker="From our studio" title="Made to make them smile" />
            <a
              className="text-link desktop-link"
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
            >
              <Icon name="Instagram" size={18} /> Follow @veloragifts
            </a>
          </div>
          <div className="gallery-grid">
            {[images.gift, images.mug, images.medal, images.frame, images.gift2, images.mug2].map(
              (src, i) => (
                <div key={src} className={`gallery-item g${i}`}>
                  <img src={src} alt="Velora gift inspiration" />
                  <span>
                    <Icon name="Instagram" />
                  </span>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      <section className="testimonials section container">
        <p className="quote-mark">“</p>
        <div className="quote-wrap">
          <p className="eyebrow">Kind words</p>
          <blockquote>{testimonials[quote][0]}</blockquote>
          <div className="quote-person">
            <strong>{testimonials[quote][1]}</strong>
            <span>{testimonials[quote][2]}</span>
          </div>
          <div className="dots">
            {testimonials.map((_, i) => (
              <button
                className={quote === i ? "active" : ""}
                onClick={() => setQuote(i)}
                aria-label={`Testimonial ${i + 1}`}
                key={i}
              />
            ))}
          </div>
        </div>
      </section>

      <Cta />
    </>
  );
}

function ProductsPage({ openProduct }: { openProduct: (p: Product) => void }) {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [visible, setVisible] = useState(6);
  const filters = ["All", "Gifts", "Awards", "Printing", "Designs"];
  const results = useMemo(
    () =>
      products.filter(
        (p) =>
          (filter === "All" || p.category === filter) &&
          p.name.toLowerCase().includes(search.toLowerCase()),
      ),
    [filter, search],
  );
  return (
    <main className="inner-page">
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">The collection</p>
          <h1>
            Find the one that feels <em>just right.</em>
          </h1>
          <p>
            Browse thoughtful gifts, keepsakes and awards. Every piece can begin with a
            conversation.
          </p>
        </div>
      </section>
      <section className="container product-browser">
        <div className="filter-bar">
          <div className="filter-chips">
            {filters.map((f) => (
              <button
                className={filter === f ? "active" : ""}
                onClick={() => {
                  setFilter(f);
                  setVisible(6);
                }}
                key={f}
              >
                {f}
              </button>
            ))}
          </div>
          <label className="search">
            <Icon name="Search" size={19} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products"
            />
          </label>
        </div>
        <p className="result-count">{results.length} thoughtful finds</p>
        <div className="product-grid">
          {results.slice(0, visible).map((p) => (
            <ProductCard product={p} onOpen={openProduct} key={p.name} />
          ))}
        </div>
        {visible < results.length && (
          <button className="btn btn-outline load-more" onClick={() => setVisible((v) => v + 3)}>
            Load more
          </button>
        )}
        {!results.length && (
          <div className="empty">
            <Icon name="Gift" size={42} />
            <h3>No gifts found</h3>
            <p>Try another search or category.</p>
          </div>
        )}
      </section>
      <Cta />
    </main>
  );
}

function About() {
  return (
    <main className="inner-page">
      <section className="page-hero about-hero">
        <div className="container">
          <p className="eyebrow">Our story</p>
          <h1>
            Good gifts hold a little bit of <em>you.</em>
          </h1>
        </div>
      </section>
      <section className="container story section">
        <div className="story-image">
          <img src={images.shop} alt="A warm, curated boutique interior" />
          <span>
            Thoughtfully yours
            <br />
            since 2018
          </span>
        </div>
        <div className="story-copy">
          <p className="eyebrow">Meet Velora</p>
          <h2>We make giving feel joyful again.</h2>
          <p>
            Velora began with a simple belief: a gift doesn’t need to be grand to mean everything.
            It just needs to feel considered.
          </p>
          <p>
            From our small creative studio, we help people celebrate everyday joys, important
            milestones and the people who make life brighter. Every detail—from the first idea to
            the final ribbon—is handled with warmth and care.
          </p>
          <a
            className="btn btn-primary"
            href={waLink("Hello Velora! I would love to know more about your custom gifting.")}
            target="_blank"
            rel="noreferrer"
          >
            Start a conversation <Icon name="Arrow" size={18} />
          </a>
        </div>
      </section>
      <section className="values section">
        <div className="container">
          <SectionTitle kicker="What matters to us" title="Made with meaning" />
          <div className="values-grid">
            {[
              [
                "Heart",
                "Personal over perfect",
                "We listen first, then create something that truly feels like you.",
              ],
              [
                "Sparkle",
                "Craft in every detail",
                "From finish to packaging, the little things are never an afterthought.",
              ],
              [
                "Users",
                "Warm, human service",
                "Real conversations, honest guidance and a team that genuinely cares.",
              ],
            ].map((x) => (
              <article key={x[1]}>
                <span>
                  <Icon name={x[0]} size={25} />
                </span>
                <h3>{x[1]}</h3>
                <p>{x[2]}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <Cta />
    </main>
  );
}

function Contact() {
  return (
    <main className="inner-page">
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Say hello</p>
          <h1>
            Let’s make something <em>memorable.</em>
          </h1>
          <p>Have an idea, an occasion or just a feeling? Tell us about it—we’d love to help.</p>
        </div>
      </section>
      <section className="container contact-grid section">
        <div className="contact-card">
          <p className="eyebrow">The quickest way</p>
          <h2>Chat with our gifting team</h2>
          <p>
            Share your occasion, quantity, timeline or inspiration. We usually reply within a few
            working hours.
          </p>
          <a className="btn btn-whatsapp" href={waLink()} target="_blank" rel="noreferrer">
            <WhatsAppIcon /> Enquire on WhatsApp
          </a>
          <div className="contact-details">
            <div>
              <span>
                <Icon name="Phone" />
              </span>
              <p>
                <small>Call us</small>
                <a href="tel:+919876543210">+91 98765 43210</a>
              </p>
            </div>
            <div>
              <span>
                <Icon name="Pin" />
              </span>
              <p>
                <small>Visit us</small>24, Garden Avenue, Indiranagar
                <br />
                Bengaluru 560038
              </p>
            </div>
            <div>
              <span>
                <Icon name="Clock" />
              </span>
              <p>
                <small>Working hours</small>Mon–Sat, 10:00 AM–7:00 PM
              </p>
            </div>
            <div>
              <span>
                <Icon name="Instagram" />
              </span>
              <p>
                <small>Instagram</small>
                <a href="https://instagram.com" target="_blank" rel="noreferrer">
                  @veloragifts
                </a>
              </p>
            </div>
          </div>
        </div>
        <div className="map">
          <div className="map-road r1" />
          <div className="map-road r2" />
          <div className="map-road r3" />
          <span className="map-pin">
            <Icon name="Pin" size={28} />
          </span>
          <div className="map-label">
            <strong>Velora</strong>
            <small>Creative Gallery</small>
          </div>
        </div>
      </section>
    </main>
  );
}

function Cta() {
  return (
    <section className="cta-section container">
      <div className="cta">
        <div className="cta-confetti">✦</div>
        <div>
          <p className="eyebrow">Something special in mind?</p>
          <h2>Let’s bring your gift idea to life.</h2>
          <p>
            Tell us the occasion, your timeline and what you’re imagining. We’ll take it from there.
          </p>
        </div>
        <a
          className="btn btn-whatsapp"
          href={waLink(
            "Hello Velora! I am looking for something special and would love your help.",
          )}
          target="_blank"
          rel="noreferrer"
        >
          <WhatsAppIcon /> Enquire on WhatsApp
        </a>
      </div>
    </section>
  );
}

function Footer({ go }: { go: (p: Page) => void }) {
  return (
    <footer>
      <div className="container footer-grid">
        <div>
          <Logo light />
          <p>
            Creating Memories through thoughtful gifts,
            <br />
            meaningful details and joyful design.
          </p>
          <div className="social">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
              <Icon name="Instagram" />
            </a>
          </div>
        </div>
        <div>
          <h4>Explore</h4>
          {(["home", "products", "about", "contact"] as Page[]).map((p) => (
            <button onClick={() => go(p)} key={p}>
              {p[0].toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>
        <div>
          <h4>Visit us</h4>
          <p>
            24, Garden Avenue
            <br />
            Indiranagar, Bengaluru 560038
          </p>
          <a href="tel:+919876543210">+91 98765 43210</a>
        </div>
        <div className="footer-note">
          <p>Need help choosing?</p>
          <a href={waLink()} target="_blank" rel="noreferrer">
            Chat with us <Icon name="Arrow" size={16} />
          </a>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© 2026 Velora. Made with care.</span>
        <span>Gifts • Awards • Printing • Designs</span>
      </div>
    </footer>
  );
}

function ProductModal({ product, onClose }: { product: Product; onClose: () => void }) {
  const [thumb, setThumb] = useState(0);
  useEffect(() => {
    const key = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", key);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", key);
    };
  }, [onClose]);
  const gallery = [
    product.image,
    product.category === "Awards" ? images.medal : images.gift2,
    product.category === "Printing" ? images.mug2 : images.frame,
  ];
  return (
    <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal" role="dialog" aria-modal="true" aria-label={product.name}>
        <button className="modal-close" onClick={onClose}>
          <Icon name="Close" />
        </button>
        <div className="modal-gallery">
          <div className="modal-main">
            <img src={gallery[thumb]} alt={product.name} />
          </div>
          <div className="thumbs">
            {gallery.map((x, i) => (
              <button className={thumb === i ? "active" : ""} onClick={() => setThumb(i)} key={x}>
                <img src={x} alt="" />
              </button>
            ))}
          </div>
        </div>
        <div className="modal-copy">
          <p className="eyebrow">
            {product.category} · {product.tag}
          </p>
          <h2>{product.name}</h2>
          <p>{product.description} We’ll help you tailor every detail to the occasion.</p>
          <div className="options">
            <div>
              <small>Material</small>
              <strong>{product.material}</strong>
            </div>
            <div>
              <small>Available options</small>
              <strong>Size, colour & finish</strong>
            </div>
            <div>
              <small>Personalisation</small>
              <strong>Name, message or logo</strong>
            </div>
          </div>
          <p className="note">
            <Icon name="Sparkle" size={17} /> Custom requests are always welcome.
          </p>
          <a
            className="btn btn-whatsapp"
            href={waLink(
              `Hello Velora! I’m interested in the ${product.name}. Could you share more details?`,
            )}
            target="_blank"
            rel="noreferrer"
          >
            <WhatsAppIcon /> Enquire on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [menu, setMenu] = useState(false);
  const [selected, setSelected] = useState<Product | null>(null);
  const go = (p: Page) => {
    setPage(p);
    setMenu(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  useEffect(() => {
    const nav = (e: Event) => go((e as CustomEvent<Page>).detail);
    window.addEventListener("velora-nav", nav);
    return () => window.removeEventListener("velora-nav", nav);
  }, []);
  return (
    <div>
      <header>
        <div className="container nav">
          <Logo />
          <nav className={menu ? "open" : ""}>
            {(["home", "products", "about", "contact"] as Page[]).map((p) => (
              <button className={page === p ? "active" : ""} onClick={() => go(p)} key={p}>
                {p[0].toUpperCase() + p.slice(1)}
              </button>
            ))}
            <a
              className="btn btn-whatsapp mobile-wa"
              href={waLink()}
              target="_blank"
              rel="noreferrer"
            >
              <WhatsAppIcon /> Chat on WhatsApp
            </a>
          </nav>
          <a className="btn btn-whatsapp nav-wa" href={waLink()} target="_blank" rel="noreferrer">
            <WhatsAppIcon /> Chat on WhatsApp
          </a>
          <button className="menu-btn" onClick={() => setMenu(!menu)} aria-label="Toggle menu">
            <Icon name={menu ? "Close" : "Menu"} />
          </button>
        </div>
      </header>
      {page === "home" && <Home go={go} openProduct={setSelected} />}
      {page === "products" && <ProductsPage openProduct={setSelected} />}
      {page === "about" && <About />}
      {page === "contact" && <Contact />}
      <Footer go={go} />
      <a
        className="floating-wa"
        href={waLink()}
        target="_blank"
        rel="noreferrer"
        aria-label="Enquire on WhatsApp"
      >
        <WhatsAppIcon size={26} />
        <span>Enquire</span>
      </a>
      {selected && <ProductModal product={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
