import { LucideIcon } from 'lucide-react';

interface PageBannerProps {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  /** Optional right-hand slot (badges, deadline chip, etc.) */
  action?: React.ReactNode;
}

/**
 * PageBanner — the single, shared page header used on EVERY page.
 * Dark navy gradient, large bold white title, gold accent details.
 * Only the text/icon changes per page; the styling never does.
 */
const PageBanner = ({ title, subtitle, icon: Icon, action }: PageBannerProps) => (
  <div className="ds-banner">
    {/* gold accent details */}
    <div className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-primary" />
    <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/10 blur-2xl" />

    <div className="relative flex items-center justify-between gap-4">
      <div className="flex items-center gap-3 min-w-0">
        {Icon && (
          <div className="hidden sm:flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/15 border border-primary/40">
            <Icon className="h-5 w-5 text-primary" />
          </div>
        )}
        <div className="min-w-0">
          <h1 className="ds-banner-title truncate">{title}</h1>
          {subtitle && <p className="ds-banner-sub mt-0.5 truncate">{subtitle}</p>}
        </div>
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>

    <div className="relative mt-4 h-px w-full bg-gradient-to-r from-primary/70 via-primary/10 to-transparent" />
  </div>
);

export default PageBanner;
