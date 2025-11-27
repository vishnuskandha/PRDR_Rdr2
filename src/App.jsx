import { useRef } from 'react';
import FileUploader from './components/FileUploader';
import ImageGallery from './components/ImageGallery';
import ConversionProgress from './components/ConversionProgress';
import Layout from './components/Layout';
import { usePRDRConversion } from './hooks/usePRDRConversion';
import './App.css';
import './components/spacing.css';

function App() {
  const {
    convertedImages,
    isConverting,
    progress,
    handleFilesSelected,
    handleDownloadAll,
    handleClear
  } = usePRDRConversion();

  const welcomeRef = useRef(null);
  const uploaderRef = useRef(null);

  const hasImages = convertedImages.length > 0;
  const showProgress = progress.total > 0;

  return (
    <Layout welcomeRef={welcomeRef} uploaderRef={uploaderRef}>
      {!hasImages && !isConverting && (
        <div className="welcome-section mt-1" ref={welcomeRef}>
          <div className="feature-grid gap-1">
            {[
              { label: "Private", title: "100% Private", text: "All processing happens in your browser. Files never leave your computer." },
              { label: "Fast", title: "Lightning Fast", text: "Convert multiple PRDR files to PNG in seconds with batch processing." },
              { label: "Quality", title: "High Quality", text: "Maximum quality PNG output preserves all image details perfectly." }
            ].map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-label">{feature.label}</div>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div ref={uploaderRef} style={{ width: '100%', display: 'flex', justifyContent: 'center' }} className="mt-1">
        <FileUploader onFilesSelected={handleFilesSelected} />
      </div>

      {showProgress && (
        <div className="progress-container mt-1" style={{ width: '100%', overflow: 'hidden' }}>
          <ConversionProgress
            total={progress.total}
            completed={progress.completed}
            failed={progress.failed}
            isConverting={isConverting}
            currentFile={progress.currentFile}
          />
        </div>
      )}

      <ImageGallery className="mt-1"
        images={convertedImages}
        onDownloadAll={handleDownloadAll}
        onClear={handleClear}
      />
    </Layout>
  );
}

export default App;
