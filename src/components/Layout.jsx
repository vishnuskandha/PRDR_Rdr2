import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import FloatingLines from './FloatingLines';

function Layout({ children, welcomeRef, uploaderRef }) {
    const containerRef = useRef(null);
    const headerRef = useRef(null);
    const footerRef = useRef(null);

    useGSAP(() => {
        if (containerRef.current && headerRef.current) {
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

            tl.from(headerRef.current, {
                y: -50,
                opacity: 0,
                duration: 0.8
            });

            if (uploaderRef?.current) {
                tl.from(uploaderRef.current, {
                    y: 30,
                    opacity: 0,
                    duration: 0.6
                }, '-=0.4');
            }

            if (welcomeRef?.current?.children) {
                tl.from(welcomeRef.current.children, {
                    y: 20,
                    opacity: 0,
                    stagger: 0.1,
                    duration: 0.5
                }, '-=0.3');
            }

            tl.from(footerRef.current, {
                opacity: 0,
                duration: 0.5
            }, '-=0.2');
        }
    }, { scope: containerRef, dependencies: [welcomeRef, uploaderRef] });

    return (
        <div className="app" ref={containerRef}>
            <div style={{ position: 'fixed', inset: 0, zIndex: -1 }}>
                <FloatingLines
                    enabledWaves={['top', 'middle', 'bottom']}
                    lineCount={[10, 15, 20]}
                    lineDistance={[8, 6, 4]}
                    bendRadius={5.0}
                    bendStrength={-0.5}
                    interactive={true}
                    parallax={true}
                />
            </div>

            <div className="content-wrapper mt-1 mb-1">
                <header className="header mt-1" ref={headerRef}>
                    <div className="logo">
                        <h1>Red Dead Redemption 2 PRDR Converter</h1>
                    </div>
                    <p className="subtitle">
                        Convert Red Dead Redemption 2 photo mode files to high-quality PNG images
                    </p>
                </header>

                <main className="main-content mt-1">
                    {children}
                </main>

                <footer className="footer" ref={footerRef}>
                    <p>
                        Built by <a href="https://vishnuskandhagithubio.vercel.app/" target="_blank" rel="noopener noreferrer">Vishnu Skandha</a>
                    </p>
                    <p className="privacy-note">
                        <a href="https://github.com/vishnuskandha" target="_blank" rel="noopener noreferrer">GitHub</a> • Privacy-first • No uploads • No tracking
                    </p>
                </footer>
            </div>
        </div>
    );
}

export default Layout;
