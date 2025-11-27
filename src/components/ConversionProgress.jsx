import { memo } from 'react';
import './ConversionProgress.css';

const ConversionProgress = memo(function ConversionProgress({ total, completed, failed, isConverting, currentFile }) {
    if (!isConverting && total === 0) {
        return null;
    }

    const progress = total > 0 ? (completed / total) * 100 : 0;
    const successful = completed - failed;

    return (
        <div className="conversion-progress">
            <div className="progress-header">
                <h3>
                    {isConverting ? '⚡ Converting...' : '✓ Conversion Complete'}
                </h3>
                <div className="progress-stats">
                    <span className="stat">
                        <span className="stat-label">Total:</span>
                        <span className="stat-value">{total}</span>
                    </span>
                    <span className="stat stat-success">
                        <span className="stat-label">Success:</span>
                        <span className="stat-value">{successful}</span>
                    </span>
                    {failed > 0 && (
                        <span className="stat stat-error">
                            <span className="stat-label">Failed:</span>
                            <span className="stat-value">{failed}</span>
                        </span>
                    )}
                </div>
            </div>

            <div className="progress-bar-container">
                <div
                    className={`progress-bar ${isConverting ? 'animating' : 'complete'}`}
                    style={{ width: `${progress}%` }}
                >
                    <div className="progress-shimmer"></div>
                </div>
            </div>

            <div className="progress-text">
                {isConverting && currentFile && (
                    <p className="current-file">Processing: {currentFile}</p>
                )}
                <p className="progress-percentage">{Math.round(progress)}%</p>
            </div>
        </div>
    );
});

export default ConversionProgress;
