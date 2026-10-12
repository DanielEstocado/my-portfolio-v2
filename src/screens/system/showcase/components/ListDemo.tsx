import { useState } from "react";
import { ChevronDown, Plus } from "lucide-react";
import { toast } from "sonner";
import { CustomButton } from "@/components";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ITEMS, LIST_TABS } from "../constant";
import ListRow from "./ListRow";

// A typical list screen built from the same components below, filled with plainly labelled sample rows.
const ListDemo = () => {
  const [tab, setTab] = useState("all");
  const [sort, setSort] = useState("newest");

  const rows = ITEMS.filter(
    (item) => tab === "all" || item.status.toLowerCase() === tab,
  );

  // Shows what a primary action looks like, nothing is created.
  const handleAdd = () => {
    toast.success("This is a toast, wire the real action here");
  };

  return (
    <section id="list" className="scroll-mt-24 pb-lg">
      <div className="rounded-2xl border border-border bg-card">
        <header className="flex flex-col gap-md p-md sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-sm">
              <h2 className="title text-h3">Your list title</h2>
              <Badge variant="outline">Sample content</Badge>
            </div>
            <p className="subtitle text-caption text-muted-foreground">
              A list screen from this template's own components. The rows are
              placeholders, replace them with data from a services/ hook.
            </p>
          </div>

          <div className="flex w-full items-center gap-sm sm:w-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <CustomButton variant="ghost" className="flex-1 justify-between sm:flex-none">
                  {sort === "newest" ? "Newest first" : "Oldest first"}
                  <ChevronDown />
                </CustomButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuRadioGroup value={sort} onValueChange={setSort}>
                  <DropdownMenuRadioItem value="newest">Newest first</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="oldest">Oldest first</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <CustomButton onClick={handleAdd} className="flex-1 sm:flex-none">
              <Plus />
              Add item
            </CustomButton>
          </div>
        </header>

        <div className="overflow-x-auto px-md pb-1">
          <Tabs value={tab} onValueChange={setTab}>
            <TabsList className="w-max min-w-full sm:min-w-0">
              {LIST_TABS.map(({ value, label }) => (
                <TabsTrigger key={value} value={value}>
                  {label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <ul className="mt-sm divide-y divide-border border-t border-border">
          {rows.map((item) => (
            <ListRow key={item.id} item={item} position={Number(item.id)} />
          ))}
        </ul>

        <footer className="flex flex-col gap-sm border-t border-border p-md sm:flex-row sm:items-center sm:justify-between">
          <p className="text-caption text-muted-foreground">
            Showing {rows.length} of {ITEMS.length} sample rows
          </p>
          <div className="grid grid-cols-2 gap-sm sm:flex">
            <CustomButton size="sm" variant="ghost" disabled>
              Previous
            </CustomButton>
            <CustomButton size="sm" variant="ghost" disabled>
              Next
            </CustomButton>
          </div>
        </footer>
      </div>
    </section>
  );
};

export default ListDemo;
