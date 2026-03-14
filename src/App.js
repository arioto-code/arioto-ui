import { useState, useEffect } from 'react';
import Papa from 'papaparse';
import './App.css';
import logo from './OriginalLogo.jpg';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeProduct, setActiveProduct] = useState(null);
  const [contactStatus, setContactStatus] = useState({ state: 'idle', message: '' });

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`${process.env.PUBLIC_URL || ''}/products.csv`);
        if (!response.ok) {
          throw new Error('Failed to load products data');
        }
        
        const csvText = await response.text();
        
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            // Convert CSV data to product objects
            const parsedProducts = results.data.map((row, index) => ({
              id: parseInt(row.id) || index + 1,
              name: row.name || '',
              shortdesc: row.shortdesc || '',
              longdesc: row.longdesc || '',
              price: row.price || '',
              image: row.image || '',
            })).filter(product => product.name); // Filter out empty rows
            
            setProducts(parsedProducts);
            setLoading(false);
          },
          error: (err) => {
            throw new Error(`CSV parsing error: ${err.message}`);
          },
        });
      } catch (err) {
        console.error('Error loading products:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const submitContact = async ({ name, email, message }) => {
    const endpoint = process.env.REACT_APP_CONTACT_ENDPOINT;
    if (!endpoint) {
      throw new Error(
        'Missing contact endpoint. Set REACT_APP_CONTACT_ENDPOINT to your Google Apps Script Web App URL.'
      );
    }

    const body = new URLSearchParams({
      name,
      email,
      message,
      createdAt: new Date().toISOString(),
    });

    const res = await fetch(endpoint, {
      method: 'POST',
      // Let the browser set application/x-www-form-urlencoded; this avoids a CORS preflight.
      body,
    });

    if (!res.ok) {
      const text = await res.text().catch(() => '');
      throw new Error(text || 'Failed to submit message');
    }
  };

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
        </section>

        <section id="products" className="arioto-section arioto-products-section">
          <div className="arioto-section-header">
            <h2>Featured products</h2>
            <p>Each piece is handmade – variations are part of the story.</p>
          </div>
          
          {loading && (
            <div className="arioto-loading-state">
              <div className="arioto-spinner"></div>
              <p>Loading our beautiful crafts...</p>
            </div>
          )}
          
          {error && (
            <div className="arioto-error-state">
              <p className="arioto-error-message">⚠️ {error}</p>
              <p className="arioto-error-help">
                Please check that products.csv exists in the public folder.
              </p>
            </div>
          )}
          
          {!loading && !error && products.length === 0 && (
            <div className="arioto-empty-state">
              <p>No products available at the moment.</p>
              <p className="arioto-empty-sub">Check back soon for new handmade pieces!</p>
            </div>
          )}
          
          {!loading && !error && products.length > 0 && (
            <div className="arioto-product-grid">
              {products.map((product) => (
                <article
                  key={product.id}
                  className="arioto-product-card arioto-product-card-clickable"
                  onClick={() => setActiveProduct(product)}
                >
                  <div className="arioto-product-image-wrapper">
                    {product.image ? (
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="arioto-product-image"
                        loading="lazy"
                      />
                    ) : (
                      <div className="arioto-product-image-placeholder">
                        <span>No image</span>
                      </div>
                    )}
                  </div>
                  <div className="arioto-product-content">
                    <h3>{product.name}</h3>
                    {product.shortdesc && (
                      <p className="arioto-product-description">{product.shortdesc}</p>
                    )}
                    <div className="arioto-product-footer">
                      {product.price && (
                        <span className="arioto-product-price">{product.price}</span>
                      )}
                      <button type="button" className="arioto-product-cta">
                        Details
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
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
              <p>Email: <a href="mailto:arioto.handmades@gmail.com">arioto.handmades@gmail.com</a></p>
              <p>Instagram: <a href="https://www.instagram.com/arioto_handmades/" target="_blank" rel="noreferrer">@arioto_handmades</a></p>
              <p>Location: Based in India, shipping pan-India.</p>
            </div>
            <form
              className="arioto-contact-form"
              onSubmit={async (e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const formData = new FormData(form);
                const name = String(formData.get('name') || '').trim();
                const email = String(formData.get('email') || '').trim();
                const message = String(formData.get('message') || '').trim();

                try {
                  setContactStatus({ state: 'submitting', message: '' });
                  await submitContact({ name, email, message });
                  form.reset();
                  setContactStatus({
                    state: 'success',
                    message: 'Thanks! Your message has been sent.',
                  });
                } catch (err) {
                  setContactStatus({
                    state: 'error',
                    message: err instanceof Error ? err.message : 'Something went wrong.',
                  });
                }
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
                {contactStatus.state === 'submitting' ? 'Sending…' : 'Send message'}
              </button>
              {contactStatus.state === 'success' && (
                <p className="arioto-form-success" role="status">
                  {contactStatus.message}
                </p>
              )}
              {contactStatus.state === 'error' && (
                <p className="arioto-form-error" role="alert">
                  {contactStatus.message}
                </p>
              )}
            </form>
          </div>
        </section>
      </main>

      {activeProduct && (
        <div
          className="arioto-modal-backdrop"
          onClick={() => setActiveProduct(null)}
        >
          <div
            className="arioto-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="arioto-product-modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="arioto-modal-close"
              onClick={() => setActiveProduct(null)}
              aria-label="Close product details"
            >
              ×
            </button>
            <div className="arioto-modal-content">
              <div className="arioto-modal-image-wrapper">
                {activeProduct.image ? (
                  <img
                    src={activeProduct.image}
                    alt={activeProduct.name}
                    className="arioto-modal-image"
                  />
                ) : (
                  <div className="arioto-modal-image-placeholder">
                    <span>No image</span>
                  </div>
                )}
              </div>
              <div className="arioto-modal-details">
                <h2 id="arioto-product-modal-title">{activeProduct.name}</h2>
                {activeProduct.price && (
                  <p className="arioto-modal-price">{activeProduct.price}</p>
                )}
                {activeProduct.longdesc && (
                  <p className="arioto-modal-description"> {activeProduct.longdesc }</p>
                )}
                <p className="arioto-modal-note">
                  Each Arioto piece is handmade in small batches. For
                  customisation or bulk orders, please reach out to us from the
                  contact section.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

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
