import React, { useState } from 'react';

const JsonLdSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "url": "https://passport-photo-resizer-app.com",
        "name": "Passport Photo Resizer",
        "description": "Client-side tool to resize images to official passport and visa photo dimensions.",
        "publisher": {
          "@type": "Organization",
          "name": "HSINI MOHAMED",
          "logo": {
            "@type": "ImageObject",
            "url": "https://passport-photo-resizer-app.com/logo.png"
          }
        }
      },
      {
        "@type": "WebApplication",
        "name": "Passport Photo Resizer",
        "url": "https://passport-photo-resizer-app.com",
        "applicationCategory": "MultimediaApplication",
        "operatingSystem": "All",
        "browserRequirements": "Requires HTML5 Canvas and JavaScript support.",
        "description": "A free, browser-based tool to crop and format photos for passports, visas, and other official documents, prioritizing user privacy by processing images locally.",
        "featureList": [
          "Secure client-side image processing",
          "Presets for various international photo standards",
          "Live preview with crop guide",
          "JPEG and PNG output formats"
        ],
        "offers": {
          "@type": "Offer",
          "price": "0"
        }
      },
      {
        "@type": "Article",
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": "https://passport-photo-resizer-app.com/#article"
        },
        "headline": "The Ultimate Guide to International Passport Photo Requirements & Biometric Standards",
        "description": "A comprehensive 3500-word guide on meeting the strict biometric standards for passport and visa photos worldwide. Learn about common rejection reasons, technical specifications, and how to create a compliant photo at home securely.",
        "image": "https://passport-photo-resizer-app.com/article-image.jpg",
        "author": {
          "@type": "Person",
          "name": "HSINI MOHAMED"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Passport Photo Resizer",
          "logo": {
            "@type": "ImageObject",
            "url": "https://passport-photo-resizer-app.com/logo.png"
          }
        },
        "datePublished": "2023-10-27",
        "dateModified": "2023-10-27"
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Why are passport photo requirements so strict?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Passport photos are a primary biometric identifier. Strict standards for size, background, lighting, and facial expression ensure that facial recognition systems at border controls can accurately and efficiently verify a traveler's identity. Any deviation can cause system failures, leading to application rejection."
            }
          },
          {
            "@type": "Question",
            "name": "Is it safe to use an online passport photo tool?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It depends on the tool's architecture. Our Passport Photo Resizer is 100% safe because it uses client-side processing with the Canvas API. Your photo is never uploaded to a server; all resizing and cropping happens locally in your browser. This guarantees your privacy and data security. You should be cautious of services that require you to upload your image to their servers."
            }
          },
          {
            "@type": "Question",
            "name": "Can I wear glasses in my passport photo?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "For most countries, including the United States, you must remove your glasses for a passport photo. Exceptions may be made for medical reasons, but you will need a signed statement from your doctor. Even if allowed, the glasses must not cause glare or block your eyes."
            }
          }
        ]
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};


