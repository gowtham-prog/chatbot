interface QuickAction {
    label: string
    onClick: () => void
}

interface QuickActionsProps {
    actions: QuickAction[]
}

export function QuickActions({ actions }: QuickActionsProps) {
    return (
        <div className="flex flex-wrap gap-2 p-4">
            {actions.map((action, index) => (
                <button
                    key={index}
                    onClick={action.onClick}
                    className="px-4 py-2 text-sm bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                >
                    {action.label}
                </button>
            ))}
        </div>
    )
}

