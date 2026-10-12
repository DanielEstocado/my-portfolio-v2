import { MoreHorizontal } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { STATUS_BADGES, type ListItem } from "../constant";

type ListRowProps = {
  item: ListItem;
  position: number;
};

// One row of the sample list: its number, a title and detail, a status chip and a row menu.
const ListRow = ({ item, position }: ListRowProps) => {
  return (
    <li className="flex items-center gap-sm px-md py-sm">
      <span className="grid size-9 shrink-0 place-items-center rounded-full bg-secondary text-caption font-semibold text-secondary-foreground">
        {position}
      </span>

      <div className="min-w-0 flex-1">
        <p className="truncate text-body font-medium">{item.title}</p>
        <p className="truncate text-caption text-muted-foreground">
          {item.detail}
        </p>
        <Badge variant={STATUS_BADGES[item.status]} className="mt-1 sm:hidden">
          {item.status}
        </Badge>
      </div>

      <Badge variant={STATUS_BADGES[item.status]} className="hidden sm:inline-flex">
        {item.status}
      </Badge>

      <DropdownMenu>
        <DropdownMenuTrigger
          aria-label={`Actions for ${item.title}`}
          className="grid size-8 place-items-center rounded-full text-muted-foreground outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/30"
        >
          <MoreHorizontal className="size-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onSelect={() => toast.info("This is a toast, wire the real action here")}>
            View
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => toast.success("This is a toast, wire the real action here")}>
            Duplicate
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
            onSelect={() => toast.error("This is a toast, wire the real action here")}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </li>
  );
};

export default ListRow;
