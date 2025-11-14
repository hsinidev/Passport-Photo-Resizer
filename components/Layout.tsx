import React, { useState, useEffect, useRef, useCallback } from 'react';
import Modal from './Modal';

const Header: React.FC<{ onModalOpen: (content: ModalContent) => void }> = ({ onModalOpen }) => {
    const modalLinks: { name: string; content: ModalContent }[] = [
        { name: 'Guide', content: { title: 'How to Use', body: '1. Upload your photo. 2. Select a passport standard. 3. Adjust the crop box to fit your face. 4. Click "Crop & Download". Your photo is processed locally and never leaves your device.' } },
        { name: 'About', content: { title: 'About Us', body: 'This tool was created to provide a free, secure, and private way for users to resize their photos for official documents. We believe in privacy-first tools.' } },
        { name: 'Contact', content: { title: 'Contact Information', body: 'For inquiries, please reach out to hsini.web@gmail.com or visit doodax.com.' } },
        { name: 'Privacy Policy', content: { title: 'Privacy Policy', body: 'We respect your privacy. All image processing happens directly in your browser. Your photos are never uploaded to any server. We do not collect any personal data.' } },
        { name: 'Terms of Service', content: { title: 'Terms of Service', body: 'This service is provided "as is". By using this tool, you agree to take full responsibility for ensuring your final photo meets the specific requirements of the issuing authority.' } },
        { name: 'DMCA', content: { title: 'DMCA Notice', body: 'All content on this website is original. If you believe any content infringes on your copyright, please contact us with the necessary information.' } },
    ];

    return (
        <header className="fixed top-0 left-0 right-0 bg-black bg-opacity-30 backdrop-blur-md z-50">
            <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
                <div className="text-xl font-bold text-white">Passport<span className="text-cyan-400">Pro</span></div>
                <div className="hidden md:flex space-x-4">
                    {modalLinks.map(link => (
                        <button key={link.name} onClick={() => onModalOpen(link.content)} className="text-gray-300 hover:text-cyan-400 transition-colors">
                            {link.name}
                        </button>
                    ))}
                </div>
            </nav>
        </header>
    );
};

const Footer: React.FC = () => (
    <footer className="w-full text-center py-6 mt-16 text-gray-400 text-sm">
        <p>
            Powered by <a href="https://github.com/hsinidev" target="_blank" rel="noopener noreferrer" className="font-bold text-[#FFD700] hover:underline">HSINI MOHAMED</a>
        </p>
        <p className="mt-1">
            <a href="mailto:hsini.web@gmail.com" className="hover:text-cyan-400 transition-colors">hsini.web@gmail.com</a> | doodax.com
        </p>
    </footer>
);

const Starfield: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        const stars = Array.from({ length: 1500 }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            z: Math.random() * canvas.width,
            speed: 1 + Math.random() * 2,
        }));

        let hue = 217;
        let time = 0;

        const draw = () => {
            time += 0.005;
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            
            const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, Math.max(centerX, centerY));
            gradient.addColorStop(0, `hsla(${hue}, 50%, 5%, 1)`);
            gradient.addColorStop(1, `hsla(${hue + 60}, 50%, 5%, 1)`);
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
            
            stars.forEach(star => {
                star.z -= star.speed;
                if (star.z < 1) {
                    star.z = canvas.width;
                    star.x = Math.random() * canvas.width;
                    star.y = Math.random() * canvas.height;
                }
                
                const sx = (star.x - centerX) * (canvas.width / star.z) + centerX;
                const sy = (star.y - centerY) * (canvas.width / star.z) + centerY;
                const r = Math.max(0, (1 - star.z / canvas.width) * 3);
                
                if (sx > 0 && sx < canvas.width && sy > 0 && sy < canvas.height) {
                    ctx.beginPath();
                    ctx.arc(sx, sy, r, 0, Math.PI * 2);
                    ctx.fill();
                }
            });
        };

        const animate = () => {
            draw();
            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-[-1]" />;
};


interface ModalContent {
    title: string;
    body: string;
}

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [modalContent, setModalContent] = useState<ModalContent | null>(null);

    const handleOpenModal = useCallback((content: ModalContent) => {
        setModalContent(content);
    }, []);

    const handleCloseModal = useCallback(() => {
        setModalContent(null);
    }, []);

    return (
        <div className="min-h-screen text-gray-200 font-sans antialiased relative">
            <Starfield />
            <Header onModalOpen={handleOpenModal} />
            <main className="pt-20 pb-10 relative z-10">
                {children}
            </main>
            <Footer />
            {modalContent && (
                <Modal isOpen={!!modalContent} onClose={handleCloseModal} title={modalContent.title}>
                    <p className="text-gray-300">{modalContent.body}</p>
                </Modal>
            )}
        </div>
    );
};

export default Layout;