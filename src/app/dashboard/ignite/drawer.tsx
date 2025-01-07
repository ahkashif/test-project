import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";

export function SheetDemo() {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="outline">Open</Button>
			</SheetTrigger>
			<SheetContent className="w-1/2">
				<SheetHeader>
					<SheetTitle>Edit profile</SheetTitle>
					<SheetDescription>Make changes to your profile here. Click save when you are done.</SheetDescription>
				</SheetHeader>

				<SheetFooter>
					<SheetClose asChild></SheetClose>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
}
