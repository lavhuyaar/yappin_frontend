const ChatSkeleton = () => {
  return (
    <div className="flex flex-col w-2/3 h-full bg-surface/5 gap-3">
      <div className="bg-surface w-full flex items-center gap-3">
        <div className="size-[60px] m-2 rounded-full shrink-0 bg-background animate-pulse"></div>
        <div className="flex flex-col w-3/5 gap-2">
          <div className="w-2/5 bg-background h-4 rounded-md animate-pulse"></div>
          <div className="w-2/5 bg-background h-3 rounded-md animate-pulse"></div>
        </div>
      </div>

      <div className="w-full flex flex-col  gap-4 py-5 px-2">
        <div className="w-1/2 flex gap-3 items-start self-end flex-row-reverse animate-pulse">
          <div className="size-[40px] rounded-full shrink-0 m-1 bg-surface"></div>
          <div className="rounded-lg py-2 px-3 gap-2 h-full w-full text-end bg-primary/15 flex justify-end flex-col">
            <div className="text-end w-full h-2 rounded-md bg-background/30 self-end"></div>
            <div className="text-end w-full h-2 rounded-md bg-background/30 self-end"></div>
            <div className="text-end w-full h-2 rounded-md bg-background/30 self-end"></div>
            <div className="mt-1 text-end w-[40px] h-3 rounded-md bg-background/30 self-end"></div>
          </div>
        </div>

        <div className="w-1/2 flex gap-3 items-start self-start flex-row animate-pulse">
          <div className="size-[40px] rounded-full shrink-0 m-1 bg-surface"></div>
          <div className="rounded-lg py-2 px-3 gap-2 h-full w-full text-end bg-surface flex justify-end flex-col">
            <div className="text-end w-full h-2 rounded-md bg-background/30 self-start"></div>
            <div className="text-end w-full h-2 rounded-md bg-background/30 self-start"></div>
            <div className="text-end w-full h-2 rounded-md bg-background/30 self-start"></div>
            <div className="mt-1 text-end w-[40px] h-3 rounded-md bg-background/30 self-start"></div>
          </div>
        </div>

        <div className="w-1/2 flex gap-3 items-start self-end flex-row-reverse animate-pulse">
          <div className="size-[40px] rounded-full shrink-0 m-1 bg-surface"></div>
          <div className="rounded-lg py-2 px-3 gap-2 h-full w-full text-end bg-primary/15 flex justify-end flex-col">
            <div className="text-end w-full h-2 rounded-md bg-background/30 self-end"></div>
            <div className="text-end w-full h-2 rounded-md bg-background/30 self-end"></div>
            <div className="text-end w-full h-2 rounded-md bg-background/30 self-end"></div>
            <div className="mt-1 text-end w-[40px] h-3 rounded-md bg-background/30 self-end"></div>
          </div>
        </div>
      </div>

      <div className="w-full flex gap-2 mt-12">
        <div className="w-full rounded-md h-40  border-2 border-primary-hover/10 animate-pulse"></div>
        <div className="w-[80px] bg-primary h-8 mt-1 px-4 py-2 rounded-lg animate-pulse"></div>
      </div>
    </div>
  );
};
export default ChatSkeleton;
