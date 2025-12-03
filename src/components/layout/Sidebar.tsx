'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LayoutDashboard, FolderKanban, Activity, Settings, FlaskConical, Database, CloudRain, TestTube2, BarChart3 } from 'lucide-react';

const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Projects', href: '/projects', icon: FolderKanban },
    { name: 'Simulation Lab', href: '/simulation-lab', icon: FlaskConical },
    { name: 'Materials', href: '/materials', icon: Database },
    { name: 'Climate', href: '/climate', icon: CloudRain },
    { name: 'Calibration', href: '/calibration-lab', icon: TestTube2 },
    { name: 'Comparison', href: '/comparison', icon: BarChart3 },
    { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="flex h-full w-64 flex-col border-r bg-card text-card-foreground">
            <div className="flex h-14 items-center border-b px-6">
                <span className="text-lg font-bold">ConcLife</span>
            </div>
            <nav className="flex-1 space-y-1 px-2 py-4">
                {navigation.map((item) => {
                    const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "group flex items-center rounded-md px-2 py-2 text-sm font-medium transition-colors",
                                isActive
                                    ? "bg-primary text-primary-foreground"
                                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                            )}
                        >
                            <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
}
