'use client'

import ProgressBar from '../ProgressBar'
import CTAButton from '../CTAButton'

interface BedtimeSuggestionProps {
  wakeTime: string
  bedtime: string
  onBedtimeChange: (t: string) => void
  onNext: () => void
  onBack: () => void
  step: number
  formatTime: (t: string) => string
}

export default function BedtimeSuggestion({
  wakeTime, bedtime, onBedtimeChange, onNext, onBack, step, formatTime,
}: BedtimeSuggestionProps) {
  const wakeFormatted = formatTime(wakeTime)

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <ProgressBar step={step} totalSteps={16} onBack={onBack} />

      <div style={{ flex: 1, padding: '24px 24px 0', display: 'flex', flexDirection: 'column' }}>
        <h1
          style={{
            fontSize: 26,
            fontWeight: 700,
            color: '#1A1A1A',
            lineHeight: 1.2,
            letterSpacing: -0.7,
            marginBottom: 32,
          }}
        >
          To feel your best at {wakeFormatted}, get into bed by
        </h1>

        {/* Bedtime input */}
        <div
          style={{
            background: '#D0CEC9',
            borderRadius: 16,
            padding: '20px 20px',
            marginBottom: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span style={{ fontSize: 15, fontWeight: 500, color: '#1A1A1A', opacity: 0.6 }}>Bedtime</span>
          <input
            type="time"
            value={bedtime}
            onChange={e => onBedtimeChange(e.target.value)}
            style={{
              background: 'none',
              border: 'none',
              fontSize: 22,
              fontWeight: 700,
              color: '#1A1A1A',
              letterSpacing: -0.5,
              fontFamily: 'inherit',
              cursor: 'pointer',
              outline: 'none',
            }}
          />
        </div>

        <p
          style={{
            fontSize: 14,
            color: '#888',
            lineHeight: 1.6,
            letterSpacing: -0.1,
          }}
        >
          Your starting point. Includes 30 min to ease in. Most adults need 7 to 9 hours. We'll find yours.
        </p>
      </div>

      <div style={{ padding: '24px 24px 8px' }}>
        <CTAButton label="Continue" onClick={onNext} />
      </div>
    </div>
  )
}