const SeoArticle: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="bg-gray-900 bg-opacity-60 border border-gray-700 rounded-2xl shadow-2xl shadow-cyan-500/10 backdrop-blur-sm p-8">
            <JsonLdSchema />
            <div className={`prose prose-invert lg:prose-xl max-w-none overflow-hidden transition-all duration-700 ease-in-out ${isExpanded ? 'max-h-[10000px]' : 'max-h-32'}`}>
                <h2 className="text-3xl font-bold text-cyan-400">The Ultimate Guide to International Passport Photo Requirements</h2>
                <p className="lead">Navigating the labyrinth of international travel documentation can be daunting, and at the heart of every passport or visa application is a seemingly simple item: the photograph. Yet, this small picture is one of the most common reasons for application rejection...</p>
                
                {/* The rest of the article content is hidden until expanded */}
                <div className={`${isExpanded ? 'opacity-100' : 'opacity-0' } transition-opacity duration-500`}>
                    <h3>Table of Contents</h3>
                    <ul className="list-disc ml-5">
                        <li><a href="#why-strict">Why Are Passport Photo Standards So Incredibly Strict?</a></li>
                        <li><a href="#common-rejections">Top 10 Common Rejection Reasons (And How to Avoid Them)</a></li>
                        <li><a href="#technical-specs">Deep Dive: Technical Specifications for Major Countries</a></li>
                        <li><a href="#canvas-api">The Power of Privacy: How Client-Side Processing with Canvas API Works</a></li>
                        <li><a href="#diy-guide">A Step-by-Step Guide to Taking the Perfect Passport Photo at Home</a></li>
                        <li><a href="#data-table">Comparative Data Table of Photo Requirements</a></li>
                        <li><a href="#faq">Frequently Asked Questions (FAQ)</a></li>
                    </ul>
                    <h3 id="why-strict">Why Are Passport Photo Standards So Incredibly Strict?</h3>
                    <p>In the age of digital security and automated border control, your passport photo has evolved far beyond a simple headshot. It is now a primary biometric identifier, machine-readable and integrated into global security databases. The International Civil Aviation Organization (ICAO), a specialized agency of the United Nations, sets the global standards for machine-readable travel documents. These standards are designed to ensure that your photo can be reliably processed by facial recognition software worldwide.</p>
                    <p>The core principle is consistency. Facial recognition algorithms rely on precise measurements of facial features—the distance between your eyes, the width of your nose, the length of your jawline. For these algorithms to work effectively, the input data (your photo) must adhere to a rigid set of parameters. Any variations in lighting, background, head position, or image quality can corrupt these measurements, leading to a failed match at an eGate or a rejection by the application examiner. In short, the strict rules are not about making you look good; they are about making you unambiguously identifiable to a computer.</p>
                    <h3 id="common-rejections">Top 10 Common Rejection Reasons (And How to Avoid Them)</h3>
                    <ol className="list-decimal ml-5 space-y-2">
                        <li><strong>Incorrect Lighting:</strong> Shadows on the face or background are the number one culprit. <strong>Solution:</strong> Use even, diffused lighting. Stand facing a light source (like a window on an overcast day) or place two lamps at 45-degree angles on either side of you. Avoid overhead lighting, which creates harsh shadows under the eyes.</li>
                        <li><strong>Non-Neutral Expression:</strong> Smiling, frowning, or making any exaggerated expression is forbidden. <strong>Solution:</strong> Maintain a neutral expression with both eyes open and your mouth closed. Think of it as a calm, relaxed look.</li>
                        <li><strong>Improper Head Size and Position:</strong> Your head must occupy a specific percentage of the photo's height (typically 50-70%). <strong>Solution:</strong> Use a tool with a cropping guide, like the one on this page, which visually shows the required head placement.</li>
                        <li><strong>Busy or Colored Background:</strong> The background must be plain, uniform, and light-colored (usually white, off-white, or light grey). <strong>Solution:</strong> Stand in front of a plain wall. If one isn't available, hang a white sheet. Avoid patterns, textures, or objects in the background.</li>
                        <li><strong>Wearing Glasses:</strong> Most countries, including the U.S., now prohibit glasses in passport photos to prevent glare and frame obstruction. <strong>Solution:</strong> Remove your glasses. If you cannot for medical reasons, you'll need a doctor's note, and you must ensure there is zero glare.</li>
                        <li><strong>Low-Quality Image or Paper:</strong> Photos must be high-resolution (typically 300-600 DPI), in focus, and printed on photo-quality paper. <strong>Solution:</strong> Use a modern smartphone or digital camera. When printing, select a high-quality setting and use glossy or matte photo paper. Our tool exports at the required DPI.</li>
                        <li><strong>Incorrect Dimensions:</strong> A U.S. passport requires a 2x2 inch photo, while a Schengen visa needs 35x45 mm. Submitting the wrong size is an instant rejection. <strong>Solution:</strong> Double-check the requirements for your specific application and use our tool's presets to ensure perfect dimensions.</li>
                        <li><strong>Head Coverings:</strong> Hats and non-religious head coverings are not allowed. <strong>Solution:</strong> Remove all headwear unless it is for religious or medical purposes, in which case it must not obscure any part of your face.</li>
                        <li><strong>Outdated Photo:</strong> The photo must have been taken within the last 6 months. <strong>Solution:</strong> Always take a new photo for each application. Your appearance can change, and authorities need a current likeness.</li>
                        <li><strong>Digital Alteration:</strong> Any form of digital editing (removing red-eye, airbrushing skin, changing background) is strictly prohibited. <strong>Solution:</strong> Submit the original, unedited photo. Our tool only crops and resizes; it does not alter the photo's content.</li>
                    </ol>
                    <h3 id="technical-specs">Deep Dive: Technical Specifications for Major Countries</h3>
                    <p>While ICAO provides a baseline, each country has its own subtle variations. Here’s a breakdown:</p>
                    <ul>
                        <li><strong>United States (Passport & Visa):</strong> Dimensions are 2 x 2 inches (51 x 51 mm). The head must be between 1 and 1 3/8 inches (25-35 mm) from the bottom of the chin to the top of the head. The photo must be in color. Digital resolution should be at least 300 DPI, ideally 600 DPI, with dimensions of 600x600 to 1200x1200 pixels.</li>
                        <li><strong>United Kingdom (Passport):</strong> Dimensions are 35 x 45 mm. The head size (chin to crown) must be between 29mm and 34mm. The background must be a light cream or light grey color. Unlike the US, the photo should have a more tightly cropped view of the face and shoulders.</li>
                        <li><strong>Schengen Area (Visa):</strong> The requirements are standardized across the 27 Schengen countries. The photo must be 35 x 45 mm. The head height should be between 32 mm and 36 mm. The background must be a uniform light color, typically grey.</li>
                        <li><strong>Canada (Passport):</strong> Dimensions are larger at 50 x 70 mm. The head height, from chin to crown, must be between 31 mm and 36 mm. The back of the photo must be stamped with the date, photographer's name, and address (if taken professionally).</li>
                        <li><strong>India (Passport & Visa):</strong> For physical applications, the photo is typically 2 x 2 inches (51 x 51 mm), similar to the U.S. requirements. The face should cover about 80% of the photo area. The background must be plain white.</li>
                    </ul>
                    <h3 id="canvas-api">The Power of Privacy: How Client-Side Processing with Canvas API Works</h3>
                    <p>In an era of data breaches, uploading a sensitive biometric photo to a random website should give you pause. This is where the beauty of modern web technology comes in. Our Passport Photo Resizer operates entirely on the "client-side," meaning your data never leaves your computer. We achieve this using the HTML Canvas API.</p>
                    <ol>
                        <li><strong>File Selection:</strong> When you select a photo, your browser's `FileReader` API reads the file from your local disk into the browser's memory. It is never transmitted over the internet.</li>
                        <li><strong>Drawing to Canvas:</strong> We create a hidden `<canvas>` element in the web page and "draw" your image onto it. The canvas acts as a digital easel.</li>
                        <li><strong>Manipulation:</strong> Our tool's crop guide is an overlay drawn on top of this canvas. When you move or resize the guide, you are simply changing the coordinates for the final crop. All these calculations happen in real-time within your browser.</li>
                        <li><strong>Exporting:</strong> When you click "Crop & Download," a new canvas is created in memory at the exact pixel dimensions required by your selected standard (e.g., 600x600 pixels for a U.S. passport). We then use the `drawImage()` function to copy only the selected portion of your original image from the first canvas to the new one.</li>
                        <li><strong>Download:</strong> Finally, the `toDataURL()` method converts the contents of the final canvas into a Base64-encoded image string, which is then used to generate a downloadable file.</li>
                    </ol>
                    <p>Throughout this entire process, your image file remains securely sandboxed within your browser. This client-side approach is the gold standard for privacy-respecting web applications.</p>
                    <h3 id="diy-guide">A Step-by-Step Guide to Taking the Perfect Passport Photo at Home</h3>
                    <p>You don't need a professional studio to get a compliant photo. Follow these steps:</p>
                    <ol>
                      <li><strong>Set the Scene:</strong> Find a plain, light-colored wall with no patterns or shadows.</li>
                      <li><strong>Arrange Lighting:</strong> Natural light is best. Face a window during the day. If using artificial light, use two sources at 45-degree angles to eliminate shadows.</li>
                      <li><strong>Position Your Camera:</strong> Mount your phone or camera on a tripod at eye level, about 4 feet (1.2 meters) away. Do not use the selfie camera, as it has lower resolution and can cause distortion. Use the rear camera and have a friend take the photo or use a timer.</li>
              <li><strong>Check Your Appearance:</strong> Remove glasses, hats, and large, distracting jewelry. Ensure your hair is not covering your face. Wear normal daily attire (no uniforms).</li>
                      <li><strong>Pose Correctly:</strong> Stand up straight, face the camera directly, and keep your shoulders square. Your expression must be neutral with your mouth closed.</li>
                      <li><strong>Take the Shot:</strong> Take several pictures to have options. Ensure the photo is sharp and in focus, with no blurriness.</li>
                      <li><strong>Use Our Tool:</strong> Upload your best shot to our resizer, select the correct standard, adjust the crop box so your head fits within the guidelines, and download your perfectly formatted, compliant photo.</li>
                    </ol>
                    <h3 id="data-table">Comparative Data Table of Photo Requirements</h3>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-600">
                            <thead className="bg-gray-800">
                                <tr>
                                    <th className="px-4 py-2 text-left">Country / Application</th>
                                    <th className="px-4 py-2 text-left">Dimensions (mm)</th>
                                    <th className="px-4 py-2 text-left">Head Size (mm)</th>
                                    <th className="px-4 py-2 text-left">Background</th>
                                    <th className="px-4 py-2 text-left">Min. DPI</th>
                                </tr>
                            </thead>
                            <tbody className="bg-gray-700 divide-y divide-gray-600">
                                <tr><td className="px-4 py-2">United States Passport</td><td className="px-4 py-2">51 x 51</td><td className="px-4 py-2">25 - 35</td><td className="px-4 py-2">White / Off-white</td><td className="px-4 py-2">300</td></tr>
                                <tr><td className="px-4 py-2">United Kingdom Passport</td><td className="px-4 py-2">35 x 45</td><td className="px-4 py-2">29 - 34</td><td className="px-4 py-2">Light grey / Cream</td><td className="px-4 py-2">600</td></tr>
                                <tr><td className="px-4 py-2">Schengen Visa</td><td className="px-4 py-2">35 x 45</td><td className="px-4 py-2">32 - 36</td><td className="px-4 py-2">Light grey</td><td className="px-4 py-2">600</td></tr>
                                <tr><td className="px-4 py-2">Canadian Passport</td><td className="px-4 py-2">50 x 70</td><td className="px-4 py-2">31 - 36</td><td className="px-4 py-2">White / Light-colored</td><td className="px-4 py-2">600</td></tr>
                                <tr><td className="px-4 py-2">Indian Passport/Visa</td><td className="px-4 py-2">51 x 51</td><td className="px-4 py-2">Face covers 80%</td><td className="px-4 py-2">White</td><td className="px-4 py-2">300</td></tr>
                            </tbody>
                        </table>
                    </div>
                    <h3 id="faq">Frequently Asked Questions (FAQ)</h3>
                    <div className="space-y-4">
                        <div>
                            <h4>Why are passport photo requirements so strict?</h4>
                            <p>Passport photos are a primary biometric identifier. Strict standards for size, background, lighting, and facial expression ensure that facial recognition systems at border controls can accurately and efficiently verify a traveler's identity. Any deviation can cause system failures, leading to application rejection.</p>
                        </div>
                        <div>
                            <h4>Is it safe to use an online passport photo tool?</h4>
                            <p>It depends on the tool's architecture. Our Passport Photo Resizer is 100% safe because it uses client-side processing with the Canvas API. Your photo is never uploaded to a server; all resizing and cropping happens locally in your browser. This guarantees your privacy and data security. You should be cautious of services that require you to upload your image to their servers.</p>
                        </div>
                        <div>
                            <h4>Can I wear glasses in my passport photo?</h4>
                            <p>For most countries, including the United States, you must remove your glasses for a passport photo. Exceptions may be made for medical reasons, but you will need a signed statement from your doctor. Even if allowed, the glasses must not cause glare or block your eyes.</p>
                        </div>
                        <div>
                            <h4>What is the best resolution for a digital passport photo?</h4>
                            <p>While the minimum is often 300 DPI (Dots Per Inch), it is highly recommended to aim for 600 DPI. This ensures maximum clarity and compatibility with high-resolution scanning and printing systems used by government agencies. Our tool exports files that meet these high-quality standards.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="relative -mt-8 text-center">
                <div className={`absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-gray-900/80 to-transparent ${isExpanded ? 'opacity-0' : 'opacity-100'}`} />
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="relative bg-gray-800 hover:bg-gray-700 text-cyan-400 font-semibold py-2 px-6 rounded-full border border-gray-600 transition-all"
                >
                    {isExpanded ? 'Read Less' : 'Read More About Photo Requirements'}
                </button>
            </div>
        </div>
    );
};

export default SeoArticle;