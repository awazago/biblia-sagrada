import React, { useState, useEffect } from 'react';
import { X, Calendar, CheckCircle, Circle, BookOpen, Award, Sparkles } from 'lucide-react';
import { READING_PLANS, HOW_TO_READ_GUIDE, type ReadingPlanDay } from '../data/readingPlansData';
import type { BookMeta } from '../types';

interface ReadingPlansModalProps {
  isOpen: boolean;
  onClose: () => void;
  books?: BookMeta[];
  onOpenDayPassage: (bookAbbrev: string, chapter: number) => void;
}

const STORAGE_KEY_PROGRESS = 'biblia_reading_plans_progress_v1';

export const ReadingPlansModal: React.FC<ReadingPlansModalProps> = ({
  isOpen,
  onClose,
  onOpenDayPassage,
}) => {
  const [activeTab, setActiveTab] = useState<'plans' | 'guide'>('plans');
  const [selectedPlanId, setSelectedPlanId] = useState<string>('iniciantes-30d');
  const [completedDaysMap, setCompletedDaysMap] = useState<Record<string, number[]>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PROGRESS);
      if (saved) return JSON.parse(saved);
    } catch {}
    return {};
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(completedDaysMap));
  }, [completedDaysMap]);

  if (!isOpen) return null;

  const currentPlan =
    READING_PLANS.find((p) => p.id === selectedPlanId) || READING_PLANS[0];

  const planCompletedDays = completedDaysMap[currentPlan.id] || [];
  const progressPercent = Math.round(
    (planCompletedDays.length / currentPlan.days.length) * 100
  );

  const toggleDayCompleted = (dayNum: number) => {
    setCompletedDaysMap((prev) => {
      const existing = prev[currentPlan.id] || [];
      const updated = existing.includes(dayNum)
        ? existing.filter((d) => d !== dayNum)
        : [...existing, dayNum].sort((a, b) => a - b);
      return { ...prev, [currentPlan.id]: updated };
    });
  };

  const handleOpenPassage = (day: ReadingPlanDay) => {
    onOpenDayPassage(day.bookAbbrev, day.chapter);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '640px' }}
      >
        {/* Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Calendar size={20} color="var(--accent-gold)" />
            <h2 className="modal-title">Planos de Leitura & Guia</h2>
          </div>
          <button className="icon-button" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
          {/* Main Mode Tabs */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
            <button
              onClick={() => setActiveTab('plans')}
              className={`filter-pill ${activeTab === 'plans' ? 'active' : ''}`}
              style={{ flex: 1, textAlign: 'center' }}
            >
              📅 Planos Diários
            </button>
            <button
              onClick={() => setActiveTab('guide')}
              className={`filter-pill ${activeTab === 'guide' ? 'active' : ''}`}
              style={{ flex: 1, textAlign: 'center' }}
            >
              🧭 Como Ler Corretamente
            </button>
          </div>

          {activeTab === 'plans' ? (
            <>
              {/* Plan Picker Pills */}
              <div className="filter-pills-row" style={{ marginBottom: '14px' }}>
                {READING_PLANS.map((plan) => (
                  <button
                    key={plan.id}
                    onClick={() => setSelectedPlanId(plan.id)}
                    className={`filter-pill ${selectedPlanId === plan.id ? 'active' : ''}`}
                  >
                    <span>{plan.title}</span>
                  </button>
                ))}
              </div>

              {/* Active Plan Card Hero */}
              <div
                style={{
                  padding: '16px',
                  backgroundColor: 'var(--bg-secondary)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)',
                  marginBottom: '16px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <div>
                    <span
                      style={{
                        display: 'inline-block',
                        fontSize: '0.72rem',
                        color: 'var(--accent-gold)',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        marginBottom: '4px',
                      }}
                    >
                      {currentPlan.badge}
                    </span>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
                      {currentPlan.title}
                    </h3>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      color: 'var(--accent-gold)',
                    }}
                  >
                    <Award size={16} />
                    <span>{progressPercent}%</span>
                  </div>
                </div>

                <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', margin: '0 0 12px 0', lineHeight: '1.5' }}>
                  {currentPlan.description}
                </p>

                {/* Progress bar */}
                <div
                  style={{
                    width: '100%',
                    height: '8px',
                    backgroundColor: 'var(--border-color)',
                    borderRadius: 'var(--radius-full)',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      width: `${progressPercent}%`,
                      height: '100%',
                      backgroundColor: 'var(--accent-gold)',
                      transition: 'width 0.3s ease',
                    }}
                  />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '6px' }}>
                  <span>{planCompletedDays.length} de {currentPlan.days.length} dias concluídos</span>
                  <span>{currentPlan.durationDays} dias no total</span>
                </div>
              </div>

              {/* Days List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {currentPlan.days.map((day) => {
                  const isDone = planCompletedDays.includes(day.day);
                  return (
                    <div
                      key={day.day}
                      style={{
                        padding: '12px 14px',
                        backgroundColor: isDone ? 'var(--accent-subtle)' : 'var(--bg-secondary)',
                        border: isDone ? '1px solid var(--accent-gold)' : '1px solid var(--border-color)',
                        borderRadius: 'var(--radius-sm)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '12px',
                        transition: 'all var(--transition-fast)',
                      }}
                    >
                      {/* Checkbox */}
                      <button
                        onClick={() => toggleDayCompleted(day.day)}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                          color: isDone ? 'var(--accent-gold)' : 'var(--text-muted)',
                          display: 'flex',
                          alignItems: 'center',
                          padding: 0,
                        }}
                        title={isDone ? 'Desmarcar dia' : 'Marcar como lido'}
                      >
                        {isDone ? <CheckCircle size={22} fill="var(--accent-gold)" color="#ffffff" /> : <Circle size={22} />}
                      </button>

                      {/* Day Info */}
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span
                            style={{
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              color: 'var(--accent-gold)',
                              textTransform: 'uppercase',
                            }}
                          >
                            Dia {day.day}
                          </span>
                          <span style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                            {day.title}
                          </span>
                        </div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                          {day.passageLabel} • <em>{day.reflectionFocus}</em>
                        </div>
                      </div>

                      {/* Read Button */}
                      <button
                        onClick={() => handleOpenPassage(day)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          backgroundColor: 'var(--bg-primary)',
                          border: '1px solid var(--border-color)',
                          color: 'var(--text-primary)',
                          padding: '6px 12px',
                          borderRadius: 'var(--radius-full)',
                          fontSize: '0.78rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        <BookOpen size={13} color="var(--accent-gold)" />
                        <span>Ler</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            /* How to Read Guide (O.R.A.R. Methodology) */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div
                style={{
                  padding: '16px',
                  backgroundColor: 'var(--accent-gold-light)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--accent-gold)',
                }}
              >
                <div style={{ fontWeight: 700, color: 'var(--accent-gold)', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                  <Sparkles size={18} />
                  <span>{HOW_TO_READ_GUIDE.title}</span>
                </div>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-primary)', lineHeight: '1.6', margin: 0 }}>
                  {HOW_TO_READ_GUIDE.intro}
                </p>
              </div>

              {/* Steps */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {HOW_TO_READ_GUIDE.steps.map((step) => (
                  <div
                    key={step.letter}
                    style={{
                      padding: '14px',
                      backgroundColor: 'var(--bg-secondary)',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-color)',
                      display: 'flex',
                      gap: '12px',
                      alignItems: 'flex-start',
                    }}
                  >
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--accent-gold)',
                        color: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 800,
                        fontSize: '1.1rem',
                        flexShrink: 0,
                      }}
                    >
                      {step.letter}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.94rem', color: 'var(--text-primary)' }}>
                        {step.word}
                      </div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '2px', lineHeight: '1.5' }}>
                        {step.instruction}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Golden Tip Box */}
              <div
                style={{
                  padding: '14px',
                  backgroundColor: 'var(--bg-secondary)',
                  borderLeft: '4px solid #10b981',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.86rem',
                  lineHeight: '1.6',
                  color: 'var(--text-primary)',
                }}
              >
                💡 {HOW_TO_READ_GUIDE.goldenTip}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
