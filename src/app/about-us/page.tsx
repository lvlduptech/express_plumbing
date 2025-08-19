import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Express Plumbing',
  description: 'Learn more about Express Plumbing, our history, mission, and commitment to quality service.',
};

export default function AboutUsPage() {
  return (
    <div className="container section" style={{ minHeight: '60vh', paddingTop: 'calc(var(--header-height-desktop) + 2rem)' }}>
      <h1 className="section-title">About Express Plumbing</h1>
      <p className="section-subtitle" style={{textAlign: 'center'}}>
        Welcome to Express Plumbing! We are dedicated to providing top-quality plumbing, heating, cooling, and roofing services
        to our community. Our mission is to deliver exceptional workmanship and outstanding customer service on every job.
        Learn more about our story, our team, and our commitment to you.
      </p>
      {/* Add more content: history, team, values, etc. */}
    </div>
  );
}
