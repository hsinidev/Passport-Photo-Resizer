import React from 'react';
import Layout from './components/Layout';
import PhotoResizerTool from './components/PhotoResizerTool';
import SeoArticle from './components/SeoArticle';

const App: React.FC = () => {
    return (
        <Layout>
            <div className="container mx-auto px-4 py-8 text-white">
                <header className="text-center mb-12">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 drop-shadow-lg">
                        Passport Photo Resizer
                    </h1>
                    <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
                        Get your official passport or visa photo in three easy steps.
                        <br />
                        100% Private, Secure, and Free.
                    </p>
                </header>
                
                <main>
                    <PhotoResizerTool />
                    <div className="mt-24">
                       <SeoArticle />
                    </div>
                </main>
            </div>
        </Layout>
    );
};

export default App;