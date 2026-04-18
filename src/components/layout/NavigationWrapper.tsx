import { getCMSNavItems } from '@/lib/cms';
import { Navigation } from './navigation';

/**
 * Server component wrapper that fetches CMS nav items
 * and passes them to the client Navigation component
 */
export default async function NavigationWrapper() {
  const cmsNavItems = await getCMSNavItems();
  return <Navigation cmsNavItems={cmsNavItems} />;
}
