import './App.css';
import logo from './OriginakLogo.png';

const products = [
  {
    id: 1,
    name: 'Handwoven Table Runner',
    description: 'Soft cotton runner with subtle earthy tones for everyday elegance.',
    price: '₹1,200',
    image:
      'https://images.pexels.com/photos/3965545/pexels-photo-3965545.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 2,
    name: 'Clay Aroma Diffuser',
    description: 'Handcrafted terracotta diffuser that fills your space with calm.',
    price: '₹950',
    image:
      'https://images.pexels.com/photos/4109992/pexels-photo-4109992.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 3,
    name: 'Block-Printed Cushion Cover',
    description: 'Artisan-printed cushion cover inspired by traditional motifs.',
    price: '₹650',
    image:
      'https://images.pexels.com/photos/3965534/pexels-photo-3965534.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 4,
    name: 'Hand-painted Ceramic Mug',
    description: 'Each mug is painted by hand – no two are the same.',
    price: '₹780',
    image:
      'https://images.pexels.com/photos/1416530/pexels-photo-1416530.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

function App() {
  return (
    <div className="arioto-app">
      <header className="arioto-header">
        <div className="arioto-logo-group">
          <img src={logo} alt="Arioto logo" className="arioto-logo" />
          <div className="arioto-brand-text">
            <span className="arioto-brand-name">Arioto</span>
            <span className="arioto-tagline">Handmade craft studio</span>
          </div>
        </div>
        <nav className="arioto-nav">
          <a href="#home">Home</a>
          <a href="#products">Products</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main>
        <section id="home" className="arioto-hero">
          <div className="arioto-hero-content">
            <p className="arioto-eyebrow">Handmade craft brand</p>
            <h1 className="arioto-hero-title">
              Crafted with love,<br />shared with joy <span aria-label="heart" role="img">♥</span>
            </h1>
            <p className="arioto-hero-subtitle">
              Arioto celebrates slow, mindful living with small-batch pieces that bring warmth,
              texture, and story into your everyday spaces.
            </p>
            <div className="arioto-hero-actions">
              <a href="#products" className="btn-primary">
                Browse products
              </a>
              <a href="#contact" className="btn-secondary">
                Talk to us
              </a>
            </div>
          </div>
          <div className="arioto-hero-card">
            <p className="arioto-hero-card-title">Made by hand, not haste</p>
            <p className="arioto-hero-card-body">
              Every Arioto piece is thoughtfully crafted in small batches, using natural materials,
              traditional techniques, and a whole lot of heart.
            </p>
          </div>
        </section>

        <section id="products" className="arioto-section arioto-products-section">
          <div className="arioto-section-header">
            <h2>Featured products</h2>
            <p>Each piece is handmade – variations are part of the story.</p>
          </div>
          <div className="arioto-product-grid">
            {products.map((product) => (
              <article key={product.id} className="arioto-product-card">
                <div className="arioto-product-image-wrapper">
                  <img src={product.image} alt={product.name} className="arioto-product-image" />
                </div>
                <div className="arioto-product-content">
                  <h3>{product.name}</h3>
                  <p className="arioto-product-description">{product.description}</p>
                  <div className="arioto-product-footer">
                    <span className="arioto-product-price">{product.price}</span>
                    <button type="button" className="arioto-product-cta">
                      Enquire
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="arioto-section arioto-contact-section">
          <div className="arioto-section-header">
            <h2>Contact us</h2>
            <p>
              Have a custom idea or want to stock Arioto in your store? We&apos;d love to hear
              from you.
            </p>
          </div>
          <div className="arioto-contact-layout">
            <div className="arioto-contact-details">
              <h3>Say hello</h3>
              <p>Email: <a href="mailto:hello@arioto.studio">hello@arioto.studio</a></p>
              <p>Instagram: <a href="https://instagram.com" target="_blank" rel="noreferrer">@arioto.studio</a></p>
              <p>Location: Based in India, shipping pan-India.</p>
            </div>
            <form
              className="arioto-contact-form"
              onSubmit={(e) => {
                e.preventDefault();
                alert('Thank you for reaching out to Arioto! We will get back to you soon.');
              }}
            >
              <div className="form-row">
                <label>
                  Name
                  <input type="text" name="name" placeholder="Your name" required />
                </label>
              </div>
              <div className="form-row">
                <label>
                  Email
                  <input type="email" name="email" placeholder="you@example.com" required />
                </label>
              </div>
              <div className="form-row">
                <label>
                  Message
                  <textarea
                    name="message"
                    rows="4"
                    placeholder="Tell us what you have in mind"
                    required
                  />
                </label>
              </div>
              <button type="submit" className="btn-primary full-width">
                Send message
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="arioto-footer">
        <p>© {new Date().getFullYear()} Arioto. All rights reserved.</p>
        <p className="arioto-footer-sub">
          Crafted with love, shared with joy.
        </p>
      </footer>
    </div>
  );
}

export default App;
