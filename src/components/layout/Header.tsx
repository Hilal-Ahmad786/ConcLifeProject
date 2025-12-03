export function Header() {
    return (
        <header className="flex h-14 items-center gap-4 border-b bg-background px-6">
            <div className="flex-1">
                {/* Breadcrumbs or page title could go here */}
            </div>
            <div className="flex items-center gap-4">
                <div className="h-8 w-8 rounded-full bg-muted" />
            </div>
        </header>
    );
}
