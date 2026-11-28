import React from 'react';
import { getAdminSession } from '@/lib/auth';
import { getPublicSiteData } from '@/lib/siteData';
import { HomeClient } from '@/components/HomeClient';
import { MaintenanceView } from '@/components/MaintenanceView';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function HomePage() {
  const [data, session] = await Promise.all([getPublicSiteData(), getAdminSession()]);

  if (data.maintenanceMode.enabled && !session) {
    return <MaintenanceView message={data.maintenanceMode.message} />;
  }

  return <HomeClient initialData={data} isAdminPreview={Boolean(session)} />;
}
