export default function Logo({ light = false }) {
  return (
    <a className={`brand ${light ? 'brand--light' : ''}`} href="#home" aria-label="SLT Consulting home">
      <svg className="brand__mark" viewBox="0 0 44 44" aria-hidden="true">
        <path d="M21.8 3.8 38 13.3v18.8l-16.2 9.4L5.6 32.1V13.3L21.8 3.8Z" fill="none" stroke="currentColor" strokeWidth="2.2" />
        <path d="m12.4 16.9 9.4-5.4 9.4 5.4-9.4 5.4-9.4-5.4Zm0 10.2 9.4 5.4 9.4-5.4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="brand__text">
        <strong>SLT</strong>
        <small>CONSULTING</small>
      </span>
    </a>
  );
}
