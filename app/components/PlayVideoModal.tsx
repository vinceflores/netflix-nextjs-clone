import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface iAppProps {
  title: string;
  overview: string;
  youtubeUrl: string;
  state: boolean;
  changeState: any;
  Key: number;
  age: number;
  duration: number;
  release: number;
}

function PlayVideoModal({
  Key,
  changeState,
  overview,
  state,
  title,
  youtubeUrl,
  age,
  duration,
  release,
}: iAppProps) {
  return (
    <Dialog open={state} onOpenChange={() => changeState(!state)}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{overview}</DialogDescription>
        </DialogHeader>
        <div className="flex gap-x-2 items-center">
          <p>{release}</p>
          <p className="border py-0.5 px-1 border-gray-200 rounded">{age}+</p>
          <p>{duration}h</p>
        </div>
        <iframe src={youtubeUrl} height={250} className="w-full"></iframe>
      </DialogContent>
    </Dialog>
  );
}

export default PlayVideoModal;
