'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, Property, Lead, GeneratedContent, MarketingContentPack } from '../types';
import { INITIAL_USER, INITIAL_PROPERTIES, INITIAL_LEADS, INITIAL_GENERATED_CONTENT } from '../lib/mockData';
import { RealEstateAIEngine } from '../lib/ai/engine';

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: 'lead' | 'system' | 'ai';
  read: boolean;
  createdAt: string;
  link?: string;
}

interface AppContextType {
  user: UserProfile;
  properties: Property[];
  leads: Lead[];
  generatedContents: Record<string, GeneratedContent>;
  notifications: AppNotification[];
  language: 'es' | 'en';
  isLoaded: boolean;
  setLanguage: (lang: 'es' | 'en') => void;
  updateUser: (updated: Partial<UserProfile>) => void;
  addProperty: (property: Omit<Property, 'id' | 'createdAt' | 'updatedAt' | 'ownerId'>) => Property;
  updateProperty: (id: string, updated: Partial<Property>) => void;
  deleteProperty: (id: string) => void;
  getPropertyBySlug: (slug: string) => Property | undefined;
  addLead: (lead: Omit<Lead, 'id' | 'createdAt' | 'temperature' | 'score' | 'ownerId'>) => Lead;
  updateLead: (id: string, updated: Partial<Lead>) => void;
  deleteLead: (id: string) => void;
  analyzeLeadWithAI: (leadId: string) => void;
  saveGeneratedContent: (propertyId: string, content: MarketingContentPack, language: 'es' | 'en' | 'bilingual') => void;
  getGeneratedContent: (propertyId: string) => GeneratedContent | undefined;
  markNotificationAsRead: (id: string) => void;
  resetToDemoData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  USER: 'pmh_user_v1',
  PROPERTIES: 'pmh_properties_v1',
  LEADS: 'pmh_leads_v1',
  CONTENT: 'pmh_content_v1',
  LANG: 'pmh_lang_v1',
  NOTIFICATIONS: 'pmh_notifications_v1',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);
  const [properties, setProperties] = useState<Property[]>(INITIAL_PROPERTIES);
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);
  const [generatedContents, setGeneratedContents] = useState<Record<string, GeneratedContent>>(INITIAL_GENERATED_CONTENT);
  const [notifications, setNotifications] = useState<AppNotification[]>([
    {
      id: 'notif_001',
      title: '¡Nuevo Lead Caliente!',
      message: 'Sophie Müller ha consultado por "Villa de Lujo con Piscina Infinity en Costa Adeje" (Score: 95/100).',
      type: 'lead',
      read: false,
      createdAt: '2026-02-21T14:16:00.000Z',
      link: '/app/leads'
    }
  ]);
  const [language, setLanguageState] = useState<'es' | 'en'>('es');
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize from LocalStorage or seed with INITIAL mock data
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem(STORAGE_KEYS.USER);
      if (savedUser) setUser(JSON.parse(savedUser));

      const savedProps = localStorage.getItem(STORAGE_KEYS.PROPERTIES);
      if (savedProps) setProperties(JSON.parse(savedProps));

      const savedLeads = localStorage.getItem(STORAGE_KEYS.LEADS);
      if (savedLeads) setLeads(JSON.parse(savedLeads));

      const savedContent = localStorage.getItem(STORAGE_KEYS.CONTENT);
      if (savedContent) setGeneratedContents(JSON.parse(savedContent));

      const savedNotifs = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
      if (savedNotifs) setNotifications(JSON.parse(savedNotifs));

      const savedLang = localStorage.getItem(STORAGE_KEYS.LANG);
      if (savedLang === 'es' || savedLang === 'en') setLanguageState(savedLang);
    } catch (e) {
      console.warn('LocalStorage error, using memory state:', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to LocalStorage when changed
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
      localStorage.setItem(STORAGE_KEYS.PROPERTIES, JSON.stringify(properties));
      localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(leads));
      localStorage.setItem(STORAGE_KEYS.CONTENT, JSON.stringify(generatedContents));
      localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
      localStorage.setItem(STORAGE_KEYS.LANG, language);
    } catch (e) {
      console.warn('Error saving state to localStorage', e);
    }
  }, [user, properties, leads, generatedContents, notifications, language, isLoaded]);

  const setLanguage = (lang: 'es' | 'en') => {
    setLanguageState(lang);
  };

  const updateUser = (updated: Partial<UserProfile>) => {
    setUser(prev => ({ ...prev, ...updated, updatedAt: new Date().toISOString() }));
  };

  const addProperty = (newProp: Omit<Property, 'id' | 'createdAt' | 'updatedAt' | 'ownerId'>): Property => {
    const id = `prop_${Date.now()}`;
    const slug = newProp.slug || newProp.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const created: Property = {
      ...newProp,
      id,
      slug,
      ownerId: user.id,
      published: newProp.status === 'published',
      viewsCount: 0,
      leadsCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setProperties(prev => [created, ...prev]);
    return created;
  };

  const updateProperty = (id: string, updated: Partial<Property>) => {
    setProperties(prev => prev.map(p => {
      if (p.id === id) {
        return {
          ...p,
          ...updated,
          published: updated.status ? updated.status === 'published' : p.published,
          updatedAt: new Date().toISOString()
        };
      }
      return p;
    }));
  };

  const deleteProperty = (id: string) => {
    setProperties(prev => prev.filter(p => p.id !== id));
  };

  const getPropertyBySlug = (slug: string) => {
    return properties.find(p => p.slug === slug || p.id === slug);
  };

  const addLead = (newLead: Omit<Lead, 'id' | 'createdAt' | 'temperature' | 'score' | 'ownerId'>): Lead => {
    const matchedProp = properties.find(p => p.id === newLead.propertyId);
    const analysis = RealEstateAIEngine.analyzeLead(newLead, matchedProp);

    const created: Lead = {
      ...newLead,
      id: `lead_${Date.now()}`,
      ownerId: user.id,
      propertyName: matchedProp?.title || 'Propiedad Consultada',
      temperature: analysis.temperature,
      score: analysis.score,
      aiSummary: analysis.aiSummary,
      recommendedAction: analysis.recommendedAction,
      status: 'new',
      createdAt: new Date().toISOString(),
      analyzedAt: new Date().toISOString(),
    };

    // Increment lead counter on property
    if (matchedProp) {
      updateProperty(matchedProp.id, { leadsCount: (matchedProp.leadsCount || 0) + 1 });
    }

    // Add agent notification
    const newNotif: AppNotification = {
      id: `notif_${Date.now()}`,
      title: analysis.temperature === 'hot' ? '🔥 ¡Nuevo Lead Caliente!' : '📩 Nueva Consulta Recibida',
      message: `${created.name} ha consultado por "${created.propertyName}" (Score: ${created.score}/100)`,
      type: 'lead',
      read: false,
      createdAt: new Date().toISOString(),
      link: '/app/leads'
    };

    setLeads(prev => [created, ...prev]);
    setNotifications(prev => [newNotif, ...prev]);

    return created;
  };

  const updateLead = (id: string, updated: Partial<Lead>) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, ...updated } : l));
  };

  const deleteLead = (id: string) => {
    setLeads(prev => prev.filter(l => l.id !== id));
  };

  const analyzeLeadWithAI = (leadId: string) => {
    const targetLead = leads.find(l => l.id === leadId);
    if (!targetLead) return;

    const matchedProp = properties.find(p => p.id === targetLead.propertyId);
    const analysis = RealEstateAIEngine.analyzeLead(targetLead, matchedProp);

    updateLead(leadId, {
      temperature: analysis.temperature,
      score: analysis.score,
      aiSummary: analysis.aiSummary,
      recommendedAction: analysis.recommendedAction,
      analyzedAt: new Date().toISOString(),
    });
  };

  const saveGeneratedContent = (propertyId: string, content: MarketingContentPack, lang: 'es' | 'en' | 'bilingual') => {
    const record: GeneratedContent = {
      id: `gen_${Date.now()}`,
      ownerId: user.id,
      propertyId,
      type: 'full_pack',
      language: lang,
      content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setGeneratedContents(prev => ({
      ...prev,
      [propertyId]: record
    }));
  };

  const getGeneratedContent = (propertyId: string) => {
    return generatedContents[propertyId];
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const resetToDemoData = () => {
    setUser(INITIAL_USER);
    setProperties(INITIAL_PROPERTIES);
    setLeads(INITIAL_LEADS);
    setGeneratedContents(INITIAL_GENERATED_CONTENT);
    setNotifications([
      {
        id: 'notif_001',
        title: '¡Nuevo Lead Caliente!',
        message: 'Sophie Müller ha consultado por "Villa de Lujo con Piscina Infinity en Costa Adeje" (Score: 95/100).',
        type: 'lead',
        read: false,
        createdAt: '2026-02-21T14:16:00.000Z',
        link: '/app/leads'
      }
    ]);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        properties,
        leads,
        generatedContents,
        notifications,
        language,
        isLoaded,
        setLanguage,
        updateUser,
        addProperty,
        updateProperty,
        deleteProperty,
        getPropertyBySlug,
        addLead,
        updateLead,
        deleteLead,
        analyzeLeadWithAI,
        saveGeneratedContent,
        getGeneratedContent,
        markNotificationAsRead,
        resetToDemoData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
