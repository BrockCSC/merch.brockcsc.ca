import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router';
import classNames from 'classnames';

const NAV_SCROLL_THRESHOLD = 30;
const navLinks = [
  { href: '/', label: 'Merch', external: false },
  { href: 'https://brockcsc.ca/team', label: 'Team', external: false },
  { href: 'https://brockcsc.ca/events', label: 'Events', external: false },
  { href: 'https://brockcsc.ca/guide', label: 'CS Guide', external: false },
  { href: 'https://brockcsc.ca/contact', label: 'Contact', external: false },
];

export default function Nav() {
  const location = useLocation();
  const [showOverlay, setShowOverlay] = useState(false);
  const [scrollY, setScrollY] = useState(
    typeof window !== 'undefined' ? window.scrollY : 0
  );

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setShowOverlay(false);
  }, [location.pathname]);

  const isScrolled = scrollY >= NAV_SCROLL_THRESHOLD;
  const isWhite = true;

  const navLinkBase =
    'group relative inline-flex items-center text-[1.125rem] font-medium tracking-tight transition-colors duration-300';
  const navLinkColor = isWhite ? 'text-black/90' : 'text-white/90';
  const navLinkUnderlineColor = 'bg-[#aa3b3b]';
  const underlineTiming = 'cubic-bezier(0.35, 0, 0.25, 1)';

  const renderNavLinkContent = (label: string, isActive?: boolean) => (
    <span className="relative inline-flex items-center justify-center pb-1">
      <span>{label}</span>
      <span
        className={classNames(
          'absolute left-0 right-0 -bottom-[2px] h-0.5 origin-left transform transition-transform duration-300 group-hover:scale-x-100',
          navLinkUnderlineColor,
          isActive ? 'scale-x-100' : 'scale-x-0'
        )}
        style={{
          transitionTimingFunction: underlineTiming,
        }}
      />
    </span>
  );

  const hamburgerLineColor =
    !showOverlay && isWhite ? 'rgba(0, 0, 0, 0.9)' : 'rgba(255, 255, 255, 0.9)';
  const hamburgerLineBase =
    'absolute left-0 block h-[1px] w-6 transition-all duration-300 ease-in-out';

  return (
    <header className="sticky inset-x-0 top-0 z-20">
      <div
        className={classNames(
          'relative h-[86px] transition-all duration-300 ease-in-out',
          isWhite ? 'bg-white' : 'bg-transparent',
          isScrolled && 'shadow-[0px_7px_17px_-10px_rgba(0,0,0,0.4)]'
        )}
      >
        <div
          className={classNames(
            'absolute bottom-0 left-0 h-[2px] w-full bg-[#9d2235] transition-opacity duration-300 ease-in-out',
            isScrolled ? 'opacity-100' : 'opacity-0'
          )}
        />
        <div className="hidden h-full w-[75%] max-w-[1280px] mx-auto items-center justify-between lg:flex">
          <div className="flex h-full items-center">
            <a href="https://brockcsc.ca">
              <img
                width={75}
                height={56}
                src={isWhite ? '/assets/logo-black.svg' : '/assets/logo.svg'}
                alt="Brock Computer Science Club Logo"
              />
            </a>
          </div>
          <nav className="flex items-center gap-[1.2em]">
            <Link to="/links">
              <button className="inline-flex items-center justify-center bg-[#aa3b3b] px-6 py-1.5 text-base font-medium text-[rgba(255,255,255,0.9)] transition-colors duration-200 hover:bg-[#8e3232]">
                Join
              </button>
            </Link>
            {navLinks.map((link) =>
              link.external ? (
                <a
                  key={link.label}
                  href={link.href}
                  className={classNames(navLinkBase, navLinkColor)}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={link.label}
                >
                  {renderNavLinkContent(link.label)}
                </a>
              ) : (
                <NavLink
                  key={link.label}
                  to={link.href}
                  className={classNames(navLinkBase, navLinkColor)}
                  title={link.label}
                >
                  {({ isActive }) => renderNavLinkContent(link.label, isActive)}
                </NavLink>
              )
            )}
          </nav>
        </div>
        <div className="flex h-full w-full items-center justify-between px-4 lg:hidden">
          <div className="flex h-full items-center gap-6 pl-[15px]">
            <Link to="/home" className="flex items-center">
              <img
                width={75}
                height={56}
                src={isWhite ? '/assets/logo-black.svg' : '/assets/logo.svg'}
                alt="Brock Computer Science Club Logo"
              />
            </Link>
            <Link to="/links">
              <button className="ml-8 inline-flex items-center justify-center bg-[#aa3b3b] px-6 py-1.5 text-base font-medium text-[rgba(255,255,255,0.9)] transition-colors duration-200 hover:bg-[#8e3232]">
                Join
              </button>
            </Link>
          </div>
          <button
            className="relative h-12 w-12 shrink-0 p-3"
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={showOverlay}
            onClick={() => setShowOverlay((prev) => !prev)}
          >
            <span className="sr-only">Open menu</span>
            <span className="relative block h-full w-full">
              <span
                className={classNames(
                  hamburgerLineBase,
                  showOverlay
                    ? 'top-1/2 -translate-y-1/2 rotate-45'
                    : 'top-0 translate-y-0 rotate-0'
                )}
                style={{ backgroundColor: hamburgerLineColor }}
              />
              <span
                className={classNames(
                  hamburgerLineBase,
                  'top-1/2 -translate-y-1/2',
                  showOverlay ? 'opacity-0' : 'opacity-100'
                )}
                style={{ backgroundColor: hamburgerLineColor }}
              />
              <span
                className={classNames(
                  hamburgerLineBase,
                  showOverlay
                    ? 'top-1/2 -translate-y-1/2 -rotate-45'
                    : 'bottom-0 translate-y-0 rotate-0'
                )}
                style={{ backgroundColor: hamburgerLineColor }}
              />
            </span>
          </button>
          <div
            className={classNames(
              'fixed inset-0 z-30 flex flex-col items-center justify-center gap-2 bg-black/90 px-4 text-center text-[#cccccc] transition-opacity duration-300',
              showOverlay ? 'opacity-100' : 'pointer-events-none opacity-0'
            )}
            aria-hidden={!showOverlay}
          >
            <div className="flex flex-col gap-2">
              <Link
                to="/home"
                onClick={() => setShowOverlay(false)}
                className="py-2 text-[30px] transition-colors duration-200 hover:text-white"
              >
                Home
              </Link>
              {navLinks.map((link) =>
                link.external ? (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setShowOverlay(false)}
                    title={link.label}
                    className="py-2 text-[30px] transition-colors duration-200 hover:text-white"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.label}
                    to={link.href}
                    onClick={() => setShowOverlay(false)}
                    title={link.label}
                    className="py-2 text-[30px] transition-colors duration-200 hover:text-white"
                  >
                    {link.label}
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
