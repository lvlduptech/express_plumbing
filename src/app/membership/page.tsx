import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Membership | Express Plumbing',
  description: 'Learn about the benefits of becoming an Express Plumbing member.',
};

export default function MembershipPage() {
  return (
    <div className="container section" style={{
      minHeight: '60vh',
      paddingTop: 'calc(var(--header-height-desktop) + 2rem)'
    }}>
      <h1 className="section-title">Our Membership Program</h1>
      <p className="section-subtitle" style={{ textAlign: 'center' }}>
        Express's all-inclusive membership program includes all services we provide: Roofing, Plumbing, Heating and Air Conditioning.
        <br />
        Exclusive e-mailed member-only specials.
      </p>

      <div style={{
        marginTop: '3rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '2rem',
        color: '#333'
      }}>
        {/* Roofing Section */}
        <div style={{
          backgroundColor: '#f8f9fa',
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          <h2 style={{
            color: '#1a237e',
            borderBottom: '2px solid #0056b3',
            paddingBottom: '0.5rem',
            marginBottom: '1rem'
          }}>ROOFING</h2>
          <ul style={{
            listStyleType: 'none',
            padding: 0
          }}>
            <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
              <span style={{ marginRight: '0.5rem', color: '#007bff' }}>✔</span>
              Annual drone inspection of your roof with full report including pictures emailed to you upon completion.
            </li>
          </ul>
        </div>

        {/* Plumbing Section */}
        <div style={{
          backgroundColor: '#f8f9fa',
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          <h2 style={{
            color: '#1a237e',
            borderBottom: '2px solid #0056b3',
            paddingBottom: '0.5rem',
            marginBottom: '1rem'
          }}>PLUMBING</h2>
          <ul style={{
            listStyleType: 'none',
            padding: 0
          }}>
            <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
              <span style={{ marginRight: '0.5rem', color: '#007bff' }}>✔</span>
              Annual plumbing inspection
            </li>
            <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
              <span style={{ marginRight: '0.5rem', color: '#007bff' }}>✔</span>
              Entire home plumbing system check
            </li>
            <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
              <span style={{ marginRight: '0.5rem', color: '#007bff' }}>✔</span>
              Water heater safety inspection conforms with manufacturer's warranty requirements
            </li>
          </ul>
        </div>

        {/* HVAC Section */}
        <div style={{
          backgroundColor: '#f8f9fa',
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          <h2 style={{
            color: '#1a237e',
            borderBottom: '2px solid #0056b3',
            paddingBottom: '0.5rem',
            marginBottom: '1rem'
          }}>HVAC</h2>
          <ul style={{
            listStyleType: 'none',
            padding: 0
          }}>
            <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
              <span style={{ marginRight: '0.5rem', color: '#007bff' }}>✔</span>
              Performance check of heating and cooling equipment which conforms with manufacturer's warranty requirements
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}