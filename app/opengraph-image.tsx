import { ImageResponse } from 'next/og';

export const alt = 'Central Ward Sacrament Meeting Planner';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#1d4ed8',
                    color: 'white',
                    padding: 80,
                }}
            >
                <div style={{ fontSize: 40, opacity: 0.85, display: 'flex' }}>
                    Central Ward
                </div>
                <div
                    style={{
                        fontSize: 80,
                        fontWeight: 700,
                        textAlign: 'center',
                        marginTop: 20,
                        display: 'flex',
                    }}
                >
                    Sacrament Meeting Planner
                </div>
                <div
                    style={{
                        fontSize: 32,
                        opacity: 0.85,
                        marginTop: 30,
                        textAlign: 'center',
                        display: 'flex',
                    }}
                >
                    Weekly programs, hymns, speakers, and announcements
                </div>
            </div>
        ),
        { ...size }
    );
}