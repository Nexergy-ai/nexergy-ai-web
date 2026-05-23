/**
 * Governance Page
 * ISO 42001 Compliance, Security, and Traceability
 */

import React, { useState } from 'react';
import { governanceFramework, coreValues } from '@/constants/config';
import { Shield, Lock, Eye, CheckCircle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Governance() {
  const [activeTab, setActiveTab] = useState<'governance' | 'compliance' | 'audit'>('governance');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Governance, Security & Traceability
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl">
            Enterprise-grade governance framework ensuring trust, transparency, and compliance across all operational layers.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Governance Framework */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Governance Framework
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Object.entries(governanceFramework).map(([key, framework]) => {
              const IconComponent = {
                iso42001: Shield,
                mlops: Lock,
                blockchain: Eye,
              }[key as keyof typeof governanceFramework] || Shield;

              return (
                <div
                  key={key}
                  className="p-8 rounded-lg bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
                >
                  <div
                    className="p-4 rounded-lg mb-4 w-fit"
                    style={{ backgroundColor: `${framework.color}20` }}
                  >
                    <IconComponent
                      className="w-8 h-8"
                      style={{ color: framework.color }}
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {framework.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {framework.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Compliance Status */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Compliance Status
          </h2>
          <div className="space-y-4">
            {[
              {
                standard: 'ISO 42001',
                description: 'AI Management System',
                status: 'compliant',
                lastAudit: '2026-05-20',
              },
              {
                standard: 'SOC 2 Type II',
                description: 'Security, Availability, Processing Integrity',
                status: 'compliant',
                lastAudit: '2026-04-15',
              },
              {
                standard: 'GDPR',
                description: 'Data Protection & Privacy',
                status: 'compliant',
                lastAudit: '2026-03-10',
              },
              {
                standard: 'Industry-Specific',
                description: 'Energy & Industrial Regulations',
                status: 'compliant',
                lastAudit: '2026-05-01',
              },
            ].map((compliance) => (
              <div
                key={compliance.standard}
                className="p-6 rounded-lg bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 flex items-start justify-between"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      {compliance.standard}
                    </h3>
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    {compliance.description}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">
                    Last audit: {new Date(compliance.lastAudit).toLocaleDateString()}
                  </p>
                </div>
                <span className="px-4 py-2 rounded-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 font-semibold text-sm">
                  {compliance.status.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Security Layers */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Security Architecture
          </h2>
          <div className="space-y-4">
            {[
              {
                layer: 'Data Encryption',
                description: 'End-to-end encryption for data at rest and in transit',
                icon: '🔐',
              },
              {
                layer: 'Access Control',
                description: 'Role-based access control (RBAC) with multi-factor authentication',
                icon: '🔑',
              },
              {
                layer: 'Audit Logging',
                description: 'Comprehensive audit trails for all operational activities',
                icon: '📋',
              },
              {
                layer: 'Threat Detection',
                description: 'Real-time monitoring and anomaly detection for security threats',
                icon: '⚠️',
              },
              {
                layer: 'Compliance Monitoring',
                description: 'Continuous compliance verification and reporting',
                icon: '✓',
              },
              {
                layer: 'Incident Response',
                description: '24/7 incident response and recovery procedures',
                icon: '🚨',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="p-6 rounded-lg bg-white dark:bg-gray-800 border-l-4 border-blue-500 flex items-start gap-4"
              >
                <span className="text-3xl flex-shrink-0">{item.icon}</span>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                    {item.layer}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Traceability & Audit */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Traceability & Audit
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Immutability */}
            <div className="p-8 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-2 border-blue-300 dark:border-blue-700">
              <h3 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-4">
                Immutable Audit Trail
              </h3>
              <ul className="space-y-3 text-blue-800 dark:text-blue-200">
                <li className="flex items-start gap-2">
                  <span className="text-lg">✓</span>
                  <span>Blockchain-based integrity verification</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-lg">✓</span>
                  <span>Cryptographic hashing for tamper detection</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-lg">✓</span>
                  <span>Timestamped records for forensic analysis</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-lg">✓</span>
                  <span>Complete operational history preservation</span>
                </li>
              </ul>
            </div>

            {/* AI Governance */}
            <div className="p-8 rounded-lg bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-2 border-green-300 dark:border-green-700">
              <h3 className="text-xl font-bold text-green-900 dark:text-green-100 mb-4">
                AI Model Governance
              </h3>
              <ul className="space-y-3 text-green-800 dark:text-green-200">
                <li className="flex items-start gap-2">
                  <span className="text-lg">✓</span>
                  <span>Model versioning and lineage tracking</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-lg">✓</span>
                  <span>Performance monitoring and validation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-lg">✓</span>
                  <span>Explainability and interpretability</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-lg">✓</span>
                  <span>Human-in-the-loop validation workflows</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Our Governance Principles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {coreValues.map((value) => {
              const IconComponent = {
                Shield: Shield,
                Eye: Eye,
                Users: () => <span className="text-2xl">👥</span>,
                Leaf: () => <span className="text-2xl">🌿</span>,
                Lightbulb: () => <span className="text-2xl">💡</span>,
              }[value.icon] || Shield;

              return (
                <div
                  key={value.title}
                  className="p-6 rounded-lg bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 text-center hover:shadow-lg transition-all duration-300"
                >
                  <div className="text-4xl mb-3 flex justify-center">
                    {value.icon === 'Shield' && '🛡️'}
                    {value.icon === 'Eye' && '👁️'}
                    {value.icon === 'Users' && '👥'}
                    {value.icon === 'Leaf' && '🌿'}
                    {value.icon === 'Lightbulb' && '💡'}
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Trust Statement */}
        <section className="mb-8">
          <div className="p-8 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-800 dark:to-blue-900 text-white">
            <h2 className="text-2xl font-bold mb-4">Trust. Traceability. Evidence Verificable.</h2>
            <p className="text-lg opacity-90">
              NEXERGY AI is built on a foundation of enterprise-grade governance, rigorous compliance, and transparent operations. 
              Every decision, every action, and every outcome is traceable, auditable, and verifiable. 
              We believe that trust is earned through transparency, and that operational intelligence must be grounded in integrity.
            </p>
          </div>
        </section>

        {/* Footer Note */}
        <div className="p-4 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <span className="font-semibold">ℹ️ Note:</span> This governance framework is production-ready and will be fully integrated in Phase 4. 
            All compliance certifications are in progress and will be completed before enterprise deployment.
          </p>
        </div>
      </div>
    </div>
  );
}
