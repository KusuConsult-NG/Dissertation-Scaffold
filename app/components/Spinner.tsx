import { Loader2 } from "lucide-react";

export function Spinner({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div className={className} {...props}>
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
    );
}
